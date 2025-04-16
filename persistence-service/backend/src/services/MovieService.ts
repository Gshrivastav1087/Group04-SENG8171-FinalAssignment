import { AppDataSource } from '../config/configure';
import { Movie } from '../models/Movie';

export class MovieService {
  private movieRepository = AppDataSource.getRepository(Movie);

  async createMovie(title: string, releaseDate: string, description: string): Promise<Movie> {
    const movie = this.movieRepository.create({
      title,
      release_date: new Date(releaseDate),
      description,
    });
    return this.movieRepository.save(movie);
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find({ relations: ['contracts', 'movieAwards'] });
  }

  async getMovieById(id: number): Promise<Movie | null> {
    return this.movieRepository.findOne({
      where: { movie_id: id },
      relations: ['contracts', 'movieAwards'],
    });
  }

  async updateMovie(id: number, title: string, releaseDate: string, description: string): Promise<Movie | null> {
    const movie = await this.movieRepository.findOneBy({ movie_id: id });
    if (!movie) return null;

    movie.title = title;
    movie.release_date = new Date(releaseDate);
    movie.description = description;

    return this.movieRepository.save(movie);
  }

  async deleteMovie(id: number): Promise<boolean> {
    const result = await this.movieRepository.delete(id);
    return result.affected !== 0;
  }
}
