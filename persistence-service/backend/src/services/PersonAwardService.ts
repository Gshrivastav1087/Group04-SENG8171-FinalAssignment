import { AppDataSource } from '../config/configure';
import { Award } from '../models/Award';
import { Movie } from '../models/Movie';
import { Person } from '../models/Person';
import { PersonAward } from '../models/PersonAward';

export class PersonAwardService {
  private personAwardRepository = AppDataSource.getRepository(PersonAward);
  private personRepository = AppDataSource.getRepository(Person);
  private awardRepository = AppDataSource.getRepository(Award);
  private movieRepository = AppDataSource.getRepository(Movie);

  async awardPerson(person_id: number, award_id: number, movie_id?: number): Promise<PersonAward> {
    const person = await this.personRepository.findOneBy({ union_id: person_id });
    const award = await this.awardRepository.findOneBy({ award_id });
    const movie = movie_id ? await this.movieRepository.findOneBy({ movie_id }) : null;

    if (!person || !award) throw new Error('Person or Award not found');

    const entry = this.personAwardRepository.create({ person, award, movie });
    return this.personAwardRepository.save(entry);
  }

  async getAllPersonAwards(): Promise<PersonAward[]> {
    return this.personAwardRepository.find({
      relations: ['person', 'award', 'movie'],
    });
  }

  async getPersonAwardById(id: number): Promise<PersonAward | null> {
    return this.personAwardRepository.findOne({
      where: { personaward_id: id },
      relations: ['person', 'award', 'movie'],
    });
  }

  async updatePersonAward(
    id: number,
    person_id: number,
    award_id: number,
    movie_id?: number
  ): Promise<PersonAward | null> {
    const personAward = await this.personAwardRepository.findOneBy({ personaward_id: id });
    if (!personAward) return null;

    const person = await this.personRepository.findOneBy({ union_id: person_id });
    const award = await this.awardRepository.findOneBy({ award_id });
    const movie = movie_id ? await this.movieRepository.findOneBy({ movie_id }) : null;

    if (!person || !award) throw new Error('Person or Award not found');

    personAward.person = person;
    personAward.award = award;
    personAward.movie = movie || null;

    return this.personAwardRepository.save(personAward);
  }

  async deletePersonAward(id: number): Promise<boolean> {
    const result = await this.personAwardRepository.delete(id);
    return result.affected !== 0;
  }
}
