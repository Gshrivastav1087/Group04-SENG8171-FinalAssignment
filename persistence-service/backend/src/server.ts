import express from 'express';
import 'reflect-metadata';
import { AppDataSource, initializeDatabase } from './config/configure';

import assignmentAPIController from './controllers/assignmentAPIController';
import awardAPIController from './controllers/awardAPIController';
import contractAPIController from './controllers/contractAPIController';
import movieAPIController from './controllers/movieAPIController';
import personAPIController from './controllers/personAPIController';

export const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

// Middleware to parse JSON
app.use(express.json());

// Global error handling middleware
app.use(
  (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Express error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
);

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    dbConnected: AppDataSource.isInitialized,
    timestamp: new Date().toISOString(),
  });
});

// Attach API controllers
app.use('/api/persons', personAPIController);
app.use('/api/movies', movieAPIController);
app.use('/api/awards', awardAPIController);
app.use('/api/contracts', contractAPIController);
app.use('/api/assignments', assignmentAPIController);

// Start the server
async function startApp() {
  try {
    await initializeDatabase(); // Corrected function name

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server started on http://localhost:${PORT}`);
      console.log(
        `📦 Database connection status: ${AppDataSource.isInitialized ? 'Connected' : 'Not connected'}`
      );
    });
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startApp();
}
