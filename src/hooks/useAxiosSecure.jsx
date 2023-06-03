import { useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';


const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000' // Replace with your base URL
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && [401, 403].includes(error.response.status)) {
          // Logout and redirect to login page
          logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [axiosSecure]);

  return [axiosSecure];
};

export default useAxiosSecure;
