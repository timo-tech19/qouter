import axios from 'axios';

const token = JSON.parse(localStorage.getItem('userToken'));

const Axios = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
});

Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export { Axios };
