export const actionTypes = {
  GET_DATA_USER: 'GET_DATA_USER',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  FETCH_USER_FAILED: 'FETCH_USER_FAILED',
  FILTER_USER: 'FILTER_USER',

  USER_JOIN_CAMPAIGN: 'USER_JOIN_CAMPAIGN',
  USER_JOIN_CAMPAIGN_SUCCESS: 'USER_JOIN_CAMPAIGN_SUCCESS',

  USER_LEAVE_CAMPAIGN: 'USER_LEAVE_CAMPAIGN',
  USER_LEAVE_CAMPAIGN_SUCCESS: 'USER_LEAVE_CAMPAIGN_SUCCESS',

  HANDLE_ACCEPT_INVITE: 'HANDLE_ACCEPT_INVITE',
  HANDLE_ACCEPT_INVITE_SUCCESS: 'HANDLE_ACCEPT_INVITE_SUCCESS',
  HANDLE_EDIT_USER: 'HANDLE_EDIT_USER',
  HANDLE_EDIT_USER_SUCCESS: 'HANDLE_EDIT_USER_SUCCESS',
};

export const fetchListUserFailed = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAILED,
    payload: {
      error,
    },
  };
};

export const fetchListUserSuccess = (data) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getDataUser = (data) => {
  return {
    type: actionTypes.GET_DATA_USER,
    payload: data,
  };
};

export const filterUser = (data) => {
  return {
    type: actionTypes.FILTER_USER,
    payload: data,
  };
};

export const userJoinCampaign = (data) => {
  return {
    type: actionTypes.USER_JOIN_CAMPAIGN,
    payload: data,
  };
};
export const userJoinCampaignSuccess = (data) => {
  return {
    type: actionTypes.USER_JOIN_CAMPAIGN_SUCCESS,
    payload: data,
  };
};

export const userLeaveCampaign = (data) => {
  return {
    type: actionTypes.USER_LEAVE_CAMPAIGN,
    payload: data,
  };
};
export const userLeaveCampaignSuccess = (data) => {
  return {
    type: actionTypes.USER_LEAVE_CAMPAIGN_SUCCESS,
    payload: data,
  };
};

export const handleAcceptInvite = (payload) => {
  return {
    type: actionTypes.HANDLE_ACCEPT_INVITE,
    payload,
  };
};

export const handleAcceptInviteSuccess = (data) => {
  return {
    type: actionTypes.HANDLE_ACCEPT_INVITE_SUCCESS,
    payload: data,
  };
};

export const fetchEditUser = (data) => {
  return {
    type: actionTypes.HANDLE_EDIT_USER,
    payload: data,
  };
};
export const fetchHandleUserSuccess = (payload) => {
  return {
    type: actionTypes.HANDLE_EDIT_USER_SUCCESS,
    payload,
  };
};
