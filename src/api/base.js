import axios from 'axios'
import { Toast } from 'antd-mobile'
let api = {};


// 添加拦截器
axios.interceptors.request.use(function (config) {
  config.timeout = 1000;
   Toast.loading('loading')
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    Toast.hide()
    return response;
  }, function (error) {
    return Promise.reject(error);
  });


api.get = function(url,data={}){
    return axios.get(url,{
        params: data
    })
}
api.post = function(url,data){
    return axios.post(url,data);
}
api.put = function(url,data){
    return axios.put(url,data);
}


export default api;