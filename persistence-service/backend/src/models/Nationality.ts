import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './Person';

@Entity('nationality')
export class Nationality {
  @PrimaryGeneratedColumn()
  nationality_id: number;

  @Column({ unique: true })
  country_name: string;

  @OneToMany(() => Person, person => person.nationality)
  persons: Person[];
}
