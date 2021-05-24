/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

export default function RejectAudioButton(props) {
  const [buttonState, setButtonState] = useState(false);
  const [buttonPhase, setButtonPhase] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverOpenStatus, setPopoverOpenStatus] = useState(false);

  const { userRole, roomID, socket, disabled } = props;

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpenStatus(true);
  };

  const closePopover = () => {
    setPopoverOpenStatus(false);
    // setAnchorEl(null);
  };

  const onReject = async () => {
    await setButtonState(true);
    await setButtonPhase(1);
    axios
      .put(
        `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/chatroom/${roomID}/${userRole}`,
      )
      .then(async (response) => {
        setButtonPhase(0);
        setButtonState(false);
        if (response.data.success === 1) {
          if (socket) {
            socket.emit('remove audio', {
              roomID,
            });
          }
        } else {
          alert(`${response.data.message}. Code: ${response.data.success}`);
        }
      });
  };

  const popoverPrompt = (
    <div style={{ padding: '10px' }}>
      <p>
        Bạn sẽ xóa audio mà bên kia vừa gửi tới cho bạn, bạn chắc chắn là sẽ xóa
        không?
      </p>
      <div style={{ float: 'right', padding: '0px 10px 10px 10px' }}>
        <Button variant="contained" color="secondary" onClick={closePopover}>
          Không xóa
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
            Xóa
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{
              marginLeft: '10px',
              backgroundColor: '#90caf9',
              color: '#585D5E',
            }}
            onClick={onReject}
          >
            Xóa
          </Button>
        )}
      </div>
    </div>
  );

  const insertButton = disabled ? (
    <button className="reject-buttons" type="button" disabled>
      Reset audio
    </button>
  ) : buttonState ? (
    <button
      type="button"
      className="reject-buttons"
      style={{ cursor: 'not-allowed' }}
      disabled
    >
      {buttonPhase === 0
        ? 'Reset audio'
        : buttonPhase === 1
        ? 'Đang xóa audio...'
        : '????HOWWWW???'}
    </button>
  ) : (
    <>
      <button className="reject-buttons" type="button" onClick={openPopover}>
        {buttonPhase === 0
          ? 'Reset audio'
          : buttonPhase === 1
          ? 'Đang xóa audio...'
          : '????HOWWWW???'}
      </button>
      <Popover
        open={popoverOpenStatus}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {popoverPrompt}
      </Popover>
    </>
  );

  return <>{insertButton}</>;
}
