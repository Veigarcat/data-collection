export const convertStatus = (status) => {
  switch (status) {
    case 'waiting':
      return 'Đang chờ';
    case 'running':
      return 'Đang diễn ra';
    case 'pause':
      return 'Dừng thu thập';
    case 'stop':
      return 'Dừng thu thập';
    default:
      return 'Chưa nhập đủ thông tin';
  }
};
