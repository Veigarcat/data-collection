export const actionTypes = {
  API_GET_DATA_CAMPAIGN: 'API_GET_DATA_CAMPAIGN',
  GET_DATA_CAMPAIGN: 'GET_DATA_CAMPAIGN',

  FETCH_CAMPAIGN: 'FETCH_CAMPAIGN',
  FETCH_CAMPAIGN_SUCCESS: 'FETCH_CAMPAIGN_SUCCESS',
  FETCH_CAMPAIGN_FAILED: 'FETCH_CAMPAIGN_FAILED',

  USER_JOIN_CAMPAIGN: 'USER_JOIN_CAMPAIGN',
  USER_JOIN_CAMPAIGN_SUCCESS: 'USER_JOIN_CAMPAIGN_SUCCESS',

  USER_LEAVE_CAMPAIGN: 'USER_LEAVE_CAMPAIGN',
  USER_LEAVE_CAMPAIGN_SUCCESS: 'USER_LEAVE_CAMPAIGN_SUCCESS',

  FILTER_SEARCH: 'FILTER_SEARCH',

  CREATE_CAMPAIGN: 'CREATE_CAMPAIGN',
  CREATE_CAMPAIGN_SUCCESS: 'CREATE_CAMPAIGN_SUCCESS',
};

export const callApiGetDataCampaign = (data) => {
  return {
    type: actionTypes.API_GET_DATA_CAMPAIGN,
    payload: data,
  };
};

export const getDataCampaign = (data) => {
  return {
    type: actionTypes.GET_DATA_CAMPAIGN,
    payload: data,
  };
};

export const fetchAllCampaigns = (data) => {
  return {
    type: actionTypes.FETCH_CAMPAIGN,
    payload: data,
  };
};

export const fetchListCampaignSuccess = (data) => {
  return {
    type: actionTypes.FETCH_CAMPAIGN_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListCampaignFailed = (error) => {
  return {
    type: actionTypes.FETCH_CAMPAIGN_FAILED,
    payload: {
      error,
    },
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
export const filterCampaign = (data) => {
  return {
    type: actionTypes.FILTER_SEARCH,
    payload: data,
  };
};
export const fetchCreateCampaign = (data) => {
  return {
    type: actionTypes.CREATE_CAMPAIGN,
    payload: data,
  };
};

export const fetchCreateCampaignSuccess = (payload) => {
  return {
    type: actionTypes.CREATE_CAMPAIGN_SUCCESS,
    payload,
  };
};
