import axios from 'axios';
 
var instance = axios.create({
    baseURL: 'http://localhost:8000/api',
});

instance.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token
 
    let token = window.localStorage.getItem('token');
    if (token) {
    
        token = 'Token' + ' ' + token.replace(/'|"/g, ''); // 把token加入到默认请求参数中
 
        config.headers.common['Authorization'] = token;
 
    }
 
    return config;
 
}, function (error) {
 
    return Promise.reject(error);
 
})

export default instance