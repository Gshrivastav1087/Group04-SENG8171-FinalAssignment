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
}
