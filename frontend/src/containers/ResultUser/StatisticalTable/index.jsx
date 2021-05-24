import React from 'react';

import {
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@material-ui/core';

// import { useTranslation } from 'react-i18next';
import StatisticalTableStyle from './statisticalTable.style';

function createData(name, calories, fat, carbs, protein, aaaa, bbbb, cccc) {
  return { name, calories, fat, carbs, protein, aaaa, bbbb, cccc };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 20, 20, 30),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 40, 30, 8),
  createData('Eclair', 262, 16.0, 24, 6.0, 2, 6, 90),
];
const titleTable = [
  'Kịch bản',
  'Tổng số phiên chat',
  'Tổng số câu chat',
  'Tổng số câu chat hợp lệ bot đoán đúng',
  'Tổng số câu chat hợp lệ bot đoán sai',
  'Số hội thoại hợp lệ',
  'Số lượt trả lời hợp lệ',
  'Số lượt bot trả lời được bạn xác nhận',
];
export default function StatisticalTable() {
  // const { t } = useTranslation();
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <StatisticalTableStyle>
      <div className="container">
        <FormControl component="fieldset">
          <FormLabel component="legend" className="title_filter">
            Lọc các câu theo trạng thái
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="total" />}
              label="Tất cả"
            />
            <FormControlLabel
              control={<Checkbox name="bot_guessed_correctly" />}
              label="Số câu chat hợp lệ bot đoán đúng"
            />
            <FormControlLabel
              control={<Checkbox name="bot_guessed_wrong" />}
              label="Số câu chat hợp lệ bot đoán sai"
            />
            <FormControlLabel
              control={<Checkbox name="number_confirmed" />}
              label="Số câu bot trả lời được bạn xác nhận"
            />
          </FormGroup>
        </FormControl>
        <div className="table-container">
          <Typography
            gutterBottom
            variant="h3"
            component="h3"
            className="title-table-result-user"
          >
            Bảng thống kê kết quả
          </Typography>
          <TableContainer>
            <Table aria-label="customized table">
              <TableHead className="table-header">
                <TableRow>
                  {titleTable.map((item) => (
                    <TableCell key={item}>{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.name}
                    className={index % 2 === 0 ? 'table-row' : 'table-row-sole'}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{row.aaaa}</TableCell>
                    <TableCell align="right">{row.bbbb}</TableCell>
                    <TableCell align="right">{row.cccc}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="table-pagination">
                  <TableCell colSpan={8}>
                    <TablePagination
                      component="div"
                      count={100}
                      page={page}
                      onChangePage={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} của  ${count}`
                      }
                      labelRowsPerPage="Số dữ liệu mỗi trang"
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </StatisticalTableStyle>
  );
}
