import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// import { getAllRooms } from '../../../../_actions/chatroom_actions';
// import ErrorInternalSystem from '../../Error/ErrorInternalSystem'
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
} from '@material-ui/core';

function RoomList(props) {

  const page = props.page;
  const pageSize = props ? props.pageSize : 4;

  const roomList = props.roomList;
  const roomListShown = props.roomListShow;
  // const [roomList, setRoomList] = useState([]);
  // const dispatch = useDispatch();
  // const ROOM_SERVER = `${process.env.REACT_APP_ASR_APP}/api/chatroom`;
  // useEffect(() => {
  //   axios.get(`${ROOM_SERVER}`).then((response) => {
  //     // if (!user) {
  //       console.log("room_found", response.data.roomFound);
  //       response.data.roomFound.map((room) => {
  //         return (room.key = room._id);
  //       });
  //       response.data.roomFound.sort((a, b) => {
  //         if (a.name < b.name) return -1;
  //         if (a.name > b.name) return 1;
  //         return 0;
  //       });
  //       if (response.data.roomFound.user1 === user._id || response.data.roomFound.user2 === user._id) {
  //
  //         setRoomList(response.data.roomFound);
  //         setRoomListShown(
  //           response.data.roomFound.slice(page * pageSize, (page + 1) * pageSize),
  //         );
  //       }
  //     // }
  //     // }else{
  //     //   setRoomList([])
  //     //   setRoomListShown([])
  //     // }
  //   });
  // }, [setRoomListShown, setRoomList]);

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
    props.setRoomListShown(
      roomList.slice(newPage * pageSize, (newPage + 1) * pageSize),
    );
  };

  let lastIndex = 0;
  const updateIndex = () => {
    const index = roomList[lastIndex]
      ? `${roomList[lastIndex].content_type}/${roomList[lastIndex]._id}`
      : '';
    lastIndex++;
    return index;
  };

  if (roomList == null) {
    return <>{/* <ErrorInternalSystem/> */}</>;
  }
  return (
    <>
      {/* <div style={{position: "absolute", bottom: "10px", width: "100%"}}> */}
      <TableContainer>
        <Table>
          {/*{console.log("user", roomList)}*/}
          <TableHead>
            <TableRow>
              <TableCell align="center">Tên phòng</TableCell>
              <TableCell align="center">Kịch bản</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomListShown.map((room, index) => (
              <TableRow key={`room_${index}`} style={{background: 'white'}}>
                <TableCell component="th" style={{fontWeight: 'normal'}}
                           align="center">
                  {room.name}
                </TableCell>
                <TableCell component="th" style={{fontWeight: 'normal'}}
                           align="center">
                  {room.task}
                </TableCell>
                {/*<TableCell align="center"*/}
                {/*          style={{fontWeight: room.superPrior === 1 ? "bold" : "normal"}}>{room.capacity}/2</TableCell>*/}
                <TableCell align="center">
                  <Link to={`asr/chatroom/0/${room._id}`}>Vào phòng</Link>
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
      {/* </div> */}
    </>
  );
}

export default RoomList;
