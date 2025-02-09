import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../Features/Auth/authState';

export const useAxios = () => {
  const { token } = useRecoilValue(authState);
  
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Authorization: token ? `Bearer ${token}` : '' },
  });
};
