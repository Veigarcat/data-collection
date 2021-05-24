import api from './api';

export async function apiGetDataOverview() {
  const dataOverview = await api({
    method: 'GET',
    url: '/admin/overview',
  });
  return dataOverview;
}
