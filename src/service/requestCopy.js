import Axios from 'axios';
import { Message } from 'element-ui';
import router from '@/router/index';

let instance = Axios.create({
  baseURL: '/',
  params: {
    // version: '1.0.0',
  },
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(res => {
  if (res.data.code === 1001) {
    localStorage.clear();
    Message.warning('请重新登录');
    router.push('/dataCenter');
  }
  return res.data;
});

export default instance;
