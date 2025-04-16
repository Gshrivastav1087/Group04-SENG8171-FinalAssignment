import { AppDataSource } from '../../../config/configure';
import { Award } from '../../../models/Award';
import { AwardService } from '../../../services/AwardService';

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

describe('AwardService', () => {
  const repo = AppDataSource.getRepository(Award);
  const service = new AwardService();

  it('should create a award', async () => {
    const mockData = {};
    repo.save.mockResolvedValue(mockData);

    const result = await service.createAward(mockData as Award);
    expect(result).toEqual(mockData);
    expect(repo.save).toHaveBeenCalledWith(mockData);
  });

  it('should get all awards', async () => {
    const data = [{}, {}];
    repo.find.mockResolvedValue(data);

    const result = await service.getAllAwards();
    expect(result).toEqual(data);
  });
});
