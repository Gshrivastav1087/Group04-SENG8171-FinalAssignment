import axios from "axios";

const baseURL = "http://localhost:8000";
let createdId: number;

describe("Contract API Integration", () => {
  it("should create a new contract", async () => {
    const payload = {
      movieId: 1,
      personId: 1,
      pay: 10000
    };
    const response = await axios.post(`${baseURL}/api/contracts`, payload);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("contractId");
    createdId = response.data.contractId;
  });

  it("should retrieve the created contract", async () => {
    const response = await axios.get(`${baseURL}/api/contracts/${createdId}`);
    expect(response.status).toBe(200);
  });

  it("should update the contract", async () => {
    const updates = { pay: 15000 };
    const response = await axios.put(`${baseURL}/api/contracts/${createdId}`, updates);
    expect(response.status).toBe(200);
  });

  it("should retrieve all contracts", async () => {
    const response = await axios.get(`${baseURL}/api/contracts`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it("should delete the contract", async () => {
    const response = await axios.delete(`${baseURL}/api/contracts/${createdId}`);
    expect(response.status).toBe(200);
  });

  it("should return 404 for deleted contract", async () => {
    try {
      await axios.get(`${baseURL}/api/contracts/${createdId}`);
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });
});
