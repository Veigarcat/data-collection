export const actionTypes = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  ADD_MESSAGE_SUCCESS: 'ADD_MESSAGE_SUCCESS',
  ADD_MESSAGE_FAILED: 'ADD_MESSAGE_FAILED',

  HANDLE_CONFIRM_MESSAGE: 'HANDLE_CONFIRM_MESSAGE',
  HANDLE_CONFIRM_MESSAGE_SUCCESS: 'HANDLE_CONFIRM_MESSAGE_SUCCESS',
  HANDLE_COMMENT_MESSAGE: 'HANDLE_COMMENT_MESSAGE',
  HANDLE_COMMENT_MESSAGE_SUCCESS: 'HANDLE_COMMENT_MESSAGE_SUCCESS',
  HANDLE_IS_SHOW_COMMENT: 'HANDLE_IS_SHOW_COMMENT',
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
