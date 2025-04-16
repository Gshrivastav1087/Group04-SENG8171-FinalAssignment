import express, { Request, Response } from 'express';
import { AwardService } from '../services/AwardService';

const router = express.Router();
const awardService = new AwardService();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { award_name, award_year } = req.body;
    const result = await awardService.createAward(award_name, award_year);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create award' });
  }
});

router.get('/', async (_req, res: Response) => {
  try {
    const data = await awardService.getAllAwards();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve awards' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await awardService.getAwardById(+req.params.id);
    result ? res.json(result) : res.status(404).json({ error: 'Award not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve award' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { award_name, award_year } = req.body;
    const result = await awardService.updateAward(+req.params.id, award_name, award_year);
    result ? res.json(result) : res.status(404).json({ error: 'Award not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update award' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await awardService.deleteAward(+req.params.id);
    deleted
      ? res.json({ message: 'Award deleted successfully' })
      : res.status(404).json({ error: 'Award not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete award' });
  }
});

export default router;
