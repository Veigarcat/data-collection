export const actionTypes = {
  API_GET_DATA_CAMPAIGN: 'API_GET_DATA_CAMPAIGN',
  GET_DATA_CAMPAIGN: 'GET_DATA_CAMPAIGN',

  FETCH_CAMPAIGN: 'FETCH_CAMPAIGN',
  FETCH_CAMPAIGN_SUCCESS: 'FETCH_CAMPAIGN_SUCCESS',
  FETCH_CAMPAIGN_FAILED: 'FETCH_CAMPAIGN_FAILED',

  FILTER_SEARCH: 'FILTER_SEARCH',

  CREATE_CAMPAIGN: 'CREATE_CAMPAIGN',
  HANDLE_CAMPAIGN_SUCCESS: 'HANDLE_CAMPAIGN_SUCCESS',

  EDIT_CAMPAIGN: 'EDIT_CAMPAIGN',
  DELETE_CAMPAIGN: 'DELETE_CAMPAIGN',
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

export const fetchHandleCampaignSuccess = (payload) => {
  return {
    type: actionTypes.HANDLE_CAMPAIGN_SUCCESS,
    payload,
  };
};

export const fetchEditCampaign = (data) => {
  return {
    type: actionTypes.EDIT_CAMPAIGN,
    payload: data,
  };
};
export const fetchDeleteCampaign = (payload) => {
  return {
    type: actionTypes.DELETE_CAMPAIGN,
    payload,
  };
};
