process.env.NODE_ENV = "test";

require("dotenv").config({ path: __dirname + "/../.env" });
const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../index");
const db = require("../db/db");
const client = require("../redis/redisInit");
const jwtGenerator = require("../utils/jwtGenerator");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

// adding config object pointing to migration folder for knex
const migrationConfig = {
  directory: __dirname + "/../db/migrations",
};
const seedConfig = {
  directory: __dirname + "/../db/seeds/test",
};

let user;

// cleaning and intializing db before runnig tests
beforeEach(async () => {
  await db.migrate.rollback(migrationConfig);
  await db.migrate.latest(migrationConfig);
  await db.seed.run(seedConfig);
  user = await db("user_login")
    .select("user_id")
    .where({ user_email: "saaransh@test.com" });

  const token = jwtGenerator(user[0].user_id, "refresh");
  client.SETEX(user[0].user_id, 7 * 24 * 60 * 60, token, (error, res) => {});
});

// cleaning db before running tests
afterEach(async () => {
  await db.migrate.rollback(migrationConfig);
});

describe("POST /user/logout", () => {
  it("should logout user", (done) => {
    let refreshToken;
    client.GET(user[0].user_id, (error, result) => {
      refreshToken = result;
      chai
        .request(server)
        .post("/user/logout")
        .set("Authorization", "Bearer " + refreshToken)
        .end(async (err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
  it("should return 400 if refresh token has expired or invalid token is provided", (done) => {
    const token = jwt.sign(
      { user: "fake-user" },
      process.env.REFRESH_JWT_SECRET
    );
    chai
      .request(server)
      .post("/user/logout")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
