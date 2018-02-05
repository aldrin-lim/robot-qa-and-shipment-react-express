
import connection from './connection';

export default {
  get: (endpoint) => fetch(`${connection.url}:${connection.port}/${endpoint}`).then(res => res.json())
}