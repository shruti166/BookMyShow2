import { useEffect, useState } from 'react';
import api from '@/utils/axios';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'partner';
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: UserData;
}

export default function PageAdmin() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data for admin page...');
        const response = await api.get<ApiResponse>('/users/get-valid-user');
        console.log('Admin page - User data response:', response.data);
        
        if (response.data.success && response.data.data) {
          const user = response.data.data;
          console.log('Admin page - Setting user data:', user);
          setUserData(user);
          
          // Verify if user is actually an admin
          if (user.role !== 'admin') {
            console.error('User is not an admin:', user.role);
            setError('Access denied. Admin privileges required.');
          }
        } else {
          console.error('Failed to get user data:', response.data.message);
          setError('Failed to load user data');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error loading user data');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-6 max-w-md w-full">
          <div className="text-red-600 text-center">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{userData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-medium capitalize">{userData.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium">
              Manage Users
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium">
              Manage Movies
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-medium">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
