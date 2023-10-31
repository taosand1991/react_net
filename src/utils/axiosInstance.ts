import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:5000/api';
const url =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000/api'
		: 'https://ecommerceapi20231014234739.azurewebsites.net/api';
axios.defaults.baseURL = url;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axios;
