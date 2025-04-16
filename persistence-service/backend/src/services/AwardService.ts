import { AppDataSource } from '../config/configure';
import { Award } from '../models/Award';

export class AwardService {
  private awardRepository = AppDataSource.getRepository(Award);

  async createAward(award_name: string, award_year: number): Promise<Award> {
    const award = this.awardRepository.create({ award_name, award_year });
    return this.awardRepository.save(award);
  }

  async getAllAwards(): Promise<Award[]> {
    return this.awardRepository.find();
  }

  async getAwardById(id: number): Promise<Award | null> {
    return this.awardRepository.findOneBy({ award_id: id });
  }

  async updateAward(id: number, award_name: string, award_year: number): Promise<Award | null> {
    const award = await this.awardRepository.findOneBy({ award_id: id });
    if (!award) return null;

    award.award_name = award_name;
    award.award_year = award_year;

    return this.awardRepository.save(award);
  }

  async deleteAward(id: number): Promise<boolean> {
    const result = await this.awardRepository.delete(id);
    return result.affected !== 0;
  }
}
