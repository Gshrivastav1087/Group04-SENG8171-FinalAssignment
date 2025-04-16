import { AppDataSource } from '../../../config/configure';
import { Nationality } from '../../../models/Nationality';
import { NationalityService } from '../../../services/NationalityService';

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

describe('NationalityService', () => {
  const repo = AppDataSource.getRepository(Nationality);
  const service = new NationalityService();

  it('should create a nationality', async () => {
    const mockData = {};
    repo.save.mockResolvedValue(mockData);

    const result = await service.createNationality(mockData as Nationality);
    expect(result).toEqual(mockData);
    expect(repo.save).toHaveBeenCalledWith(mockData);
  });

  it('should get all nationalities', async () => {
    const data = [{}, {}];
    repo.find.mockResolvedValue(data);

    const result = await service.getAllNationalities();
    expect(result).toEqual(data);
  });
});
