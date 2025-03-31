import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../Auth/authState';

export const ProtectedRoute = ({ children }) => {
  const { token } = useRecoilValue(authState);
  return token ? children : <Navigate to="/login" />;
};


