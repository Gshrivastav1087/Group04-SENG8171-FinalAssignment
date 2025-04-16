import { AppDataSource } from '../../../config/configure';
import { Person } from '../../../models/Person';
import { PersonService } from '../../../services/personService';

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

describe('PersonService', () => {
  const personRepo = AppDataSource.getRepository(Person);
  const service = new PersonService();

  it('should create a person', async () => {
    const person = { name: 'John Doe', dob: new Date() };
    personRepo.save.mockResolvedValue(person);

    const result = await service.createPerson(person as Person);
    expect(result).toEqual(person);
  });

  it('should fetch all persons', async () => {
    const people = [{ name: 'John' }, { name: 'Jane' }];
    personRepo.find.mockResolvedValue(people);

    const result = await service.getAllPersons();
    expect(result).toEqual(people);
  });
});
