import { getUserData } from '@/utils/auth';

export default function PageHome() {
  const userData = getUserData();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome, {userData?.name || 'User'}!
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            This is a protected page. You can only see this if you're logged in.
          </p>
        </div>
      </div>
    </div>
  );
} 