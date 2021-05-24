/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';

import { Button, Modal, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './CountdownTimer/CountdownTimer.css';
import CountdownTimer from './CountdownTimer/CountdownTimer';

const useStyles = makeStyles((theme) => ({
  paper: {
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: '1px solid #dedede',
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ConfirmModal(props) {
  /* eslint-disable-next-line prefer-const */
  let { socket } = props;
  const { promptStatus, visible, promptDuration } = props;
  const [buttonState, setButtonState] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (socket) {
      socket.on('wait for other prompt', () => {
        props.setPromptStatus(1);
        props.notificationAudio.pause();
        /* eslint-disable no-param-reassign */
        props.notificationAudio.currentTime = 0;
      });
    }
  });

  const handleOk = () => {
    if (!buttonState) {
      setButtonState(true);
      props.handleOk();
      setButtonState(false);
    }
  };

  return (
    <>
      {promptStatus === 0 ? (
        <Modal disableBackdropClick={true} open={props ? visible : false}>
          <div className={classes.paper}>
            <h2>Tìm thấy phòng!</h2>
            <Divider />
            <p style={{ marginBottom: '10px' }}>Đã tìm được người phù hợp!</p>
            <CountdownTimer
              handleTimeout={props.handleCancel}
              key={visible}
              isPlaying={visible}
              duration={promptDuration}
            />
            <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
            <div style={{ float: 'right' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={props.handleCancel}
              >
                Từ chối
              </Button>
              {buttonState ? (
                <Button
                  variant="contained"
                  style={{
                    marginLeft: '10px',
                    backgroundColor: '#90caf9',
                    color: '#585D5E',
                  }}
                  disabled
                >
                  Bắt đầu
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{
                    marginLeft: '10px',
                    backgroundColor: '#90caf9',
                    color: '#585D5E',
                  }}
                  onClick={handleOk}
                >
                  Bắt đầu
                </Button>
              )}
            </div>
          </div>
        </Modal>
      ) : (
        <Modal open={visible} disableBackdropClick={true}>
          <div className={classes.paper}>
            <h2>Tìm thấy phòng!</h2>
            <p>Đang chờ người còn lại...</p>
          </div>
        </Modal>
      )}
    </>
  );
}
