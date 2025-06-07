import { getUserData } from '@/utils/auth';
import { MovieList } from '@/components/MovieList';

export default function PageHome() {
  const userData = getUserData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome, {userData?.name || 'User'}!
        </h1>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <p className="text-gray-600">
            This is a protected page. You can only see this if you're logged in.
          </p>
        </div>
        
        {/* Movies Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Now Showing</h2>
          <MovieList />
        </div>
      </div>
    </div>
  );
} 