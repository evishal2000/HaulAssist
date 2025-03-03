import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../Features/Auth/authState';

export const useAxios = () => {
  const { token } = useRecoilValue(authState);
  
  return axios.create({
    baseURL: "http://localhost:8080/",
    headers: { Authorization: token ? `Bearer ${token}` : '' },
  });
};
