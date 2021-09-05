import axios from 'axios'
const bearerToken = localStorage.getItem('token') || '';
const axiosHeader = axios.create({
    baseURL: process.env.VUE_APP_ROOT_API,
    headers: {
        "Accept": "application/json",
        "Authorization":  'Bearer ' + bearerToken
    }
});

export default axiosHeader