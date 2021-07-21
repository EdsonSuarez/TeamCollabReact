const axios = require('axios');
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async config => {        
        config.headers = {
            Authorization: 'Bearer '+ localStorage.getItem('token'),
        }
        console.log("token", localStorage.getItem('token') )
        return config;
    },
    error => {
        Promise.reject(error)
    });


export const getBoard = () => axiosApiInstance.get("http://localhost:3001/api/board/get");
// export const api = () => axiosApiInstance;