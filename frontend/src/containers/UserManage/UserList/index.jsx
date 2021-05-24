import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import UserListStyle from './userList.style';

export default function UserList({ listUser, isLoadingListUser }) {
  const { t } = useTranslation();
  const tableTitle = [
    'STT',
    'userName',
    'email',
    'role',
    // 'numberParticipantCampaign',
    'status',
  ];
  return (
    <UserListStyle>
      <>
        <Table aria-label="customized table" className="table">
          <TableHead>
            <TableRow>
              {tableTitle &&
                tableTitle.map((item) => (
                  <TableCell
                    key={item}
                    align="left"
                    variant="head"
                    className="headerCell"
                  >
                    <div className="cellContent">{t(item)}</div>
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listUser &&
              listUser.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell align="left" className="cellBody">
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    className="cellBody"
                  >
                    {user.name}
                  </TableCell>

                  <TableCell align="left" className="cellBody">
                    {user.email}
                  </TableCell>
                  <TableCell align="left" className="cellBody">
                    {user.role ? t(user.role) : t('noData')}
                  </TableCell>
                  {/* <TableCell align="left" className="cellBody">
                    Soos chiesn dich tham gai
                  </TableCell> */}
                  <TableCell align="left" className="cellBody">
                    {user.status ? t(user.status) : t('noData')}
                  </TableCell>
                </TableRow>
              ))}
            {listUser.length === 0 && !listUser && (
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  {t('noData')}
                </TableCell>
              </TableRow>
            )}
            {isLoadingListUser && (
              <div className="loader-view">
                <CircularProgress />
              </div>
            )}
          </TableBody>
        </Table>
      </>
    </UserListStyle>
  );
}
