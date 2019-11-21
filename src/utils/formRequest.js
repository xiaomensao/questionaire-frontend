import Qs from 'qs';
import axios from 'axios';
export default axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 1000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: [function (data) {
        return Qs.stringify(data);
    }],
});