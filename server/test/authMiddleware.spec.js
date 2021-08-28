const { expect } = require("chai");
const httpMocks = require("node-mocks-http");
const auth = require("../middleware/auth/auth");

describe("Auth Middleware", () => {
  it("should respond with 400 missing auth header", (done) => {
    const req = httpMocks.createRequest({
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = httpMocks.createResponse();
    const next = () => {};

    auth(req, res, next);
    const { error } = JSON.parse(res._getData());
    expect(res.statusCode).to.equal(400);
    expect(error).to.equal("missing-auth-header");
    done();
  });

  it("should respond with 403 if access token is invalid", (done) => {
    const req = httpMocks.createRequest({
      headers: {
        "Content-Type": "application/json",
        Authorization: "invalid-access-token",
      },
    });
    const res = httpMocks.createResponse();
    const next = () => {};

    auth(req, res, next);
    const { error } = JSON.parse(res._getData());
    expect(res.statusCode).to.equal(403);
    expect(error).to.equal("invalid-token");
    done();
  });
});
