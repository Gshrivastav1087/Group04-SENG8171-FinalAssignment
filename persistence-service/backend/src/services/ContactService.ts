import { AppDataSource } from '../config/configure';
import { Contact } from '../models/Contact';
import { Person } from '../models/Person';

export class ContactService {
  private contactRepository = AppDataSource.getRepository(Contact);
  private personRepository = AppDataSource.getRepository(Person);

  async addContactToPerson(union_id: number, contactData: Partial<Contact>): Promise<Contact> {
    const person = await this.personRepository.findOne({ where: { union_id } });
    if (!person) throw new Error("Person not found");

    const contact = this.contactRepository.create({ ...contactData, person });
    return this.contactRepository.save(contact);
  }

  async getContactsByPersonId(union_id: number): Promise<Contact[]> {
    return this.contactRepository.find({
      where: { person: { union_id } },
      relations: ['person'],
    });
  }

  async getContactById(contact_id: number): Promise<Contact | null> {
    return this.contactRepository.findOne({ where: { contact_id }, relations: ['person'] });
  }

  async updateContact(contact_id: number, updatedData: Partial<Contact>): Promise<Contact | null> {
    const contact = await this.contactRepository.findOneBy({ contact_id });
    if (!contact) return null;

    Object.assign(contact, updatedData);
    return this.contactRepository.save(contact);
  }

  async deleteContact(contact_id: number): Promise<boolean> {
    const result = await this.contactRepository.delete(contact_id);
    return result.affected !== 0;
  }
}
