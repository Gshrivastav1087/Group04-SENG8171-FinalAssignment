import express, { Request, Response } from 'express';
import { MovieService } from '../services/MovieService';

const router = express.Router();
const movieService = new MovieService();

// Create a new movie
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, release_date, description } = req.body;
    const result = await movieService.createMovie(title, release_date, description);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create movie', details: error.message });
  }
});

// Get all movies
router.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await movieService.getAllMovies();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve movies', details: error.message });
  }
});

// Get movie by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await movieService.getMovieById(+req.params.id);
    result ? res.json(result) : res.status(404).json({ error: 'Movie not found' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve movie', details: error.message });
  }
});

// Update a movie
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, release_date, description } = req.body;
    const result = await movieService.updateMovie(+req.params.id, title, release_date, description);
    result ? res.json(result) : res.status(404).json({ error: 'Movie not found' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update movie', details: error.message });
  }
});

// Delete a movie
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await movieService.deleteMovie(+req.params.id);
    deleted
      ? res.json({ message: 'Movie deleted successfully' })
      : res.status(404).json({ error: 'Movie not found' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete movie', details: error.message });
  }
});

export default router;
