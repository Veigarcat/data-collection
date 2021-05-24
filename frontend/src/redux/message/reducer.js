import { actionTypes } from './actions';

export const initialState = {
  arrMessage: [],
  isLoading: false,
};

export default function messageReducer(state = initialState, action) {
  const arr = [...state.arrMessage];
  switch (action.type) {
    case actionTypes.GET_CHANGE_LIST_MSG: {
      return {
        ...state,
        arrMessage: [],
      };
    }

    case actionTypes.GET_LIST_MESSAGE: {
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        arrMessage: [],
        isLoading: true,
      };
    }

    case actionTypes.GET_LIST_MESSAGE_SUCCESS: {
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        arrMessage: action.payload,
        isLoading: false,
      };
    }

    case actionTypes.GET_LIST_MESSAGE_FAILED: {
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        isLoading: false,
      };
    }

    case actionTypes.ADD_MESSAGE_SUCCESS: {
      // eslint-disable-next-line no-case-declarations
      const msgArr = [
        ...arr,
        { ...action.payload.payload, ...action.payload.result },
      ];
      return {
        ...state,
        arrMessage: msgArr,
      };
    }

    case actionTypes.UPDATE_NLU_MESSAGE_SUCCESS: {
      const index = state.arrMessage.findIndex(
        (item) => item.messageId === action.payload.messageId,
      );
      arr[index].nlu = action.payload.nlu;

      return {
        ...state,
        arrMessage: arr,
      };
    }

    case actionTypes.HANDLE_CONFIRM_MESSAGE_SUCCESS: {
      const index = state.arrMessage.findIndex(
        (item) => item.messageId === action.payload.messageId,
      );
      arr[index].isConfirm = action.payload.isConfirm;
      return {
        ...state,
        arrMessage: arr,
      };
    }

    case actionTypes.HANDLE_COMMENT_MESSAGE_SUCCESS: {
      const index = state.arrMessage.findIndex(
        (item) => item.messageId === action.payload.messageId,
      );
      arr[index].textComment = action.payload.textComment;
      arr[index].isShowComment = false;
      return {
        ...state,
        arrMessage: arr,
      };
    }

    case actionTypes.HANDLE_IS_SHOW_COMMENT: {
      const index = state.arrMessage.findIndex(
        (item) => item.messageId === action.payload.messageId,
      );
      arr[index].isShowComment = !arr[index].isShowComment;
      return {
        ...state,
        arrMessage: arr,
      };
    }

    default:
      return state;
  }
}
