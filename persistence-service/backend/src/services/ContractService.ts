import { AppDataSource } from '../config/configure';
import { Contract } from '../models/Contract';
import { Movie } from '../models/Movie';
import { Person } from '../models/Person';

export class ContractService {
  private contractRepository = AppDataSource.getRepository(Contract);
  private personRepository = AppDataSource.getRepository(Person);
  private movieRepository = AppDataSource.getRepository(Movie);

  async assignContract(personId: number, movieId: number, salary: number): Promise<Contract> {
    const person = await this.personRepository.findOne({ where: { union_id: personId } });
    const movie = await this.movieRepository.findOne({ where: { movie_id: movieId } });

    if (!person || !movie) throw new Error("Person or Movie not found");

    const contract = this.contractRepository.create({ person, movie, salary });
    return this.contractRepository.save(contract);
  }

  async getContracts(): Promise<Contract[]> {
    return this.contractRepository.find({ relations: ['person', 'movie'] });
  }
}
