import { initializeDatabase } from './config/configure';
import { USE_MOCK_DB } from './config/env';
import MockPersistenceService from './persistenceService/mockPersistence';
import type IPersistenceService from './persistenceService/persistenceService';
import PostgresPersistenceService from './persistenceService/postgresPersistence';
// Singleton instance
let persistenceServiceInstance: IPersistenceService | null = null;

// Function to initialize and get the persistence service
export async function initializePersistenceService(): Promise<IPersistenceService> {
  // Return existing instance if already initialized
  if (persistenceServiceInstance) {
    return persistenceServiceInstance;
  }
  
  // If mock DB is requested through env variable, use the mock service
  if (USE_MOCK_DB) {
    console.log("Using Mock persistence service as configured in env");
    persistenceServiceInstance = new MockPersistenceService();
    return persistenceServiceInstance;
  }

  // Initialize the database first
  try {
    const dataSource = await initializeDatabase();  // Initialize database connection
    
    if (dataSource.isInitialized) {
      console.log("Using PostgreSQL persistence service");
      persistenceServiceInstance = new PostgresPersistenceService(dataSource);  // Use Postgres persistence service
      return persistenceServiceInstance;
    } else {
      console.log("Database not initialized, falling back to Mock persistence service");
      persistenceServiceInstance = new MockPersistenceService();  // Fall back to mock service if DB initialization fails
      return persistenceServiceInstance;
    }
  } catch (error) {
    console.error("Error initializing database:", error);
    console.log("Falling back to Mock persistence service due to error");
    persistenceServiceInstance = new MockPersistenceService();  // Fall back to mock service on error
    return persistenceServiceInstance;
  }
}

// For synchronous access after initialization
export function getPersistenceService(): IPersistenceService {
  if (!persistenceServiceInstance) {
    console.log("WARNING: Persistence service accessed before initialization");
    return new MockPersistenceService();  // Return mock service if not yet initialized
  }
  return persistenceServiceInstance;
}

// Default export for backwards compatibility
export default {
  initialize: initializePersistenceService,
  get: getPersistenceService
};
