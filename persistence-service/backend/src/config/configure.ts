import dotenv from "dotenv";
import { DataSource } from "typeorm";

// Import all actual entities based on your file uploads
import { Assignment } from "../models/Assignment";
import { Award } from "../models/Award";
import { Contact } from "../models/Contact";
import { Contract } from "../models/Contract";
import { Movie } from "../models/Movie";
import { MovieAward } from "../models/MovieAward";
import { Nationality } from "../models/Nationality";
import { Person } from "../models/Person";
import { PersonAward } from "../models/PersonAward";
import { Role } from "../models/Role";

// Load environment variables from .env file
dotenv.config();

// Create the AppDataSource
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "pg_password",
  database: process.env.POSTGRES_DB || "movie_production_db",
  entities: [
    Assignment,
    Award,
    Contact,
    Contract,
    Movie,
    MovieAward,
    Nationality,
    Person,
    PersonAward,
    Role,
  ],
  synchronize: true, // For development only
  logging: true,
  connectTimeoutMS: 10000,
});

// Initialization logic with retry
export async function initializeDatabase(maxRetries = 5, retryInterval = 3000) {
  if (AppDataSource.isInitialized) {
    console.log("Database already initialized.");
    return AppDataSource;
  }

  console.log("Attempting database connection:");
  console.log(`- Host: ${process.env.DB_HOST || "localhost"}`);
  console.log(`- Port: ${process.env.DB_PORT || "5432"}`);
  console.log(`- DB: ${process.env.POSTGRES_DB || "movie_production_db"}`);
  console.log(`- User: ${process.env.POSTGRES_USER || "postgres"}`);

  let retries = 0;

  while (retries < maxRetries) {
    try {
      await AppDataSource.initialize();
      console.log("✅ Database connection established");
      return AppDataSource;
    } catch (err) {
      retries++;
      console.error(`❌ Attempt ${retries} failed. Retrying in ${retryInterval / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
    }
  }

  throw new Error("Database initialization failed after multiple retries.");
}

export default AppDataSource;
