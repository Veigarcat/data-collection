export const actionTypes = {
  GET_CHANGE_LIST_MSG: 'GET_CHANGE_LIST_MSG',
  GET_LIST_MESSAGE: 'GET_LIST_MESSAGE',
  GET_LIST_MESSAGE_SUCCESS: 'GET_LIST_MESSAGE_SUCCESS',
  GET_LIST_MESSAGE_FAILED: 'GET_LIST_MESSAGE_FAILED',

  ADD_MESSAGE: 'ADD_MESSAGE',
  ADD_MESSAGE_SUCCESS: 'ADD_MESSAGE_SUCCESS',
  ADD_MESSAGE_FAILED: 'ADD_MESSAGE_FAILED',

  UPDATE_NLU_MESSAGE: 'UPDATE_NLU_MESSAGE',
  UPDATE_NLU_MESSAGE_SUCCESS: 'UPDATE_NLU_MESSAGE_SUCCESS',

  HANDLE_CONFIRM_MESSAGE: 'HANDLE_CONFIRM_MESSAGE',
  HANDLE_CONFIRM_MESSAGE_SUCCESS: 'HANDLE_CONFIRM_MESSAGE_SUCCESS',
  HANDLE_COMMENT_MESSAGE: 'HANDLE_COMMENT_MESSAGE',
  HANDLE_COMMENT_MESSAGE_SUCCESS: 'HANDLE_COMMENT_MESSAGE_SUCCESS',
  HANDLE_IS_SHOW_COMMENT: 'HANDLE_IS_SHOW_COMMENT',
};

export const getChangeListMsg = () => {
  return {
    type: actionTypes.GET_CHANGE_LIST_MSG,
  };
};

export const getListMessage = (payload) => {
  return {
    type: actionTypes.GET_LIST_MESSAGE,
    payload,
  };
};

export const getListMessageSuccess = (payload) => {
  return {
    type: actionTypes.GET_LIST_MESSAGE_SUCCESS,
    payload,
  };
};

export const getListMessageFailed = () => {
  return {
    type: actionTypes.GET_LIST_MESSAGE_FAILED,
  };
};

export const addMessage = (data) => {
  return {
    type: actionTypes.ADD_MESSAGE,
    payload: data,
  };
};

export const addMessageSuccess = (data) => {
  return {
    type: actionTypes.ADD_MESSAGE_SUCCESS,
    payload: data,
  };
};

export const updateNluMessage = (data) => {
  return {
    type: actionTypes.UPDATE_NLU_MESSAGE,
    payload: data,
  };
};

export const updateNluMessageSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_NLU_MESSAGE_SUCCESS,
    payload: data,
  };
};

export const handleConfirmMessage = (data) => {
  return {
    type: actionTypes.HANDLE_CONFIRM_MESSAGE,
    payload: data,
  };
};

export const handleConfirmMessageSuccess = (data) => {
  return {
    type: actionTypes.HANDLE_CONFIRM_MESSAGE_SUCCESS,
    payload: data,
  };
};

export const handleCommentMessage = (data) => {
  return {
    type: actionTypes.HANDLE_COMMENT_MESSAGE,
    payload: data,
  };
};

export const handleCommentMessageSuccess = (data) => {
  return {
    type: actionTypes.HANDLE_COMMENT_MESSAGE_SUCCESS,
    payload: data,
  };
};

export const handleIsShowComment = (data) => {
  return {
    type: actionTypes.HANDLE_IS_SHOW_COMMENT,
    payload: data,
  };
};
