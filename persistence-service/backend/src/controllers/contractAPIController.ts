import express, { Request, Response } from 'express';
import { ContractService } from '../services/ContractService';

const router = express.Router();
const contractService = new ContractService();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { movie_id, union_id, salary } = req.body;
    const result = await contractService.createContract(union_id, movie_id, salary);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create contract', details: error.message });
  }
});

router.get('/', async (_req, res: Response) => {
  try {
    const data = await contractService.getAllContracts();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve contracts', details: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await contractService.getContractById(+req.params.id);
    result
      ? res.json(result)
      : res.status(404).json({ error: 'Contract not found' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve contract', details: error.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { movie_id, union_id, salary } = req.body;
    const result = await contractService.updateContract(+req.params.id, union_id, movie_id, salary);
    result
      ? res.json(result)
      : res.status(404).json({ error: 'Contract not found' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update contract', details: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await contractService.deleteContract(+req.params.id);
    deleted
      ? res.json({ message: 'Contract deleted successfully' })
      : res.status(404).json({ error: 'Contract not found' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete contract', details: error.message });
  }
});

export default router;
