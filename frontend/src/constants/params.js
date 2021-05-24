export const LIST_CRITERIA = [
  {
    name: 'Câu chat hợp lệ có trong tập mẫu',
    id: '57f55962-8bec-11eb-8dcd-0242ac130003',
  },
  {
    name: 'Hội thoại hợp lệ có trong tập mẫu',
    id: '96966bd8-8bec-11eb-8dcd-0242ac130003',
  },
  {
    name: 'Lượt trả lời hợp lệ',
    id: '12121bd8-8bec-11eb-8dcd-0242ac130003',
  },
  {
    name: 'Lượt bot trả lời đúng được người dùng xác nhận',
    id: '88885bd8-8bec-11eb-8dcd-0242ac130003',
  },
];

export const LIST_INTENT = [
  { id: '607863316014fc00397402a0', display_name: 'Đặt xe', name: 'dat_xe' },
  { id: '607863316014fc08607403a8', display_name: 'Đúng', name: 'dung' },
  { id: '607863316014fcdd777403d9', display_name: 'Sai', name: 'sai' },
  {
    id: '607863316014fcaf86740415',
    display_name: 'Next Loop Intent',
    name: 'next_loop_intent',
  },
  { id: '607863316014fc8a6274040b', display_name: 'Im lặng', name: 'im_lang' },
  {
    id: '601b78667c421476d6734fd8',
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
    id: '607863316014fc5feb740418',
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
    id: '607863316014fcf18e7404b3',
    display_name: 'Cung cấp ngày',
    name: 'cung_cap_ngay',
  },
  {
    id: '607863316014fc05f1740408',
    display_name: 'Bắt đầu',
    name: 'bat_dau',
  },
];

export const LIST_ROLE_USER_SPECIFIED = [
  {
    role: 'CHAT',
    name: 'Người chat',
  },
  {
    role: 'REVIEWER',
    name: 'Người reviewer',
  },
];
export const STATUS_RESULT = {
  ASSIGNMENT: 'ASSIGNMENT',
  PROCESSING: 'PROCESSING',
  FINISH: 'FINISH',
};
export const STATUS_USER_CAMPAIGN = {
  NOMINATION: 'NOMINATION',
  JOIN: 'JOIN',
};
export const CAMPAIGN_TYPE = {
  USECASE: 'USECASE',
  INTENT: 'INTENT',
};
export const STATUS_CALL_API = {
  STATUS_OKE: 1,
  STATUS_NOT_FINISH: 7001,
  USECASE_FINISH: 7002,
};

export const PAGE_CAMPAIGN_TYPE = {
  TOTAL: 'total',
  MY_CAMPAIGN: 'myCampaign',
  OTHER_CAMPAIGN: 'otherCampaign',
};
export const USER_STATUS = {
  TOTAL: 'total',
  ACTIVE: 'active',
  DEACTIVATE: 'deactivate',
};
