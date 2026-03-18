const request = require("supertest");
const app = require("./index");

test("GET /api", async () => {
  const res = await request(app).get("/api");
  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe("Backend Working");
});