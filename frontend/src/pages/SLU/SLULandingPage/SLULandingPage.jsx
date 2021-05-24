/* eslint-disable no-underscore-dangle */

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './SLULandingPage.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import RoomList from './Section/RoomList';
import ReadyButton from './Section/ReadyButton';
import ConfirmModal from './Section/ConfirmModal';
import WarningTrack from '../sound/league_queue-pop.mp3';
import { toastMsgError } from '../../../commons/Toastify';

export default function SLULandingPage(props) {
  // eslint-disable-next-line
  let socket = props ? props.socket : null;
  const { history } = props;
  // const { search } = window.location;
  // const params = new URLSearchParams(search);
  // const accessToken = params.get('accessToken');
  // if (accessToken !== null && accessToken !== undefined && accessToken !== '') {
  //   document.cookie = `accessToken=${accessToken}`;
  // }

  const [user, setUser] = useState({});

  let cookieAccessToken;
  document.cookie.split(';').map((info) => {
    // remove space
    const processedInfo = info.replace(' ', '');
    if (processedInfo.slice(0, 'accessToken='.length) === 'accessToken=') {
      cookieAccessToken = processedInfo.substring('accessToken='.length);
      return document.cookie.substring('accessToken='.length);
    }
    return null;
  });

  const notificationAudio = new Audio(WarningTrack);

  const [matchFound, setMatchFound] = useState(false);
  const [popoverOpenStatus, setPopoverOpenStatus] = useState(false);
  const [readyStatus, setReadyStatus] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [promptStatus, setPromptStatus] = useState(0);
  const [promptDuration, setPromptDuration] = useState(10);
  const [timer, setTimer] = useState(0);
  const increment = useRef(null);
  const role = useRef('');

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpenStatus(true);
  };

  const closePopover = () => {
    // setAnchorEl(null);
    setPopoverOpenStatus(false);
  };

  if (JSON.stringify(user).length === 2) {
    axios
      .get(
        // `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/users/${cookieAccessToken}`,
        `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/users/accessToken`,
        {
          headers: {
            accessToken: cookieAccessToken,
          },
        },
        // `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/users/auth`,
        // { withCredentials: true },
      )
      .then((response) => {
        if (!response.data.isAuth) {
          history.push('/login');
          toastMsgError('Bạn không có quyền tham gia chiến dịch này!');
        }
        setUser(response.data.userFound);

        // if (!response.data.isAuth) {
        //   history.push('/login');
        // } else setUser(response.data);
      });
  }

  useEffect(() => {
    if (socket) {
      socket.on('match', ({ client, servant }) => {
        let yourRole = '';
        if (user && client.userID === user._id) yourRole = 'client';
        if (user && servant.userID === user._id) yourRole = 'servant';
        // console.log(`Found match! You are ${yourRole}.`);
        role.current = yourRole;
        const promise = notificationAudio.play();
        if (promise !== undefined) {
          promise
            .then(() => {
              // Autoplay started!
            })
            .catch((error) => {
              // Autoplay was prevented.
              // Show a "Play" button so that user can start playback.
              console.log('Error play warning: ', error);
            });
        }
        setMatchFound(true);
        // setAnchorEl(null);
        setPopoverOpenStatus(false);
      });
    }
  }, [socket, notificationAudio, user]);

  useEffect(() => {
    if (socket) {
      socket.on('prompt successful', ({ roomID }) => {
        const link = `/slu/room/${roomID}`;
        setMatchFound(false);
        setReadyStatus(false);
        history.push(link);
      });

      // when the other user miss or doesn't accept the second prompt, get back to queueing
      socket.on('requeue', () => {
        setMatchFound(false);
        setPromptStatus(0);
        setPromptDuration(10);
      });

      socket.on('too late', () => {
        setMatchFound(false);
        setReadyStatus(false);
        setPromptDuration(10);
        clearInterval(increment.current);
        setTimer(0);
      });
    }
  }, [socket, history]);

  useEffect(() => {
    let isMount = true;
    if (!readyStatus) {
      clearInterval(increment.current);
      if (isMount) setTimer(0);
    }

    return () => {
      isMount = false;
    };
  }, [readyStatus]);

  const ready = () => {
    // readySignal
    if (socket) {
      setReadyStatus(true);
      const { name, _id } = user;
      const socketID = socket.id;
      socket.emit('ready', {
        socketID,
        userID: _id,
        username: name,
        inputType: 'audio',
      });
    }
    // start counting
    increment.current = setInterval(() => {
      /* eslint-disable-next-line no-shadow */
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const cancelReady = () => {
    // cancelReadySignal
    if (socket) {
      setReadyStatus(false);
      const { name, _id } = user;
      const socketID = socket.id;
      socket.emit('cancel ready', {
        socketID,
        userID: _id,
        username: name,
        inputType: 'audio',
      });
    }
    // stop counting
    clearInterval(increment.current);
    setTimer(0);
  };

  const timeConverter = (seconds) => {
    const format = (val) => `0${Math.floor(val)}`.slice(-2);
    const hours = seconds / 3600;
    const minutes = (seconds % 3600) / 60;

    return [hours, minutes, seconds % 60].map(format).join(':');
  };

  // when the user confirm the second prompt, be ready for the conversation to start.
  const handleConfirmPromptModal = () => {
    // socket logic goes here
    const { name, _id } = user;
    const socketID = socket.id;
    socket.emit('confirm prompt', {
      socketID,
      userID: _id,
      username: name,
      inputType: 'audio',
      timer,
    });
  };

  // when the user denies the prompt or misses the prompt because time runs out.
  const handleDenyPromptModal = () => {
    setMatchFound(false);
    setReadyStatus(false);

    const { name, _id } = user;
    const socketID = socket.id;
    // socket logic goes here
    socket.emit('cancel prompt', {
      socketID,
      userID: _id,
      username: name,
      inputType: 'audio',
    });
  };

  const popoverMenu = (
    <div
      style={{
        backgroundColor: 'white',
        borderColor: 'white',
        width: '377px',
        height: '420px',
        zIndex: '1000',
      }}
    >
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <ReadyButton
            user={user}
            timer={timer}
            ready={ready}
            cancelReady={cancelReady}
            readyStatus={readyStatus}
          />
        </Grid>
      </Grid>

      <RoomList
        userID={user._id}
        readyStatus={readyStatus}
        history={history}
        pageSize="2"
        socket={socket}
      />
    </div>
  );

  return (
    <div>
      <div className="container">
        <div className="box">
          <div className="column-title">
            <h1 style={{ fontSize: '48px', fontWeight: 'normal' }}>Client</h1>
            <h1 style={{ fontSize: '20px', fontWeight: 'normal' }}>
              Người ra lệnh
            </h1>
            <p className="content-hover">
              Mô tả ý muốn cho Agent để thực hiện những yêu cầu.
              <br />
            </p>
          </div>
        </div>

        <div className="box1">
          <div className="column-title">
            <h1 style={{ fontSize: '48px', fontWeight: 'normal' }}>Agent</h1>
            <h1 style={{ fontSize: '20px', fontWeight: 'normal' }}>
              Agent nhận lệnh
            </h1>
            <p className="content-hover">
              Hỏi Client cho đến khi xác định đúng yêu cầu thì thôi.
              <br />
            </p>
          </div>
        </div>
      </div>

      <Grid container>
        <Grid item sm={4} style={{ textAlign: 'center' }}>
          <ConfirmModal
            socket={socket}
            visible={matchFound}
            notificationAudio={notificationAudio}
            promptStatus={promptStatus}
            promptDuration={promptDuration}
            setPromptStatus={setPromptStatus}
            handleOk={handleConfirmPromptModal}
            handleCancel={handleDenyPromptModal}
          />
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: '30px' }}>
        <Grid
          item
          sm={12}
          md={6}
          style={{ padding: '30px', fontFamily: '"Open Sans",sans-serif' }}
        >
          <h1>Trang web này để làm gì?</h1>
        </Grid>

        <Grid item sm={12} md={6} style={{ padding: '30px', fontSize: '16px' }}>
          Mình cần data cho đồ án tốt nghiệp. Trang web này lấy giọng nói của
          các bạn làm dữ liệu phục vụ cho nghiên cứu của mình. Mình cảm ơn vì sự
          hợp tác của các bạn.
          <br />
          Trước khi các bạn vào trong phòng chat, các bạn hãy đảm bảo rằng{' '}
          <b>đừng block trang web mình sử dụng microphone</b> nhé. Các bạn có
          thể kiểm tra nhanh tại đây chrome://settings/content/microphone
        </Grid>
      </Grid>

      <div
        className="landing-menu"
        style={{
          position: 'fixed',
          bottom: '5px',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          margin: '0 auto',
        }}
      >
        <Button
          onClick={openPopover}
          style={{ border: '1px solid black', zIndex: '600', width: '150px' }}
        >
          {readyStatus ? timeConverter(timer) : 'Bắt đầu'}
        </Button>

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
          {popoverMenu}
        </Popover>
      </div>
    </div>
  );
}
