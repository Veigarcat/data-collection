import api from './api';

export async function apiGetListUsecase(conditions) {
  const listUsecase = await api({
    method: 'GET',
    url: '/usecase/get-list-use-case',
    params: { conditions },
  });
  return listUsecase;
}
export async function apiGetUsecase(condition) {
  const result = await api({
    method: 'GET',
    url: '/usecase/get-use-case',
    params: { condition },
  });
  return result;
}
export async function apiAddUsecase(usecase) {
  const result = await api({
    method: 'POST',
    url: '/usecase/create',
    data: usecase,
  });
  return result;
}

export async function apiDeleteUsecase({ usecaseId }) {
  const result = await api({
    method: 'DELETE',
    url: '/usecase/delete',
    params: { usecaseId },
  });
  return result;
}
export async function apiEditUsecase({ usecaseId, data }) {
  const result = await api({
    method: 'POST',
    url: '/usecase/edit',
    data: { usecaseId, data },
  });
  return result;
}
