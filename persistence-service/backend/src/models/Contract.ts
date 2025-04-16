import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Assignment } from './Assignment';
import { Movie } from './Movie';
import { Person } from './Person';

@Entity('contract')
export class Contract {
  @PrimaryGeneratedColumn()
  contract_id: number;

  @ManyToOne(() => Person, person => person.contracts)
  person: Person;

  @ManyToOne(() => Movie, movie => movie.contracts)
  movie: Movie;

  @Column({ type: 'decimal' })
  salary: number;

  @OneToMany(() => Assignment, assignment => assignment.contract)
  assignments: Assignment[];
}
