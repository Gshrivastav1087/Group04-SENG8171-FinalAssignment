// src/services/ContractService.ts
import { AppDataSource } from '../config/configure';
import { Contract } from '../models/Contract';
import { Movie } from '../models/Movie';
import { Person } from '../models/Person';

export class ContractService {
  private contractRepository = AppDataSource.getRepository(Contract);
  private personRepository = AppDataSource.getRepository(Person);
  private movieRepository = AppDataSource.getRepository(Movie);

  async createContract(personId: number, movieId: number, salary: number): Promise<Contract> {
    const person = await this.personRepository.findOne({ where: { union_id: personId } });
    const movie = await this.movieRepository.findOne({ where: { movie_id: movieId } });

    if (!person || !movie) throw new Error("Person or Movie not found");

    const contract = this.contractRepository.create({ person, movie, salary });
    return this.contractRepository.save(contract);
  }

  async getAllContracts(): Promise<Contract[]> {
    return this.contractRepository.find({ relations: ['person', 'movie'] });
  }

  async getContractById(contract_id: number): Promise<Contract | null> {
    return this.contractRepository.findOne({
      where: { contract_id },
      relations: ['person', 'movie'],
    });
  }

  async updateContract(contract_id: number, personId: number, movieId: number, salary: number): Promise<Contract | null> {
    const contract = await this.contractRepository.findOne({ where: { contract_id }, relations: ['person', 'movie'] });
    if (!contract) return null;

    const person = await this.personRepository.findOneBy({ union_id: personId });
    const movie = await this.movieRepository.findOneBy({ movie_id: movieId });

    if (!person || !movie) throw new Error('Person or Movie not found');

    contract.person = person;
    contract.movie = movie;
    contract.salary = salary;

    return this.contractRepository.save(contract);
  }

  async deleteContract(contract_id: number): Promise<boolean> {
    const result = await this.contractRepository.delete(contract_id);
    return result.affected !== 0;
  }
}
