import axios from 'axios';
axios.defaults.baseURL = 'https://ecommerceapi20231014234739.azurewebsites.net/api';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axios;
