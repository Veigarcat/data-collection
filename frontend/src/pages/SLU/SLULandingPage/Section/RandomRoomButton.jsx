/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: '1px solid #dedede',
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function RandomRoomButton(props) {
  const { userID, history } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const classes = useStyles();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onClickRandom = () => {
    axios
      .get(
        `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/chatroom/random/${userID}`,
      )
      .then((response) => {
        if (response.data.success) {
          const { roomFound } = response.data;
          if (roomFound === null) {
            // setAlert(2)
            showModal();
          } else {
            history.push(`/slu/room/${roomFound._id}`);
          }
        }
      })
      .catch((error) => {
        alert(
          "Something's wrong with the server. We are very sorry for the inconvenience!",
          error,
        );
      });
  };

  return (
    <>
      <Modal open={isModalVisible} onClose={handleCancel}>
        <div className={classes.paper}>
          <h2>Hết phòng!</h2>
          <Divider />
          <p>
            Hiện tại đang không còn phòng nào trống! Mong bạn hãy vào hàng chờ
            bằng ấn nút <b>Sẵn sàng</b> và chờ một người khác để tạo phòng cùng.
            Xin cảm ơn.
          </p>
          <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
          <div style={{ float: 'right' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
            >
              Đóng
            </Button>
            <Button
              variant="contained"
              style={{
                marginLeft: '10px',
                backgroundColor: '#90caf9',
                color: '#585D5E',
              }}
              onClick={handleCancel}
            >
              Đã hiểu
            </Button>
          </div>
        </div>
      </Modal>

      {userID === undefined || userID === null || userID === '' ? (
        // TODO: change to login page
        <Link to="/login">
          <Button>Chọn phòng ngẫu nhiên</Button>
        </Link>
      ) : (
        <Button style={{ border: '1px solid #dedede' }} onClick={onClickRandom}>
          Chọn phòng ngẫu nhiên
        </Button>
      )}
    </>
  );
}
