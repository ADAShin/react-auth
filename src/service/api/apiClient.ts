import axios from 'axios';
// import { setAuth } from '../redux/auth/authSlice';
// import { store } from '../redux/store';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

let refresh = false;

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !refresh) {
      // リフレッシュトークン取得
      refresh = true;
      const response = await apiClient.post<{ token: string }>('refresh');
      if (response.status === 200) {
        console.log('get new access token: ', response.data.token);
        apiClient.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.token}`;
        try {
          const res = await apiClient.request({
            ...error.config,
            headers: { Authorization: `Bearer ${response.data.token}` },
          });
          return res;
        } catch (e) {
          //store.dispatch(setAuth(false));
          return Promise.reject(e);
        }
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);

export default apiClient;
