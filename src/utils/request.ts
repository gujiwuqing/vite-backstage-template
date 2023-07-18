import { message } from 'antd';
import axios from 'axios';

const request = axios.create({
  // baseURL: import.meta.env.DEV
  //   ? 'http://127.0.0.1:7001'
  //   : 'http://agency.gujiwuqing.top:3002',
  baseURL: 'http://agency.gujiwuqing.top:3002',
  timeout: 15000,
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log('response', response.data.status);
    if (response.data.status === 401) {
      message.error(response.data.message);
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.href = '/login';
      }, 500);
    } else if (response.data.status != 200) {
      message.error(response.data.message);
    }
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default request;
