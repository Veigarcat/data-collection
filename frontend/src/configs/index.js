export const PUBLIC_DOMAIN = process.env.REACT_APP_PUBLIC_DOMAIN;
export const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;
export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
export const APP_ID = process.env.REACT_APP_API_ID;
// jwt
export const JWT_EXPIRES_TIME = process.env.REACT_APP_JWT_EXPIRES_TIME;
// sso
export const SSO_DOMAIN = process.env.REACT_APP_SSO_DOMAIN;
export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

export const LOGIN_DOMAIN = `${SSO_DOMAIN}/login?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
export const REGISTER_DOMAIN = `${SSO_DOMAIN}/register?client_id=${CLIENT_ID}&redirect_uri=`;
