import { actionTypes } from './actions';

export const initialState = {
  arrMessage: [
    {
      id: '604f121eea413a953633ea9e',
      app: '9a294e0c-1758-4307-a3c4-4ef36b71173d',
      content: {
        text: 'cha hieu gi hehe',
      },
      created_at: '2021-03-15T07:51:58.167Z',
      platform: 'facebook',
      receiver: {
        user: '5fc8b29a17d56b31cc17d7a6',
      },
      sender: {
        bot: 'ea9ed681-9292-403d-b2a2-d57135d211f3',
      },
      session_id: '25edb33a-dcb4-4821-ae06-82c25541a5d6',
      status: 'SENT',
      updated_at: '2021-03-15T07:52:01.627Z',
    },
    {
      id: '604f121dea413afe9533ea9c',
      app: '9a294e0c-1758-4307-a3c4-4ef36b71173d',
      content: {
        text: 'Hi',
      },
      created_at: '2021-03-15T07:51:57.912Z',
      is_first: true,
      platform: 'facebook',
      sender: {
        user: '5fc8b29a17d56b31cc17d7a6',
      },
      session_id: '25edb33a-dcb4-4821-ae06-82c25541a5d6',
      status: 'SEEN',
      updated_at: '2021-03-15T07:52:00.435Z',
    },
    {
      id: '6040b0c3fd8e6b6b07af1234',
      app: '9a294e0c-1758-4307-a3c4-4ef36b71173d',
      content: {
        text: 'cha hieu gi hehe',
      },
      created_at: '2021-03-04T10:04:51.495Z',
      platform: 'facebook',
      receiver: {
        user: '5fc8b29a17d56b31cc17d7a6',
      },
      sender: {
        bot: 'ea9ed681-9292-403d-b2a2-d57135d211f3',
      },
      session_id: '4fb5b466-faeb-442c-be66-e12a3e7dfbd2',
      status: 'SENT',
      updated_at: '2021-03-04T10:04:54.359Z',
    },
    {
      id: '5fe9a8797518a3d30e43a5c8',
      app: '9a294e0c-1758-4307-a3c4-4ef36b71173d',
      content: {
        text: 'hey',
      },
      created_at: '2020-12-28T09:42:17.130Z',
      platform: 'facebook',
      sender: {
        user: '5fc8b29a17d56b31cc17d7a6',
      },
      session_id: '07150284-e0ed-4e94-9590-69332129edfe',
      status: 'SEEN',
      updated_at: '2020-12-28T09:42:18.957Z',
    },
    {
      id: '5fe9a8507518a344e343a5c7',
      app: '9a294e0c-1758-4307-a3c4-4ef36b71173d',
      content: {
        text: 'hi',
      },
      created_at: '2020-12-28T09:41:36.235Z',
      platform: 'facebook',
      sender: {
        user: '5fc8b29a17d56b31cc17d7a6',
      },
      session_id: '07150284-e0ed-4e94-9590-69332129edfe',
      status: 'SENT',
      updated_at: '2020-12-28T09:41:36.235Z',
    },
  ],
};

export default function messageReducer(state = initialState, action) {
  const arr = [...state.arrMessage];
  switch (action.type) {
    case actionTypes.ADD_MESSAGE_SUCCESS:
      arr.push({ ...action.payload.payload, ...action.payload.result });
      return {
        ...state,
        arrMessage: arr,
      };
    case actionTypes.HANDLE_CONFIRM_MESSAGE_SUCCESS: {
      const index = state.arrMessage.findIndex(
        (item) => item.id === action.payload.id,
      );
      arr[index].isConfirm = action.payload.isConfirm;
      return {
        ...state,
        arrMessage: arr,
      };
    }
    case actionTypes.HANDLE_COMMENT_MESSAGE_SUCCESS: {
      const index = state.arrMessage.findIndex(
        (item) => item.id === action.payload.id,
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
        (item) => item.id === action.payload.id,
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
