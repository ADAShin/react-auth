import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !refresh) {
      // リフレッシュトークン取得
      refresh = true;
      const response = await axios.post<{ token: string }>('refresh');
      if (response.status === 200) {
        console.log('get new access token: ', response.data.token);
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.token}`;
        try {
          const res = await axios.request({
            ...error.config,
            headers: { Authorization: `Bearer ${response.data.token}` },
          });
          return res;
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);
