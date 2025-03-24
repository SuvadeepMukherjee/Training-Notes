import request from "supertest";
import app from "../../app.ts";
import User from "../../models/User.ts";

jest.mock("../../models/User");

afterAll(() => {
  jest.restoreAllMocks(); // Restore original implementations
});

describe("GET /api/user/profile/:userId", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return user data when user exists", async () => {
    const mockUser = { userId: "12345" };
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get("/api/user/profile/12345");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ userId: "12345" });
  });

  test("should return 404 if user is not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/api/user/profile/99999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "User not found" });
  });

  test("should return 500 if there is a server error", async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/user/profile/12345");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Server error" });
  });
});
