import { AppDataSource } from '../config/configure';
import { Contact } from '../models/Contact';
import { Person } from '../models/Person';

export class ContactService {
  private contactRepository = AppDataSource.getRepository(Contact);
  private personRepository = AppDataSource.getRepository(Person);

  async addContactToPerson(personId: number, contactData: Partial<Contact>): Promise<Contact> {
    const person = await this.personRepository.findOne({
      where: { person_id: personId }
    });

    if (!person) throw new Error("Person not found");

    const contact = this.contactRepository.create({ ...contactData, person });
    return this.contactRepository.save(contact);
  }

  async getContactsByPersonId(personId: number): Promise<Contact[]> {
    return this.contactRepository.find({
      where: { person: { person_id: personId } }
    });
  }
}
