import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('Token');

export default axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*"
    }
});
