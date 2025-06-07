import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken, logout } from '@/utils/auth';
import { useEffect, useState } from 'react';
import api from '@/utils/axios';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'partner' | 'user';
}

interface ValidUserResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'partner';
  };
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const location = useLocation();
  const token = getAuthToken();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | 'partner' | null>(null);

  // Log the current route and required role when component mounts
  useEffect(() => {
    console.log('ProtectedRoute - Component mounted:', {
      currentPath: location.pathname,
      requiredRole,
      fullPath: window.location.href
    });
  }, [location.pathname, requiredRole]);

  useEffect(() => {
    const validateToken = async () => {
      console.log('ProtectedRoute - Starting validation:', {
        path: location.pathname,
        fullPath: window.location.href,
        requiredRole,
        hasToken: !!token
      });

      if (!token) {
        console.log('No token found');
        setIsValidating(false);
        return;
      }

      try {
        const response = await api.get<ValidUserResponse>('/users/get-valid-user');
        
        console.log('ProtectedRoute - Server response:', {
          status: response.status,
          data: response.data,
          requiredRole,
          currentPath: location.pathname,
          fullPath: window.location.href
        });
        
        if (response.data.success && response.data.data) {
          const userData = response.data.data;
          console.log('ProtectedRoute - User data:', {
            role: userData.role,
            requiredRole,
            path: location.pathname,
            fullPath: window.location.href
          });

          // Set the role first
          setUserRole(userData.role);
          
          // Then check if the role matches
          const hasRequiredRole = !requiredRole || userData.role === requiredRole;
          console.log('ProtectedRoute - Role check:', {
            hasRequiredRole,
            userRole: userData.role,
            requiredRole,
            path: location.pathname,
            fullPath: window.location.href
          });

          setIsValid(hasRequiredRole);
        } else {
          console.log('Token validation failed:', response.data.message);
          logout();
        }
      } catch (error) {
        console.error('Validation error:', error);
        logout();
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token, requiredRole, location.pathname]);

  if (isValidating) {
    console.log('ProtectedRoute - Validating:', {
      path: location.pathname,
      requiredRole,
      userRole
    });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!token ) {
    console.log('ProtectedRoute - Redirecting to login:', { 
      hasToken: !!token, 
      isValid, 
      userRole,
      requiredRole,
      path: location.pathname 
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If we have a required role and the user doesn't have it, redirect to home
  if (requiredRole && userRole !== requiredRole) {
    console.log('ProtectedRoute - Role check failed, redirecting to home:', {
      required: requiredRole,
      actual: userRole,
      path: location.pathname
    });
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute - Rendering protected content:', {
    path: location.pathname,
    role: userRole,
    requiredRole
  });

//   if(userRole === 'partner') {
//     return <Navigate to="/partner" replace />;
//   }

  return <>{children}</>;
} 