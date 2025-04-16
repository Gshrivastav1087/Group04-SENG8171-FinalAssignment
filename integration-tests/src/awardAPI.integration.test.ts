import axios from "axios";

const baseURL = "http://localhost:8000";
let createdId: number;

describe("Award API Integration", () => {
  it("should create a new award", async () => {
    const payload = {
      name: "Best Director",
      year: 2024
    };
    const response = await axios.post(`${baseURL}/api/awards`, payload);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("awardId");
    createdId = response.data.awardId;
  });

  it("should retrieve the created award", async () => {
    const response = await axios.get(`${baseURL}/api/awards/${createdId}`);
    expect(response.status).toBe(200);
  });

  it("should update the award", async () => {
    const updates = { name: "Updated Award" };
    const response = await axios.put(`${baseURL}/api/awards/${createdId}`, updates);
    expect(response.status).toBe(200);
  });

  it("should retrieve all awards", async () => {
    const response = await axios.get(`${baseURL}/api/awards`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it("should delete the award", async () => {
    const response = await axios.delete(`${baseURL}/api/awards/${createdId}`);
    expect(response.status).toBe(200);
  });

  it("should return 404 for deleted award", async () => {
    try {
      await axios.get(`${baseURL}/api/awards/${createdId}`);
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });
});
