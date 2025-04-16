import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contract } from './Contract';
import { MovieAward } from './MovieAward';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn()
  movie_id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  release_date: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Contract, contract => contract.movie)
  contracts: Contract[];

  @OneToMany(() => MovieAward, movieAward => movieAward.movie)
  movieAwards: MovieAward[];
}
