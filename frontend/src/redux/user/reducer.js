import { actionTypes } from './actions';

export const initialState = {
  listUser: [],
  limitPage: 5,
  totalPages: 1,
  isLoadingListUser: true,
  isInviteSuccess: false,
  isLeaveSuccess: false,
  isJoinSuccess: false,
  noticeHandleUserSuccess: false,
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        isLoadingListUser: false,
        listUser: data.users,
        totalPages: Math.ceil(data.totalRecords / initialState.limitPage),
      };
    }
    case actionTypes.FETCH_USER_FAILED: {
      return {
        ...state,
        isLoadingListUser: false,
        listUser: [],
      };
    }
    case actionTypes.GET_DATA_USER: {
      return {
        ...state,
      };
    }
    case actionTypes.USER_JOIN_CAMPAIGN_SUCCESS: {
      return {
        ...state,
        isJoinSuccess: action.payload,
      };
    }
    case actionTypes.USER_LEAVE_CAMPAIGN_SUCCESS: {
      return {
        ...state,
        isLeaveSuccess: action.payload,
      };
    }
    case actionTypes.HANDLE_ACCEPT_INVITE_SUCCESS: {
      return {
        ...state,
        isInviteSuccess: action.payload,
      };
    }
    case actionTypes.HANDLE_EDIT_USER_SUCCESS: {
      return {
        ...state,
        noticeHandleUserSuccess: action.payload,
      };
    }
    default:
      return state;
  }
}
