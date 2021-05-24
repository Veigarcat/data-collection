import { actionTypes } from './actions';

export const initialState = {
  listCampaign: [],
  limitPage: 8,
  totalPages: 1,
  isLoadingListCampaign: true,
  notiHandleCampaignSuccess: false,
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CAMPAIGN: {
      return {
        ...state,
        isLoadingListCampaign: true,
        listCampaign: [],
      };
    }
    case actionTypes.FETCH_CAMPAIGN_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        isLoadingListCampaign: false,
        listCampaign: data.campaigns,
        totalPages: Math.ceil(data.totalRecords / initialState.limitPage),
      };
    }
    case actionTypes.FETCH_CAMPAIGN_FAILED: {
      return {
        ...state,
        isLoadingListCampaign: false,
        listCampaign: [],
      };
    }
    case actionTypes.GET_DATA_CAMPAIGN: {
      return {
        ...state,
      };
    }

    case actionTypes.HANDLE_CAMPAIGN_SUCCESS: {
      return {
        ...state,
        notiHandleCampaignSuccess: action.payload,
      };
    }

    default:
      return state;
  }
}
