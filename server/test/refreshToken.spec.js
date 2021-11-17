process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../index");
const db = require("../db/db");
const client = require("../redis/redisInit");
const verifyRefreshToken = require("../utils/verifyRefreeshToken");
const { expect } = require("chai");

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
  client.flushall();
});

describe("POST /user/refresh-token", () => {
  it("should store refresh token in redis", (done) => {
    chai
      .request(server)
      .post("/user/login")
      .send({
        email: "saaransh@test.com",
        password: "test123456",
      })
      .end(async (err, res) => {
        const user = await verifyRefreshToken(res.body.refreshToken);
        console.log(user);
        client.GET(user, (err, result) => {
          expect(result).to.equal(res.body.refreshToken);
        });
        res.should.have.status(200);
        done();
      });
  });
  it("should fail if invalid refresh token in provided", (done) => {
    chai
      .request(server)
      .get("/user/refresh-token")
      .set("Authorization", "Bearer invalid-refresh-token")
      .end(async (err, res) => {
        res.should.have.status(403);
        res.body.should.not.have.property("refreshToken");
        res.body.should.not.have.property("accessToken");
        done();
      });
  });
});
