import { useSetRecoilState } from 'recoil';
import { authState } from './authState';
import axios from 'axios';

export const useAuth = () => {
  const setAuth = useSetRecoilState(authState);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });
      setAuth({ user: response.data.user, token: response.data.token });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => setAuth({ user: null, token: null });

  return { login, logout };
};
