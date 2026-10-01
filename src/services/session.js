const TOKEN_KEY = 'token';
const EMAIL_KEY = 'adminEmail';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getAdminEmail = () => localStorage.getItem(EMAIL_KEY);

export const saveSession = ({ token, email }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
};
