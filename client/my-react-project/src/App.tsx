import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import PageLogin from '@/pages/PageLogin/PageLogin';
import PageRegister from '@/pages/PageRegister/PageRegister';
import PageHome from '@/pages/PageHome/PageHome';
// Import other pages...

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<PageLogin />} />
        <Route path="/register" element={<PageRegister />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
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
