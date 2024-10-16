import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {StorageKey} from '../utils/Enum';
import {getData} from '../utils/Utils';
import {BASE_URL} from './endPoints';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// // Add an interceptor to modify the request headers
axiosInstance.interceptors.request.use(
  async config => {
    const userData = await getData(StorageKey.userData);

    // // Set the Authorization header if the token exists
    console.log('userdata: ', userData);
    if (userData) {
      config.headers['UserId'] = userData.userID;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
