import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirigir al login, pero guardar la ubicación actual para regresar después si es necesario
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
