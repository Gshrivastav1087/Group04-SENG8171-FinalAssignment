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

  async getNationalityById(id: number): Promise<Nationality | null> {
    return this.nationalityRepository.findOneBy({ nationality_id: id });
  }

  async updateNationality(id: number, name: string): Promise<Nationality | null> {
    const nationality = await this.nationalityRepository.findOneBy({ nationality_id: id });
    if (!nationality) return null;

    nationality.country_name = name;
    return this.nationalityRepository.save(nationality);
  }

  async deleteNationality(id: number): Promise<boolean> {
    const result = await this.nationalityRepository.delete(id);
    return result.affected !== 0;
  }
}
