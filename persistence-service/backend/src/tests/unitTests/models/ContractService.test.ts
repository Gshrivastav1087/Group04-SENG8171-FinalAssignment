import { AppDataSource } from '../../../config/configure';
import { Contract } from '../../../models/Contract';
import { ContractService } from '../../../services/ContractService';

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

describe('ContractService', () => {
  const repo = AppDataSource.getRepository(Contract);
  const service = new ContractService();

  it('should create a contract', async () => {
    const mockData = {};
    repo.save.mockResolvedValue(mockData);

    const result = await service.createContract(mockData as Contract);
    expect(result).toEqual(mockData);
    expect(repo.save).toHaveBeenCalledWith(mockData);
  });

  it('should get all contracts', async () => {
    const data = [{}, {}];
    repo.find.mockResolvedValue(data);

    const result = await service.getAllContracts();
    expect(result).toEqual(data);
  });
});
