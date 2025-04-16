import { AppDataSource } from '../../../config/configure';
import { MovieAward } from '../../../models/MovieAward';
import { MovieAwardService } from '../../../services/MovieAwardService';

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

describe('MovieAwardService', () => {
  const repo = AppDataSource.getRepository(MovieAward);
  const service = new MovieAwardService();

  it('should create a movieaward', async () => {
    const mockData = {};
    repo.save.mockResolvedValue(mockData);

    const result = await service.createMovieAward(mockData as MovieAward);
    expect(result).toEqual(mockData);
    expect(repo.save).toHaveBeenCalledWith(mockData);
  });

  it('should get all movieawards', async () => {
    const data = [{}, {}];
    repo.find.mockResolvedValue(data);

    const result = await service.getAllMovieAwards();
    expect(result).toEqual(data);
  });
});
