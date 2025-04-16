import axios from "axios";

const baseURL = "http://localhost:8000";
let createdId: number;

describe("Person API Integration", () => {
  it("should create a new person", async () => {
    const payload = {
      name: "Alice Smith",
      dob: "1990-01-01",
      nationalityId: 1
    };
    const response = await axios.post(`${baseURL}/api/persons`, payload);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("personId");
    createdId = response.data.personId;
  });

  it("should retrieve the created person", async () => {
    const response = await axios.get(`${baseURL}/api/persons/${createdId}`);
    expect(response.status).toBe(200);
  });

  it("should update the person", async () => {
    const updates = { name: "Updated Alice" };
    const response = await axios.put(`${baseURL}/api/persons/${createdId}`, updates);
    expect(response.status).toBe(200);
  });

  it("should retrieve all persons", async () => {
    const response = await axios.get(`${baseURL}/api/persons`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it("should delete the person", async () => {
    const response = await axios.delete(`${baseURL}/api/persons/${createdId}`);
    expect(response.status).toBe(200);
  });

  it("should return 404 for deleted person", async () => {
    try {
      await axios.get(`${baseURL}/api/persons/${createdId}`);
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });
});
