import { AppDataSource } from '../config/configure';
import { Movie } from '../entities/Movie';
import { MovieService } from '../services/MovieService';

jest.mock('../config/configure', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    }),
  },
}));

describe('MovieService', () => {
  const movieRepo = AppDataSource.getRepository(Movie);
  const service = new MovieService();

  it('should create a movie', async () => {
    const mockMovie = { title: 'Inception', releaseDate: new Date() };
    movieRepo.save.mockResolvedValue(mockMovie);

    const result = await service.createMovie(mockMovie as Movie);
    expect(result).toEqual(mockMovie);
    expect(movieRepo.save).toHaveBeenCalledWith(mockMovie);
  });

  it('should get all movies', async () => {
    const movies = [{ title: 'A' }, { title: 'B' }];
    movieRepo.find.mockResolvedValue(movies);

    const result = await service.getAllMovies();
    expect(result).toEqual(movies);
  });
});
