import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) return null; // avoid flash before localStorage read

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}