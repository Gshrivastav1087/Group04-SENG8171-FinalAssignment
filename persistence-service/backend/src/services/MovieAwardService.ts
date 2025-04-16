import { AppDataSource } from '../config/configure';
import { Award } from '../models/Award';
import { Movie } from '../models/Movie';
import { MovieAward } from '../models/MovieAward';

export class MovieAwardService {
  private movieAwardRepository = AppDataSource.getRepository(MovieAward);
  private movieRepository = AppDataSource.getRepository(Movie);
  private awardRepository = AppDataSource.getRepository(Award);

  async awardMovie(movie_id: number, award_id: number): Promise<MovieAward> {
    const movie = await this.movieRepository.findOneBy({ movie_id });
    const award = await this.awardRepository.findOneBy({ award_id });

    if (!movie || !award) throw new Error('Movie or Award not found');

    const entry = this.movieAwardRepository.create({ movie, award });
    return this.movieAwardRepository.save(entry);
  }

  async getAllMovieAwards(): Promise<MovieAward[]> {
    return this.movieAwardRepository.find({ relations: ['movie', 'award'] });
  }

  async getMovieAwardById(id: number): Promise<MovieAward | null> {
    return this.movieAwardRepository.findOne({ where: { id }, relations: ['movie', 'award'] });
  }

  async updateMovieAward(id: number, movie_id: number, award_id: number): Promise<MovieAward | null> {
    const movieAward = await this.movieAwardRepository.findOneBy({ id });
    if (!movieAward) return null;

    const movie = await this.movieRepository.findOneBy({ movie_id });
    const award = await this.awardRepository.findOneBy({ award_id });

    if (!movie || !award) throw new Error('Movie or Award not found');

    movieAward.movie = movie;
    movieAward.award = award;

    return this.movieAwardRepository.save(movieAward);
  }

  async deleteMovieAward(id: number): Promise<boolean> {
    const result = await this.movieAwardRepository.delete(id);
    return result.affected !== 0;
  }
}
