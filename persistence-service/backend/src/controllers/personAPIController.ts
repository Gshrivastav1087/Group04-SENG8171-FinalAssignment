import express, { Request, Response } from 'express';
import { PersonService } from '../services/personService';

const router = express.Router();
const personService = new PersonService();

// Create person with contact info
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      full_name,
      date_of_birth,
      biography,
      nationality_id,
      contact,
    } = req.body;

    const result = await personService.createPersonWithContact({
      full_name,
      date_of_birth,
      biography,
      nationality_id,
      contact,
    });

    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create person', details: error.message });
  }
});

// Assign a person to a movie with a contract
router.post('/:id/assign-movie', async (req: Request, res: Response) => {
  try {
    const { movie_id, salary } = req.body;
    const result = await personService.assignPersonToMovieWithContract({
      person_id: +req.params.id,
      movie_id,
      salary,
    });
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to assign contract', details: error.message });
  }
});

// Get person with contracts, contacts, awards, and nationality
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await personService.getPersonWithContracts(+req.params.id);
    result ? res.json(result) : res.status(404).json({ error: 'Person not found' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve person', details: error.message });
  }
});

export default router;
