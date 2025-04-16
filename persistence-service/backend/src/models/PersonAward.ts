import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Award } from './Award';
import { Movie } from './Movie';
import { Person } from './Person';

@Entity('personaward')
export class PersonAward {
  @PrimaryGeneratedColumn()
  personaward_id: number;

  @ManyToOne(() => Person, person => person.personAwards)
  person: Person;

  @ManyToOne(() => Award, award => award.personAwards)
  award: Award;

  @ManyToOne(() => Movie, { nullable: true })
  movie: Movie | null;
}
