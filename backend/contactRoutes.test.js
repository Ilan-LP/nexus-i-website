import request from "supertest";
import app from "./server.js";

describe("contact API", () => {
  it("returns 400 for invalid contact payload", async () => {
    const response = await request(app).post("/api/v1/contact").send({
      name: "",
      email: "invalid",
      message: "",
      website: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      message: "Invalid contact payload.",
    });
  });
});
