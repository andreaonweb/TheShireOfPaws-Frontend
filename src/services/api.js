import axios from 'axios';
import { clearSession, getToken } from './session';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401, 403].includes(error.response?.status)) {
      clearSession();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const unwrap = (request) => request.then((response) => response.data);

export const MAX_PAGE_SIZE = 50;

export const fetchAllPages = async (fetchPage) => {
  const items = [];
  for (let page = 0, last = false; !last; page++) {
    const data = await fetchPage(page, MAX_PAGE_SIZE);
    items.push(...(data.content ?? []));
    last = data.last ?? true;
  }
  return items;
};

export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') =>
  error?.response?.data?.message || fallback;

export default api;
