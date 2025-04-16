import { AppDataSource } from '../../../config/configure';
import { Contact } from '../../../models/Contact';
import { ContactService } from '../../../services/ContactService';

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

describe('ContactService', () => {
  const repo = AppDataSource.getRepository(Contact);
  const service = new ContactService();

  it('should create a contact', async () => {
    const mockData = {};
    repo.save.mockResolvedValue(mockData);

    const result = await service.createContact(mockData as Contact);
    expect(result).toEqual(mockData);
    expect(repo.save).toHaveBeenCalledWith(mockData);
  });

  it('should get all contacts', async () => {
    const data = [{}, {}];
    repo.find.mockResolvedValue(data);

    const result = await service.getAllContacts();
    expect(result).toEqual(data);
  });
});
