import { AppDataSource } from '../config/configure';
import { PersonAward } from '../entities/PersonAward';
import { PersonAwardService } from '../services/PersonAwardService';

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

describe('PersonAwardService', () => {
  const repo = AppDataSource.getRepository(PersonAward);
  const service = new PersonAwardService();

  it('should create a personaward', async () => {
    const mockData = {};
    repo.save.mockResolvedValue(mockData);

    const result = await service.createPersonAward(mockData as PersonAward);
    expect(result).toEqual(mockData);
    expect(repo.save).toHaveBeenCalledWith(mockData);
  });

  it('should get all personawards', async () => {
    const data = [{}, {}];
    repo.find.mockResolvedValue(data);

    const result = await service.getAllPersonAwards();
    expect(result).toEqual(data);
  });
});
