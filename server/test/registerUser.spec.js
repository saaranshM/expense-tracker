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

// cleaning db before runnig tests
afterEach(async () => {
  await db.migrate.rollback(migrationConfig);
});

describe("POST /user/register", () => {
  it("should return jwt after registering user", (done) => {
    chai
      .request(server)
      .post("/user/register")
      .send({
        firstName: "John",
        lastName: "Hoe",
        email: "john@test.com",
        password: "test123456",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.have.property("accessToken");
        res.body.should.have.property("refreshToken");
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
        password: "test123456",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.have.property("error");
        res.body.error.should.equal("user-exists");
        done();
      });
  });

  it("should return 422 response code if request body does not pass validation check", (done) => {
    chai
      .request(server)
      .post("/user/register")
      .send({
        email: "saaransh@@test.com",
        password: "test123",
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.should.be.json;
        res.body.should.have.property("errors");
        res.body.errors[0].msg.should.equal("email is not valid");
        res.body.errors[1].msg.should.equal(
          "password should be a minimum of 8 characters"
        );
        res.body.errors[2].msg.should.equal("first name is not valid");
        done();
      });
  });
  it("should return 422 response code if request body does not pass user name validation check", (done) => {
    chai
      .request(server)
      .post("/user/register")
      .send({
        firstName: "S",
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.should.be.json;
        res.body.should.have.property("errors");
        res.body.errors[3].msg.should.equal(
          "first name should be a minimum of 2 characters"
        );
        res.body.errors[4].msg.should.equal("last name is not valid");
        done();
      });
  });
});
