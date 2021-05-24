/* eslint-disable no-console */
import { actionTypes } from './actions';

export const initialState = {
  listUsecase: [],
  noticeUsecaseSuccess: false,
  message: '',
};

export default function usecaseReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.HANDLE_USECASE_SUCCESS: {
      return {
        ...state,
        noticeUsecaseSuccess: action.payload,
      };
    }
    case actionTypes.ADD_USECASE_TO_LIST: {
      const arr = [...state.listUsecase, action.payload];
      return {
        ...state,
        listUsecase: arr,
      };
    }
    case actionTypes.DELETE_USECASE_TO_LIST: {
      const arr = state.listUsecase.filter(
        (item) => item.id !== action.payload.id,
      );
      return {
        ...state,
        listUsecase: arr,
      };
    }
    case actionTypes.EDIT_USECASE_TO_LIST: {
      console.log(action.payload);
      const index = state.listUsecase.findIndex(
        (item) => item.id === action.payload.usecaseId,
      );
      let arr;
      if (index >= 0) {
        arr = [
          ...state.listUsecase.slice(0, index),
          { ...state.listUsecase[index], ...action.payload.data },
          ...state.listUsecase.slice(index + 1),
        ];
      }
      return {
        ...state,
        listUsecase: arr,
      };
    }
    case actionTypes.ADD_MESSAGE: {
      return {
        ...state,
        message: action.payload,
      };
    }
    default:
      return state;
  }
}
