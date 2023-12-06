// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // This should be something like 'http://your-ec2-instance.amazonaws.com/api'
});

export default instance;
