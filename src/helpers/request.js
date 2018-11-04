import axios from 'axios';


export default axios.create({
    baseURL: 'https://localhost:8443',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*"
    }
});
