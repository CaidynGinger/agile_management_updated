import axios from 'axios';

const BASE_URL = 'http://localhost/php_rest_agile_management/api'

export default axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
});