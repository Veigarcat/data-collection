const STATUS_RESULT = {
  ASSIGNMENT: 'ASSIGNMENT',
  PROCESSING: 'PROCESSING',
  FINISH: 'FINISH',
};
const STATUS_USER_CAMPAIGN = {
  NOMINATION: 'NOMINATION',
  JOIN: 'JOIN',
};
const CAMPAIGN_TYPE = {
  USECASE: 'USECASE',
  INTENT: 'INTENT',
};
const SSO_EVENT = {
  CREATE_USER: 'CREATE_USER',
  SET_TOKEN: 'SET_TOKEN',
  LOGOUT: 'LOGOUT',
};
// eslint-disable-next-line import/prefer-default-export
const LIST_INTENT = [
  { id: '607865546014fc68cf7406c9', display_name: 'Bắt đầu', name: 'bat_dau' },
  { id: '607865546014fcfc5974054b', display_name: 'Đặt xe', name: 'dat_xe' },
  { id: '607863316014fc08607403a8', display_name: 'Đúng', name: 'dung' },
  { id: '607863316014fcdd777403d9', display_name: 'Sai', name: 'sai' },
  {
    id: '607863316014fcaf86740415',
    display_name: 'Next Loop Intent',
    name: 'next_loop_intent',
  },
  { id: '607863316014fc8a6274040b', display_name: 'Im lặng', name: 'im_lang' },
  {
    id: '607865546014fc765f7406b3',
    display_name: 'Hỏi đưa đón tại nhà',
    name: 'hoi_dua_don_tai_nha',
  },
  {
    id: '607863316014fcf1797404d1',
    display_name: 'Hỏi có phải nhà xe không',
    name: 'hoi_co_phai_nha_xe_khong',
  },
  {
    id: '607863316014fc1d26740395',
    display_name: 'Gặp tổng đài viên',
    name: 'gap_tong_dai_vien',
  },
  {
    id: '607865546014fc049c740716',
    display_name: 'Cung cấp điểm đón tại nhà',
    name: 'Cung_cap_diem_don_tai_nha',
  },
  {
    id: '607863316014fc0cad740476',
    display_name: 'Cung cấp thời gian',
    name: 'cung_cap_thoi_gian',
  },
  {
    id: '607863316014fcaff2740460',
    display_name: 'Cung cấp số điện thoại',
    name: 'cung_cap_so_dien_thoai',
  },
  {
    id: '607863316014fcf29a74043f',
    display_name: 'Cung cấp số lượng người',
    name: 'cung_cap_so_luong_nguoi',
  },
  {
    id: '607865546014fc4192740753',
    display_name: 'Cung cấp ngày',
    name: 'cung_cap_ngay',
  },
  {
    id: '607863316014fc05f1740408',
    display_name: 'Bắt đầu',
    name: 'bat_dau',
  },
];

