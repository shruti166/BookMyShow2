import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken, logout } from '@/utils/auth';
import { useEffect, useState } from 'react';
import api from '@/utils/axios';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

interface ValidUserResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
  };
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const token = getAuthToken();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        console.log('No token found');
        setIsValidating(false);
        return;
      }

      try {
        // Log the request details
        console.log('Making request to validate token:', {
          url: '/users/get-valid-user',
          headers: {
            Authorization: `Bearer ${token.substring(0, 10)}...`
          }
        });

        const response = await api.get<ValidUserResponse>('/users/get-valid-user');
        
        // Log the full response
        console.log('Server response:', {
          status: response.status,
          data: response.data,
          headers: response.headers
        });
        
        if (response.data.success) {
          console.log('Token is valid');
          setIsValid(true);
        } else {
          console.log('Token validation failed:', response.data.message);
          logout();
        }
      } catch (error) {
        // Log the full error object
        console.error('Validation error:', error);
        logout();
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!token || !isValid) {
    console.log('Redirecting to login:', { hasToken: !!token, isValid });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 