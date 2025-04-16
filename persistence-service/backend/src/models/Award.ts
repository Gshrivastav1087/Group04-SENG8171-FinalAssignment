import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieAward } from './MovieAward';
import { PersonAward } from './PersonAward';

@Entity('award')
export class Award {
  @PrimaryGeneratedColumn()
  award_id: number;

  @Column()
  award_name: string;

  @Column()
  award_year: number;

  @OneToMany(() => MovieAward, movieAward => movieAward.award)
  movieAwards: MovieAward[];

  @OneToMany(() => PersonAward, personAward => personAward.award)
  personAwards: PersonAward[];
}
