import { AppDataSource } from '../config/configure';
import { Movie } from '../models/Movie';

export class MovieService {
  private movieRepository = AppDataSource.getRepository(Movie);

  async createMovie(title: string, releaseDate: string): Promise<Movie> {
    const movie = this.movieRepository.create({ title, release_date: releaseDate });
    return this.movieRepository.save(movie);
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find({ relations: ['contracts'] });
  }
}
