import axios from 'axios';
import { setAuth } from '../../redux/auth/authSlice';
import { store } from '../../redux/store';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

let refresh = false;

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !refresh) {
      try {
        // リフレッシュトークン取得
        refresh = true;
        const {
          data: { token },
        } = await apiClient.post<{ token: string }>('refresh');
        console.debug('get new access token: ', token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return await apiClient.request({
          ...error.config,
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.debug('interceptor refresh flow: ', err);
        store.dispatch(setAuth(false));
        return Promise.reject(err);
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);

export default apiClient;
