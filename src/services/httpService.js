import axios from 'axios';

/* let baseUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log('dev');
    baseUrl = 'http://localhost:8080';

} else {
    console.log('prod');
    baseUrl = 'http://api-motortracker.us-east-1.elasticbeanstalk.com';
} */

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8080';
}

//in  production we use the _redirects file in the public folder (Netlify)


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}