import { actionTypes } from './actions';

export const initialState = {
  listCampaign: [],
  limitPage: 5,
  totalPages: 1,
  isLoadingListCampaign: true,
  notiCreateCampaignSuccess: false,
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
    case actionTypes.USER_JOIN_CAMPAIGN_SUCCESS: {
      const arr = [...state.listCampaign];
      const index = state.listCampaign.findIndex(
        (item) => item.id === action.payload.campaignId,
      );
      arr[index].userId.push(action.payload.userId);
      return {
        ...state,
        listCampaign: arr,
      };
    }
    case actionTypes.USER_LEAVE_CAMPAIGN_SUCCESS: {
      const arr = [...state.listCampaign];
      const index = state.listCampaign.findIndex(
        (item) => item.id === action.payload.campaignId,
      );
      arr[index].userId = arr[index].userId.filter(
        (item) => item !== action.payload.userId,
      );
      return {
        ...state,
        listCampaign: arr,
      };
    }
    case actionTypes.CREATE_CAMPAIGN_SUCCESS: {
      return {
        ...state,
        notiCreateCampaignSuccess: action.payload,
      };
    }
    default:
      return state;
  }
}
