import axios from 'axios';
import { getCookie } from '../utils/cookie';

const accessToken = getCookie('accessToken');
const axiosInstance = axios.create({
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export async function apiLogout() {
  const options = {
    url: 'https://dev-sso.iristech.club/api/v1/auths/logout',
  };
  const signUpData = await axiosInstance(options);
  return signUpData;
}

export async function verify(token) {
  const response = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_DOMAIN}/api/v1/auths/verify`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
