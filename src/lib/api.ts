import axios from 'axios';

const URL = 'https://api.carbonintensity.org.uk/';

const API = axios.create({ baseURL: URL });

export { API };
