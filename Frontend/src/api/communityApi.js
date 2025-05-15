import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' }); // your backend URL

export const registerCommunityMember = () => API.post('/community/register');
export const fetchAvailableProblem = () => API.get('/community/problem');
export const pickProblem = (issueId) => API.post('/community/pick-problem', { issueId });
export const submitProof = (data) => API.post('/community/submit-proof', data);
export const fetchMyTasks = () => API.get('/community/my-tasks');
