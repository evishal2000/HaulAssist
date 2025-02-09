import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../Features/Auth/authState';

const ProtectedRoute = ({ children }) => {
  const { token } = useRecoilValue(authState);
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
