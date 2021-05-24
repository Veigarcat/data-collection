import api from './api';

export async function apiGetUser(condition) {
  const user = await api({
    method: 'GET',
    url: '/user',
    params: { condition },
  });
  return user;
}
