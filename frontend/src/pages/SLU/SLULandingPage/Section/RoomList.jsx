/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */

import React, { useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import RandomRoomButton from './RandomRoomButton';

export default function RoomList(props) {
  const { userID, pageSize, readyStatus, history, socket } = props;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [roomList, setRoomList] = useState([]);
  const [roomListShown, setRoomListShown] = useState([]);

  if (loading) {
    axios
      .get(`${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/chatroom`)
      .then((response) => {
        if (response.data.success) {
          const receivedRoomList = response.data ? response.data.roomFound : [];

          /* eslint-disable-next-line array-callback-return */
          receivedRoomList.map((room) => {
            room.capacity = 0;
            if (room.user1 !== null) room.capacity++;
            if (room.user2 !== null) room.capacity++;
            if (
              !room.done &&
              ((room.client.includes(userID) &&
                (room.user1 === userID || room.user1 === null)) ||
                (room.servant.includes(userID) &&
                  (room.user2 === userID || room.user2 === null)))
            ) {
              room.superPrior = 1;
            } else room.superPrior = 0;
            room.key = room._id;
          });

          receivedRoomList.sort((a, b) => {
            if (a.superPrior < b.superPrior) return 1;
            if (a.superPrior > b.superPrior) return -1;

            if (a.done && !b.done) return 1;
            if (!a.done && b.done) return -1;

            if (a.capacity !== 1 && b.capacity === 1) return 1;
            if (a.capacity === 1 && b.capacity !== 1) return -1;

            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          setRoomList(receivedRoomList.filter((room) => room.done === false));
          setRoomListShown(
            receivedRoomList
              .filter((room) => room.done === false)
              .slice(page * pageSize, (page + 1) * pageSize),
          );
        }
      })
      .catch((error) => {
        alert(
          "Something's wrong with the server. We are very sorry for the inconvenience!",
          error,
        );
      });
    setLoading(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setRoomListShown(
      roomList.slice(newPage * pageSize, (newPage + 1) * pageSize),
    );
  };

  if (loading) {
    return (
      <div
        style={{
          height: '100px',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (roomListShown.length === 0) {
    return (
      <div style={{ padding: '10px' }}>
        Không có phòng bạn có thể vào, bạn hãy lựa chọn `Sẵn sàng` và vào hàng
        chờ, chờ người khác tham gia cùng.
      </div>
    );
  }

  return (
    <>
      {roomListShown.length === 0 ? (
        ''
      ) : readyStatus ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ marginBottom: '10px', padding: '1px' }}
        >
          <Grid item>
            <Button disabled>Chọn phòng ngẫu nhiên</Button>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ marginBottom: '10px', padding: '1px' }}
        >
          <Grid item>
            <RandomRoomButton
              userID={userID}
              history={history}
              socket={socket}
            />
          </Grid>
        </Grid>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          width: '100%',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên phòng</TableCell>
                <TableCell align="center">Người tham gia</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomListShown.map((room, index) => (
                <TableRow
                  /* eslint-disable-next-line */
                  key={`room_${index}`}
                  style={{
                    background: room.superPrior === 1 ? '#F3F0AD' : 'white',
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      fontWeight: room.superPrior === 1 ? 'bold' : 'normal',
                    }}
                  >
                    {room.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: room.superPrior === 1 ? 'bold' : 'normal',
                    }}
                  >
                    {room.capacity}/2
                  </TableCell>
                  <TableCell>
                    {userID === undefined ||
                    userID === null ||
                    userID === '' ? (
                      // change to login page
                      <Link to="/login">Tham gia</Link>
                    ) : readyStatus ? (
                      <div style={{ color: 'grey' }}>Tham gia</div>
                    ) : (
                      <Link to={`/slu/room/${room._id}`}>Tham gia</Link>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          page={page}
          count={roomList.length}
          rowsPerPage={parseInt(pageSize, 10)}
          onChangePage={handleChangePage}
        />
      </div>
    </>
  );
}
