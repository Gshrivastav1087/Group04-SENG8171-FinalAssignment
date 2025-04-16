import { AppDataSource } from '../config/configure';
import { Award } from '../models/Award';
import { Movie } from '../models/Movie';
import { Person } from '../models/Person';
import { PersonAward } from '../models/PersonAward';

export class PersonAwardService {
  private personAwardRepository = AppDataSource.getRepository(PersonAward);

  async awardPerson(person: Person, award: Award, movie?: Movie): Promise<PersonAward> {
    const entry = this.personAwardRepository.create({ person, award, movie });
    return this.personAwardRepository.save(entry);
  }
}
