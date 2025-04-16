import axios from "axios";

const baseURL = "http://localhost:8000";
let createdId: number;

describe("Assignment API Integration", () => {
  it("should create a new assignment", async () => {
    const payload = {
      contractId: 1,
      roleId: 1,
      startDate: "2024-01-01",
      endDate: "2024-12-31"
    };
    const response = await axios.post(`${baseURL}/api/assignments`, payload);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("assignmentId");
    createdId = response.data.assignmentId;
  });

  it("should retrieve the created assignment", async () => {
    const response = await axios.get(`${baseURL}/api/assignments/${createdId}`);
    expect(response.status).toBe(200);
  });

  it("should update the assignment", async () => {
    const updates = { roleId: 2 };
    const response = await axios.put(`${baseURL}/api/assignments/${createdId}`, updates);
    expect(response.status).toBe(200);
  });

  it("should retrieve all assignments", async () => {
    const response = await axios.get(`${baseURL}/api/assignments`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it("should delete the assignment", async () => {
    const response = await axios.delete(`${baseURL}/api/assignments/${createdId}`);
    expect(response.status).toBe(200);
  });

  it("should return 404 for deleted assignment", async () => {
    try {
      await axios.get(`${baseURL}/api/assignments/${createdId}`);
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });
});
