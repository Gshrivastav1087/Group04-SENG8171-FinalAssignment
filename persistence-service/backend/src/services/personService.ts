import { AppDataSource } from '../config/configure';
import { Contact } from '../models/Contact';
import { Contract } from '../models/Contract';
import { Nationality } from '../models/Nationality';
import { Person } from '../models/Person';

export class PersonService {
  private personRepo = AppDataSource.getRepository(Person);
  private contactRepo = AppDataSource.getRepository(Contact);
  private nationalityRepo = AppDataSource.getRepository(Nationality);
  private contractRepo = AppDataSource.getRepository(Contract);

  async createPersonWithContact(data: {
    full_name: string;
    date_of_birth: string;
    biography: string;
    nationality_id: number;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
  }): Promise<Person> {
    const nationality = await this.nationalityRepo.findOne({
      where: { nationality_id: data.nationality_id }
    });
    if (!nationality) throw new Error("Nationality not found");

    const person = this.personRepo.create({
      full_name: data.full_name,
      date_of_birth: new Date(data.date_of_birth),
      biography: data.biography,
      nationality
    });
    const savedPerson = await this.personRepo.save(person);

    const contact = this.contactRepo.create({
      ...data.contact,
      person: savedPerson
    });
    await this.contactRepo.save(contact);

    return savedPerson;
  }

  async assignPersonToMovieWithContract(data: {
    person_id: number;
    movie_id: number;
    salary: number;
  }): Promise<Contract> {
    const person = await this.personRepo.findOne({
      where: { union_id: data.person_id }
    });
    if (!person) throw new Error("Person not found");

    const contract = this.contractRepo.create({
      person: { union_id: data.person_id },
      movie: { movie_id: data.movie_id },
      salary: data.salary
    });

    return await this.contractRepo.save(contract);
  }

  async getPersonWithContracts(person_id: number): Promise<Person | null> {
    return await this.personRepo.findOne({
      where: { union_id: person_id },
      relations: ['contracts', 'contacts', 'nationality', 'personAwards']
    });
  }
}
