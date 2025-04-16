import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Award } from './Award';
import { Movie } from './Movie';

@Entity('movieaward')
export class MovieAward {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, movie => movie.movieAwards)
  movie: Movie;

  @ManyToOne(() => Award, award => award.movieAwards)
  award: Award;
}
