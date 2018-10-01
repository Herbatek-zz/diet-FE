import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('Token');

export default axios.create({
    baseURL: 'https://localhost:8443',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*"
    }
});
