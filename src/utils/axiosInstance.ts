import axios from 'axios';
const url =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5001/api'
		: 'https://ecommerce-api-2fzr.onrender.com/api';
axios.defaults.baseURL = url;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axios;
