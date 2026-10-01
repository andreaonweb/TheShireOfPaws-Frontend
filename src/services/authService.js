import api, { getErrorMessage } from './api';
import { clearSession, getAdminEmail, getToken, saveSession } from './session';

const authService = {
  login: async (credentials) => {
    try {
      const { data } = await api.post('/api/auth/login', credentials);
      if (data.token) saveSession(data);
      return data;
    } catch (error) {
      throw getErrorMessage(error, 'Login failed. Please check your credentials.');
    }
  },

  logout: clearSession,

  isAuthenticated: () => Boolean(getToken()),

  getAdminEmail,
};

export default authService;
