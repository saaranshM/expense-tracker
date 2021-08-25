process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../index");
const db = require("../db/db");

chai.use(chaiHttp);

// adding config object pointing to migration folder for knex
const migrationConfig = {
  directory: __dirname + "/../db/migrations",
};
const seedConfig = {
  directory: __dirname + "/../db/seeds/test",
};

// cleaning and intializing db before runnig tests
beforeEach(async () => {
  await db.migrate.rollback(migrationConfig);
  await db.migrate.latest(migrationConfig);
  await db.seed.run(seedConfig);
});

// cleaning db before running tests
afterEach(async () => {
  await db.migrate.rollback(migrationConfig);
});

describe("POST /user/login", () => {
  it("should return a jwt after loging in user", (done) => {
    chai
      .request(server)
      .post("/user/login")
      .send({
        email: "saaransh@test.com",
        password: "test123",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property("token");
        done();
      });
  });
  it("should not-found when user does not exsist when loging in", (done) => {
    chai
      .request(server)
      .post("/user/login")
      .send({
        email: "mary@test.com",
        password: "test123",
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.have.property("error");
        res.body.error.should.equal("not-found");
        res.body.should.not.have.property("token");
        done();
      });
  });
  it("should return invalid-credentials when password is incorrect", (done) => {
    chai
      .request(server)
      .post("/user/login")
      .send({
        email: "saaransh@test.com",
        password: "wrong-password",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.have.property("error");
        res.body.error.should.equal("invalid-credentials");
        res.body.should.not.have.property("token");
        done();
      });
  });
});
