export const actionTypes = {
  ADD_USECASE: 'ADD_USECASE',
  HANDLE_USECASE_SUCCESS: 'HANDLE_USECASE_SUCCESS',
  ADD_MESSAGE: 'ADD_MESSAGE',
  ADD_USECASE_TO_LIST: 'ADD_USECASE_TO_LIST',

  DELETE_USECASE: 'DELETE_USECASE',
  DELETE_USECASE_TO_LIST: 'DELETE_USECASE_TO_LIST',

  EDIT_USECASE: 'EDIT_USECASE',
  EDIT_USECASE_TO_LIST: 'EDIT_USECASE_TO_LIST',
};

export const actionAddUsecase = (data) => {
  return {
    type: actionTypes.ADD_USECASE,
    payload: data,
  };
};
export const actionHandleUsecaseSuccess = (payload) => {
  return {
    type: actionTypes.HANDLE_USECASE_SUCCESS,
    payload,
  };
};
export const addUsecaseToList = (payload) => {
  return {
    type: actionTypes.ADD_USECASE_TO_LIST,
    payload,
  };
};
export const getMessage = (message) => {
  return {
    type: actionTypes.ADD_MESSAGE,
    payload: message,
  };
};

export const deleteUsecase = (payload) => {
  return {
    type: actionTypes.DELETE_USECASE,
    payload,
  };
};
export const deleteUsecaseToList = (payload) => {
  return {
    type: actionTypes.DELETE_USECASE_TO_LIST,
    payload,
  };
};
export const editUsecase = (payload) => {
  return {
    type: actionTypes.EDIT_USECASE,
    payload,
  };
};
export const editUsecaseToList = (payload) => {
  return {
    type: actionTypes.EDIT_USECASE_TO_LIST,
    payload,
  };
};
