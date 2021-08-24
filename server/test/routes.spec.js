process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../index");

chai.use(chaiHttp);

console.log("runnig test");

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
        done();
      });
  });
});
