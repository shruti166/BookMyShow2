import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { getUserData } from '@/utils/auth';
import PageLogin from '@/pages/PageLogin/PageLogin';
import PageRegister from '@/pages/PageRegister/PageRegister';
import PageHome from '@/pages/PageHome/PageHome';
import PageAdmin from '@/pages/PageAdmin/PageAdmin';
import PagePartner from '@/pages/PagePartner/PagePartner';
// Import other pages...

// Component to handle role-based redirection
function RoleBasedRoute() {
  const userData = getUserData();
  console.log('RoleBasedRoute - Current user role:', userData?.role);

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on role
  switch (userData.role) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'partner':
      return <Navigate to="/partner" replace />;
    case 'user':
      return <Navigate to="/" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<PageLogin />} />
        <Route path="/register" element={<PageRegister />} />

        {/* Role-based redirection */}
        <Route path="/" element={<RoleBasedRoute />} />

        {/* Protected routes with role checks */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <PageAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner"
          element={
            <ProtectedRoute requiredRole="partner">
              <PagePartner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute requiredRole="user">
              <PageHome />
            </ProtectedRoute>
          }
        />
       
        {/* Add more protected routes as needed */}
        {/* Example:
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageDashboard />
            </ProtectedRoute>
          }
        />
        */}
      </Routes>
    </Router>
  );
}
