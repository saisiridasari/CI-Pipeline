const app = require("./index");
const request = require("supertest");

test("GET / should return Hello CI/CD", async () => {
  const res = await request(app).get("/");
  expect(res.text).toBe("Hello CI/CD");
});