import { AppDataSource } from '../../../config/configure';
import { Assignment } from '../../../models/Assignment';
import { AssignmentService } from '../../../services/AssignmentService';

jest.mock('../config/configure', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    }),
  },
}));

describe('AssignmentService', () => {
  const repo = AppDataSource.getRepository(Assignment);
  const service = new AssignmentService();

  it('should create a assignment', async () => {
    const mockData = {};
    repo.save.mockResolvedValue(mockData);

    const result = await service.createAssignment(mockData as Assignment);
    expect(result).toEqual(mockData);
    expect(repo.save).toHaveBeenCalledWith(mockData);
  });

  it('should get all assignments', async () => {
    const data = [{}, {}];
    repo.find.mockResolvedValue(data);

    const result = await service.getAllAssignments();
    expect(result).toEqual(data);
  });
});
