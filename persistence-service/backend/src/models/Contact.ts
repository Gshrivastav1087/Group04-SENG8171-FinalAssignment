import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './Person';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  contact_id: number;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @ManyToOne(() => Person, (person) => person.contacts)
  person: Person;
}
