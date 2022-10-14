import Axios from 'axios';
import { Message } from 'element-ui';
import router from '@/router/index';
import { api } from './api';

let instance = Axios.create({
  baseURL: api.baseUrl,
  params: {
    version: '1.0.0',
  },
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    // config.headers['Accept'] = 'application/vnd.datashare.v1+json';
    // if (config.url == '/upload-avatar-image') {
    //   config.headers['Content-Type'] = 'multipart/form-data';
    // }
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
