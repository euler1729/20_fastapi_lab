import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default axios.create({
    baseURL: 'http://localhost:8000',
});