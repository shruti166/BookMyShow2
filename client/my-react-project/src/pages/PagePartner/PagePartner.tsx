import { getUserData } from '@/utils/auth';

export default function PagePartner() {
  const userData = getUserData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Partner Dashboard
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Welcome, {userData?.name}! This is the partner dashboard.
          </p>
          {/* Add partner-specific content here */}
        </div>
      </div>
    </div>
  );
}
