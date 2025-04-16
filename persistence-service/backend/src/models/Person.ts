import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './Contact';
import { Contract } from './Contract';
import { Nationality } from './Nationality';
import { PersonAward } from './PersonAward';

@Entity('person')
export class Person {
  @PrimaryGeneratedColumn()
  person_id: number;

  @Column()
  full_name: string;

  @Column({ type: 'date' })
  date_of_birth: string;

  @Column({ type: 'text' })
  biography: string;

  @ManyToOne(() => Nationality, nationality => nationality.persons)
  nationality: Nationality;

  @OneToMany(() => Contact, contact => contact.person)
  contacts: Contact[];

  @OneToMany(() => Contract, contract => contract.person)
  contracts: Contract[];

  @OneToMany(() => PersonAward, personAward => personAward.person)
  personAwards: PersonAward[];
}
