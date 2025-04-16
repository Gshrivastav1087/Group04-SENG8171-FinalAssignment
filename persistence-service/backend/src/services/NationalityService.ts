import { AppDataSource } from '../config/configure';
import { Nationality } from '../models/Nationality';

export class NationalityService {
  private nationalityRepository = AppDataSource.getRepository(Nationality);

  async createNationality(name: string): Promise<Nationality> {
    const nationality = this.nationalityRepository.create({ country_name: name });
    return this.nationalityRepository.save(nationality);
  }

  async getAllNationalities(): Promise<Nationality[]> {
    return this.nationalityRepository.find();
  }
}
