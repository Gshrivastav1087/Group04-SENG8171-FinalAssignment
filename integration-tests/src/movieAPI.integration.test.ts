import axios from "axios";

const baseURL = "http://localhost:8000";
let createdId: number;

describe("Movie API Integration", () => {
  it("should create a new movie", async () => {
    const payload = {
      title: "The Great Adventure",
      releaseDate: "2025-01-01"
    };
    const response = await axios.post(`${baseURL}/api/movies`, payload);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("movieId");
    createdId = response.data.movieId;
  });

  it("should retrieve the created movie", async () => {
    const response = await axios.get(`${baseURL}/api/movies/${createdId}`);
    expect(response.status).toBe(200);
  });

  it("should update the movie", async () => {
    const updates = { title: "Updated Title" };
    const response = await axios.put(`${baseURL}/api/movies/${createdId}`, updates);
    expect(response.status).toBe(200);
  });

  it("should retrieve all movies", async () => {
    const response = await axios.get(`${baseURL}/api/movies`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it("should delete the movie", async () => {
    const response = await axios.delete(`${baseURL}/api/movies/${createdId}`);
    expect(response.status).toBe(200);
  });

  it("should return 404 for deleted movie", async () => {
    try {
      await axios.get(`${baseURL}/api/movies/${createdId}`);
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });
});
