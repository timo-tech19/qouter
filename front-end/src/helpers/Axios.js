import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
let token;

if (user) {
    token = user.token;
}

const Axios = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
});

Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export { Axios };
