import express, { Request, Response } from 'express';
import { AssignmentService } from '../services/AssignmentService';

const router = express.Router();
const assignmentService = new AssignmentService();

// Create a new assignment
router.post('/', async (req: Request, res: Response) => {
  try {
    const { contract_id, role_id, cost } = req.body;
    const result = await assignmentService.createAssignment(contract_id, role_id, cost);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create assignment', details: error.message });
  }
});

// Get all assignments
router.get('/', async (_req: Request, res: Response) => {
  try {
    const data = await assignmentService.getAssignments(); // FIXED method name
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve assignments', details: error.message });
  }
});

// Get assignment by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await assignmentService.getAssignmentById(+req.params.id);
    result
      ? res.json(result)
      : res.status(404).json({ error: 'Assignment not found' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve assignment', details: error.message });
  }
});

// Update an assignment
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { contract_id, role_id, cost } = req.body;
    const result = await assignmentService.updateAssignment(+req.params.id, contract_id, role_id, cost);
    result
      ? res.json(result)
      : res.status(404).json({ error: 'Assignment not found' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update assignment', details: error.message });
  }
});

// Delete an assignment
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await assignmentService.deleteAssignment(+req.params.id);
    deleted
      ? res.json({ message: 'Assignment deleted successfully' })
      : res.status(404).json({ error: 'Assignment not found' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete assignment', details: error.message });
  }
});

export default router;