const LIST_MESSAGE = [
  {
    id: '63ae13c0-0928-4cf1-90fd-25b87155d1d2',
    app: 'bbb0c563-8a65-4c87-a99b-7d88516750f2',
    content: {
      text: 'Hi',
    },
    created_at: '2021-03-15T07:51:57.912Z',
    platform: 'facebook',
    sender: {
      user: '3035e617-89e2-4fca-80e1-00bb121eb72c',
    },
    session_id: '25edb33a-dcb4-4821-ae06-82c25541a5d6',
    status: 'SENT',
    is_first: false,
    confidence: 1,
    updated_at: '2021-03-15T07:52:01.627Z',
  },
  {
    id: '609271e200b9030a0ae4c9b3',
    app: 'bbb0c563-8a65-4c87-a99b-7d88516750f2',
    content: {
      text:
        'Chào bạn, em ngồi chờ đây từ chiều tới giờ. Anh chị cần em hỗ trợ vấn đề gì về dự đoán, thống kê kết quả xổ số 3 miền... không ạ?',
    },
    created_at: '2021-03-15T07:51:57.912Z',
    is_first: true,
    confidence: 1,
    platform: 'facebook',
    receiver: {
      user: '3035e617-89e2-4fca-80e1-00bb121eb72c',
    },
    sender: {
      botId: '3035e617-89edddddd1eb72c',
    },
    session_id: '25edb33a-dcb4-4821-ae06-82c25541a5d6',
    status: 'SENT',
    updated_at: '2021-03-15T07:52:01.627Z',
  },

  {
    id: '609271e400b903040de4c9b4',
    app: 'bbb0c563-8a65-4c87-a99b-7d88516750f2',
    content: {
      text: 'Lựa chọn 1. Kết quả xổ số Lựa chọn ',
    },
    created_at: '2021-03-04T10:04:51.495Z',
    platform: 'facebook',
    is_first: false,
    confidence: 1,
    receiver: {
      user: '3035e617-89e2-4fca-80e1-00bb121eb72c',
    },
    sender: {
      botId: '3035e617-89edddddd1eb72c',
    },
    session_id: '4fb5b466-faeb-442c-be66-e12a3e7dfbd2',
    status: 'SENT',
    updated_at: '2021-03-04T10:04:54.359Z',
  },

  {
    id: '15a92735-fa9a-4174-8f4b-aa6ede744a1f',
    app: 'bbb0c563-8a65-4c87-a99b-7d88516750f2',
    content: {
      text: 'Lựa chọn 1',
    },
    created_at: '2021-03-15T07:51:57.912Z',
    platform: 'facebook',
    sender: {
      user: '3035e617-89e2-4fca-80e1-00bb121eb72c',
    },
    session_id: '25edb33a-dcb4-4821-ae06-82c25541a5d6',
    status: 'SENT',
    is_first: false,
    confidence: 1,
    updated_at: '2021-03-15T07:52:01.627Z',
  },
  {
    id: '6092bf08772364402a63d8c6',
    app: 'bbb0c563-8a65-4c87-a99b-7d88516750f2',
    content: {
      text: 'Buồn quá trời ;(',
    },
    created_at: '2021-03-04T10:04:51.495Z',
    platform: 'facebook',
    is_first: false,
    confidence: 1,
    receiver: {
      user: '3035e617-89e2-4fca-80e1-00bb121eb72c',
    },
    sender: {
      botId: '3035e617-89edddddd1eb72c',
    },
    session_id: '4fb5b466-faeb-442c-be66-e12a3e7dfbd2',
    status: 'SENT',
    updated_at: '2021-03-04T10:04:54.359Z',
  },
  // chien dich khac
  {
    id: '4bb28298-3778-4a59-a903-b75711793133',
    app: 'aaaaaaaaaa',
    content: {
      text: 'Có phải nhà xe Hải Nam không ạ?',
    },
    created_at: '2021-03-15T07:51:57.912Z',
    platform: 'facebook',
    sender: {
      user: '3035e617-89e2-4fca-80e1-00bb121eb72c',
    },
    session_id: '25edb33a-dcb4-4821-ae06-82c25541a5d6',
    status: 'SENT',
    is_first: true,
    confidence: 1,
    updated_at: '2021-03-15T07:52:01.627Z',
  },
  {
    id: '6092d15177236470df63d8ce',
    app: 'aaaaaaaaaa',
    content: {
      text: 'Chúng tôi là nhà xe Hải Nam, bạn muốn đặt xe đi đâu ạ?',
    },
    created_at: '2021-03-04T10:04:51.495Z',
    platform: 'facebook',
    is_first: false,
    confidence: 1,
    receiver: {
      user: '3035e617-89e2-4fca-80e1-00bb121eb72c',
    },
    sender: {
      botId: '3035e617-89edddddd1eb72c',
    },
    session_id: '4fb5b466-faeb-442c-be66-e12a3e7dfbd2',
    status: 'SENT',
    updated_at: '2021-03-04T10:04:54.359Z',
  },
  {
    id: '6092d1537723643ef863d8cf',
    app: 'aaaaaaaaaa',
    content: {
      text: 'Xin chào bạn',
    },
    created_at: '2021-03-04T10:04:51.495Z',
    platform: 'facebook',
    is_first: false,
    confidence: 1,
    receiver: {
      user: '3035e617-89e2-4fca-80e1-00bb121eb72c',
    },
    sender: {
      botId: '3035e617-89edddddd1eb72c',
    },
    session_id: '4fb5b466-faeb-442c-be66-e12a3e7dfbd2',
    status: 'SENT',
    updated_at: '2021-03-04T10:04:54.359Z',
  },
];

module.exports = {
  LIST_INTENT,
  STATUS_RESULT,
  STATUS_USER_CAMPAIGN,
  CAMPAIGN_TYPE,
  SSO_EVENT,
  LIST_MESSAGE,
};
