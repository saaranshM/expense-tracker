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
beforeEach(async (done) => {
  await db.migrate.rollback(migrationConfig);
  await db.migrate.latest(migrationConfig);
  await db.seed.run(seedConfig);
  done();
});

// cleaning db before runnig tests
afterEach(async (done) => {
  await db.migrate.rollback(migrationConfig);
  done();
});

describe("POST /user/register", () => {
  it("should return token after registering user", (done) => {
    chai
      .request(server)
      .post("/user/register")
      .send({
        firstName: "John",
        lastName: "Hoe",
        email: "john@test.com",
        password: "test123",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.have.property("token");
        process.env.NODE_ENV = "dev";
        done();
      });
  });

  it("should return user exists with status code 401", (done) => {
    chai
      .request(server)
      .post("/user/register")
      .send({
        firstName: "Saaransh",
        lastName: "Menon",
        email: "saaransh@test.com",
        password: "test123",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.have.property("error");
        res.body.error.should.equal("user-exists");
        res.body.should.not.have.property("token");
        done();
      });
  });
});

process.env.NODE_ENV = "dev";
