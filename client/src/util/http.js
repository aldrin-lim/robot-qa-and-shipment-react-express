// Utility functions

import { connection } from '../config';
import axios from 'axios';

// Global Settings for Axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// HTTP Calls 
export const get = (url) => axios.get(`${connection.url}:${connection.port}/${url}`);
export const post = (url, data) => axios.post(`${connection.url}:${connection.port}/${url}`, data);