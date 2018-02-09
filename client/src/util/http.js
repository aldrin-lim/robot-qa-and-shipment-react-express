// Utility functions

import { connection } from '../config';
import axios from 'axios';


// HTTP Calls 
export const get = (url) => axios.get(`${connection.url}:${connection.port}/${url}`);
export const post = (url) => axios.post(`${connection.url}:${connection.port}/${url}`);