import toast from 'react-hot-toast';

import { deleteAuthCookies, getAccessToken } from '@store/auth';

export const redirectlogin = (error: any) => {
  if (getAccessToken() && (error?.response?.status === 401 || error?.response?.status === 403)) {
    localStorage.clear();
    deleteAuthCookies();
    window.location.href = '/';
    toast('Session expired');
    return;
  }

  throw error?.data || error?.response;
};
