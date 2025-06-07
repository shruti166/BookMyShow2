import { useEffect, useState } from 'react';
import api from '@/utils/axios';

interface Movie {
  _id: string;
  title: string;
  description: string;
  duration: number;
  language: string;
  genre: string;
  releaseDate: string;
  poster: string;
  rating: number;
}

interface MovieResponse {
  success: boolean;
  message: string;
  data: Movie[];
}

export function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get<MovieResponse>('/movies/get-all-movies');
        if (response.data.success) {
          setMovies(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch movies');
        console.error('Error fetching movies:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {movies.map((movie) => (
        <div key={movie._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{movie.title}</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{movie.language}</span>
              <span className="text-sm text-gray-600">{movie.duration} min</span>
            </div>
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{movie.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600">{movie.genre}</span>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-sm text-gray-600">{movie.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 