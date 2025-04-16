import { AppDataSource } from '../config/configure';
import { Award } from '../models/Award';
import { Movie } from '../models/Movie';
import { MovieAward } from '../models/MovieAward';

export class MovieAwardService {
  private movieAwardRepository = AppDataSource.getRepository(MovieAward);

  async awardMovie(movie: Movie, award: Award): Promise<MovieAward> {
    const entry = this.movieAwardRepository.create({ movie, award });
    return this.movieAwardRepository.save(entry);
  }
}
