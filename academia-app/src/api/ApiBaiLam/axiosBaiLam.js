import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_API_BAILAM,
    timeout: 30000
});
export default instance;