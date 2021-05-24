/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import {
  Grid,
  Tabs,
  Tab,
  AppBar,
  Modal,
  IconButton,
  Button,
  TextareaAutosize,
} from '@material-ui/core';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import { makeStyles } from '@material-ui/core/styles';
import { toastMsgError } from '../../../commons/Toastify';

import AudioRecordingScreen from './Section/AudioRecordingScreen';
import StatusMessage from './constant/StatusMessage';

import Scenario from './Section/Client/Scenario';
import Hint from './Section/Servant/Hint';
import AudioList from './Section/Shared/AudioList';
import ProgressNote from './Section/Shared/ProgressNote';
import SuccessSound from '../sound/success_sound_cue.wav';
import RoomDoneSound from '../sound/room_done.wav';
import './Section/Shared/CustomRecorder/Recorder.css';
import './SLURoom.css';

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

export default function SLURoom(props) {
  const { history } = props;
  // eslint-disable-next-line
  let socket = props ? props.socket : null;

  const getRoomID = () => {
    const processURL = window.location.href.split('/');
    return processURL[processURL.length - 1];
  };

  const chatroomID = getRoomID();
  const [user, setUser] = useState(null);
  const userID = user ? user._id : '';
  const username = user ? user.name : '';
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

  const classes = useStyles();
  const canvasRef = useRef(null);
  const [userRole, setUserRole] = useState('');
  const [roomDone, setRoomDone] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [scenario, setScenario] = useState([]);
  const [currentIntent, setCurrentIntent] = useState([]);
  const [audioHistory, setAudioHistory] = useState([]);
  const [transcriptHistory, setTranscriptHistory] = useState([]);
  const [latestAudio, setLatestAudio] = useState(null);
  const [turn, setTurn] = useState(-1);
  const [message, setMessage] = useState('Loading');
  const [tabValue, setTabValue] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    history.push('/slu/home');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const generateRandomString = (length, allowedChars) => {
    let text = '';
    const possible =
      allowedChars ||
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const updateCurrentIntent = (newIntent) => {
    /* eslint-disable-next-line */
    let tempCurrentIntent = [];
    /* eslint-disable-next-line */
    for (const property in newIntent) {
      if (
        property !== '_id' &&
        property !== '__v' &&
        newIntent[property] !== null
      ) {
        tempCurrentIntent.push([
          property,
          newIntent[property],
          // key: property,
          // value: currentIntent[property],
        ]);
      }
    }
    setCurrentIntent(tempCurrentIntent);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/users/accessToken`,
        {
          headers: {
            accessToken: cookieAccessToken,
          },
        },
      )
      .then((response) => {
        // redirect to real login path later.
        if (!response.data.isAuth) {
          history.push('/login');
          toastMsgError('Bạn không có quyền tham gia chiến dịch này!');
        }
        setUser(response.data.userFound);
      });
  }, []);

  useEffect(() => {
    if (socket && userID.length > 0) {
      const socketID = socket.id;
      socket.emit('joinRoom', {
        socketID,
        chatroomID,
        userID,
        username,
      });
    }

    return () => {
      if (socket) {
        socket.emit('leaveRoom', {
          chatroomID,
          userID,
          username,
        });
      }
    };
  }, [socket, chatroomID, username, userID]);

  useEffect(() => {
    socket.on('joinRoom announce', ({ username, userID }) => {
      setMessage(`${username} đã vào phòng.`);
      if (user !== null && user._id === userID) {
        if (
          userRole === '' ||
          roomName === '' ||
          scenario.length === 0 ||
          turn === -1 ||
          message === 'Loading'
        ) {
          axios
            .get(
              `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/chatroom/${chatroomID}`,
            )
            .then((response) => {
              // console.log('Room run rerender', response.data);
              if (response.data.success) {
                const {
                  user1,
                  user2,
                  done,
                  name,
                  intent,
                  // eslint-disable-next-line no-shadow
                  currentIntent,
                  audioList,
                } = response.data.roomFound;

                // console.log(response.data)
                // console.log('user1: ', user1);
                // console.log('user2: ', user2);

                if (userID === user1) setUserRole('client');
                if (userID === user2) setUserRole('servant');
                setRoomDone(done);
                setRoomName(name);

                // eslint-disable-next-line
                let tempScenario = [];

                /* eslint-disable-next-line no-restricted-syntax */
                for (const property in intent) {
                  if (
                    property !== '_id' &&
                    property !== '__v' &&
                    intent[property] !== null
                  ) {
                    tempScenario.push([
                      property,
                      intent[property],
                      intent[property],
                    ]);
                  }
                }
                setScenario(tempScenario);

                // eslint-disable-next-line
                let tempCurrentIntent = [];
                /* eslint-disable-next-line no-restricted-syntax */
                for (const property in currentIntent) {
                  if (
                    property !== '_id' &&
                    property !== '__v' &&
                    currentIntent[property] !== null
                  ) {
                    tempCurrentIntent.push([
                      property,
                      currentIntent[property],
                      currentIntent[property],
                    ]);
                  }
                }
                setCurrentIntent(tempCurrentIntent);

                // eslint-disable-next-line
                let tempAudioList = [];
                // eslint-disable-next-line
                let tempTranscriptList = [];
                if (audioList) {
                  audioList.map((audio) => {
                    tempTranscriptList.push({
                      audioID: audio._id,
                      content: audio.transcript,
                      yours: userID === audio.user,
                      fixBy: audio.fixBy ? audio.fixBy.name : 'ASR Bot',
                    });
                    return tempAudioList.push(audio.link);
                  });
                }
                setTranscriptHistory(tempTranscriptList);
                setAudioHistory(tempAudioList);
                if (audioList.length > 0) {
                  setLatestAudio(audioList[audioList.length - 1].link);
                }

                setTurn(response.data.roomFound.turn);
                if (response.data.roomFound.turn === 1) {
                  setMessage(StatusMessage.TURN_CLIENT_START);
                } else setMessage(StatusMessage.TURN_SERVANT_START);
              }
            });
        }
      }
    });

    return () => {
      if (socket) {
        socket.off('joinRoom announce');
      }
    };
  }, [socket, user]);

  useEffect(() => {
    if (socket) {
      socket.on('room full', () => {
        // setRedirect(true);
        toastMsgError('Phòng đã hết chỗ!');
        history.push('/slu/home');
      });

      // socket.on('joinRoom announce', ({ username }) => {
      //   setMessage(`${username} đã vào phòng.`);
      // });

      socket.on('leaveRoom announce', ({ username }) => {
        setMessage(`${username} đã rời phòng.`);
      });

      socket.on('intent incorrect', () => {
        setMessage(StatusMessage.INTENT_INCORECT);
      });
    }

    return () => {
      if (socket) {
        socket.off('room full');
        // socket.off('joinRoom announce');
        socket.off('leaveRoom announce');
        socket.off('intent incorrect');
      }
    };
  }, [socket, history]);

  const successAudio = new Audio(SuccessSound);
  const roomDoneAudio = new Audio(RoomDoneSound);

  useEffect(() => {
    if (socket) {
      socket.on('intent correct', ({ roomDone, newIntent }) => {
        // console.log(`Servant has understood client's intent correctly! It's now servant turn to record the reply.`);
        setMessage(StatusMessage.INTENT_CORRECT);
        successAudio.play();
        if (roomDone) {
          roomDoneAudio.play();
          setRedirect(true);
          setIsModalVisible(true);
        }
        updateCurrentIntent(newIntent);
        setTurn(3);
      });
    }

    return () => {
      if (socket) {
        socket.off('intent correct');
      }
    };
  }, [socket, scenario]);

  useEffect(() => {
    if (socket) {
      socket.on('newAudioURL', async ({ userID, sender, audioLink }) => {
        console.log(
          `Receive signal from ${sender} with the ID of ${userID}. Here's the link: ${audioLink}`,
        );
        /* eslint-disable-next-line */
        let newHistory = [...audioHistory];
        newHistory.push(audioLink);
        // await newHistory.unshift(audioLink);
        await setAudioHistory(newHistory);
        await setLatestAudio(audioLink);
        // if client sent then move on
        if (turn === 1) {
          await setTurn(2);
          setMessage(StatusMessage.TURN_TWO_TRANSITION);
          // if servant sent then move on
        } else if (turn === 3) {
          await setTurn(1);
          setMessage(StatusMessage.TURN_ONE_TRANSITION);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('newAudioURL');
      }
    };
  }, [socket, turn, audioHistory]);

  useEffect(() => {
    if (socket) {
      socket.on('update transcript', ({ username, transcript, index }) => {
        if (index === -1) {
          /* eslint-disable-next-line */
          let tempTranscriptList = [...transcriptHistory];
          /* eslint-disable-next-line */
          let newTranscript = {
            // special case, username now becomes audioID
            audioID: username,
            content: transcript,
            yours: false,
            fixBy: 'ASR Bot',
          };
          tempTranscriptList.push(newTranscript);
          setTranscriptHistory(tempTranscriptList);
        } else if (transcriptHistory[index]) {
          /* eslint-disable-next-line */
          let tempTranscriptList = [...transcriptHistory];
          tempTranscriptList[index].content = transcript;
          tempTranscriptList[index].fixBy = username;
          // console.log(index)
          setTranscriptHistory(tempTranscriptList);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('update transcript');
      }
    };
  }, [transcriptHistory, socket]);

  useEffect(() => {
    if (socket) {
      socket.on('audio removed', () => {
        /* eslint-disable-next-line */
        let newHistory = [...audioHistory];
        newHistory.pop();
        setAudioHistory(newHistory);
        if (newHistory.length === 0) setLatestAudio(null);
        else setLatestAudio(newHistory[newHistory.length - 1]);

        /* eslint-disable-next-line */
        let tempTranscriptList = [...transcriptHistory];
        tempTranscriptList.pop();
        setTranscriptHistory(tempTranscriptList);

        if (turn === 1) {
          setTurn(3);
          setMessage(StatusMessage.AUDIO_REMOVED_CLIENT);
        } else if (turn === 2) {
          setTurn(1);
          setMessage(StatusMessage.AUDIO_REMOVED_SERVANT);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('audio removed');
      }
    };
  }, [audioHistory, transcriptHistory, socket, turn]);

  useEffect(() => {
    if (socket && turn !== -1) {
      socket.on('user recording', () => {
        if (turn === 1) {
          setMessage(StatusMessage.USER_RECORDING_CLIENT);
        } else if (turn === 3) {
          setMessage(StatusMessage.USER_RECORDING_SERVANT);
        } else {
          setMessage('Sao thu âm được hay thế?');
        }
      });

      socket.on('user done recording', () => {
        if (turn === 1) {
          setMessage(StatusMessage.USER_DONE_RECORDING_CLIENT);
        } else if (turn === 3) {
          setMessage(StatusMessage.USER_DONE_RECORDING_SERVANT);
        } else {
          setMessage('Sao thu âm được hay thế?');
        }
      });
    }

    return () => {
      if (socket && turn !== -1) {
        socket.off('user recording');
        socket.off('user done recording');
      }
    };
  }, [socket, turn]);

  const [transcriptNeedConfirm, setTranscriptNeedConfirm] = useState(null);
  // const [transcriptNeedConfirm, setTranscriptNeedConfirm] = useState({
  //   audioID: '60668997af07c3477044695f',
  //   audioURL:
  //     'http://localhost:5000/public/Room yF1r/0_606474a4acaf2b27489c8baa_JtgzMqSu5HuUHFC0.wav',
  //   transcription: 'Just a test',
  //   index: -1,
  // });
  const [shrinkableModalOpen, setShrinkableModalOpen] = useState(false);

  const handleShrinkableModalOpen = () => {
    setShrinkableModalOpen(true);
  };

  const handleShrinkableModalClose = () => {
    setShrinkableModalOpen(false);
  };

  const saveTranscriptNeedConfirm = () => {
    const { audioID, transcription, index } = transcriptNeedConfirm;
    if (socket) {
      socket.emit('transcript confirmed', {
        audioID,
        userID: user ? user._id : '',
        newTranscript: transcription,
      });

      socket.emit('fix transcript', {
        roomID: chatroomID,
        username: user ? user.name : '',
        editContent: transcription,
        index,
      });
    }

    setTranscriptNeedConfirm(null);
    setShrinkableModalOpen(false);
  };

  const updateTranscriptNeedConfirm = (e) => {
    // eslint-disable-next-line prefer-const
    let newTranscript = transcriptNeedConfirm;
    newTranscript.transcription = e.target.value;
    setTranscriptNeedConfirm(newTranscript);
  };

  useEffect(() => {
    if (socket) {
      socket.on(
        'confirm transcript',
        ({ audioID, audioURL, transcription, userID }) => {
          if (user && userID === user._id) {
            const index = audioHistory.length - 1;
            setTranscriptNeedConfirm({
              audioID,
              audioURL,
              transcription,
              index,
            });

            setShrinkableModalOpen(true);
          }
        },
      );
    }

    return () => {
      if (socket) {
        socket.off('confirm transcript');
      }
    };
  }, [socket, user, audioHistory]);

  const getAudioFormat = () => {
    const preferredFormat = 'audio/ogg; codecs=opus';
    // eslint-disable-next-line
    const audio = document.createElement('audio');
    const format = audio.canPlayType(preferredFormat)
      ? preferredFormat
      : 'audio/wav';
    return format;
  };

  const roomStatusContent = (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {userRole === 'client' ? (
        <>
          <Scenario scenario={scenario} currentIntent={currentIntent} />
          <ProgressNote currentIntent={currentIntent} scenario={scenario} />
        </>
      ) : userRole === 'servant' ? (
        <>
          <ProgressNote currentIntent={currentIntent} scenario={scenario} />
          <Hint currentIntent={currentIntent} />
        </>
      ) : (
        'Đang tải'
      )}
    </>
  );

  const shrinkableModal =
    transcriptNeedConfirm !== null ? (
      <>
        <IconButton onClick={handleShrinkableModalOpen}>
          <IndeterminateCheckBoxRoundedIcon />
        </IconButton>

        <Modal
          open={shrinkableModalOpen}
          onClose={handleShrinkableModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.paper}>
            <div>
              <h4 style={{ marginBottom: '0px' }}>
                <i>Nếu không khớp với audio, bạn sửa giúp mình với nhé.</i>
              </h4>
            </div>
            <audio
              controls
              controlsList="nodownload"
              preload="auto"
              style={{ display: 'block' }}
            >
              <source
                src={transcriptNeedConfirm.audioURL}
                type={getAudioFormat()}
              />
            </audio>
            <TextareaAutosize
              style={{ width: '100%', marginBottom: '10px' }}
              rowsMin={2}
              onChange={updateTranscriptNeedConfirm}
              defaultValue={transcriptNeedConfirm.transcription}
            />
            <div>
              <Button
                variant="contained"
                style={{
                  marginRight: '10px',
                  backgroundColor: '#90caf9',
                  color: '#585D5E',
                }}
                onClick={saveTranscriptNeedConfirm}
              >
                Xác nhận
              </Button>
              <Button
                variant="contained"
                color="default"
                onClick={handleShrinkableModalClose}
              >
                Đóng
              </Button>
            </div>
          </div>
        </Modal>
      </>
    ) : (
      ''
    );

  if (redirect) {
    return (
      // eslint-disable-next-line
      <Modal disableBackdropClick={true} open={isModalVisible}>
        <div className={classes.paper}>
          <p>
            Cảm ơn bạn đã hoàn thành xong nhiệm vụ này! Giờ bạn có thể rời phòng
            và bắt đầu cuộc trò chuyện khác!
          </p>
          <Button variant="contained" color="default" onClick={handleCancel}>
            Ở lại phòng
          </Button>
          <Button
            variant="contained"
            style={{
              marginLeft: '10px',
              backgroundColor: '#90caf9',
              color: '#585D5E',
            }}
            onClick={handleOk}
          >
            Rời phòng
          </Button>
        </div>
      </Modal>
    );
  }

  if (
    userRole === '' ||
    roomName === '' ||
    scenario.length === 0 ||
    turn === -1 ||
    message === 'Loading'
  ) {
    // console.log('userRole:', userRole);
    // console.log('roomName:', roomName);
    // console.log('scenario:', scenario);
    // console.log('turn:', turn);
    // console.log('message:', message);
    return (
      <Grid container justify="center" alignItems="center">
        Đang tải... Nếu thấy trang này quá 2 giây bạn hãy f5 lại trang giúp mình
        nhé.
        {/* <br />
        userRole: {userRole}
        <br />
        roomName: {roomName}
        <br /> scenario: {scenario.length}
        <br /> turn: {turn}
        <br /> noti: {message} */}
      </Grid>
    );
  }

  return (
    <>
      <div style={{ position: 'absolute' }}>{shrinkableModal}</div>

      <Grid container style={{ height: '100%' }}>
        <Grid item xs={12} sm={12} md={8}>
          <div>
            <AudioRecordingScreen
              audioName={`${
                audioHistory.length
                // }_${userID}_${generateRandomString(16)}.wav`}
              }_${userID}_${generateRandomString(16)}`}
              roomName={roomName}
              roomDone={roomDone}
              latestAudio={latestAudio}
              message={message}
              turn={turn}
              canvasRef={canvasRef}
              socket={socket}
              user={user}
              chatroomID={chatroomID}
              userRole={userRole}
            />
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          style={{
            zIndex: '4',
            borderLeft: '1px solid #dedede',
          }}
        >
          <AppBar position="static" style={{ background: 'white' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              style={{ border: '1px solid #dedede' }}
            >
              <Tab
                label="Trạng thái"
                style={{
                  textTransform: 'none',
                  color: tabValue === 0 ? '#f50057' : 'black',
                }}
              />
              <Tab
                label="Lịch sử"
                style={{
                  textTransform: 'none',
                  color: tabValue === 1 ? '#f50057' : 'black',
                }}
              />
            </Tabs>
          </AppBar>

          <div
            hidden={tabValue !== 0}
            style={{
              width: '100%',
              backgroundColor: 'white',
            }}
          >
            <Grid
              container
              style={{
                height: 'calc(100vh - 119px)',
                overflowY: 'scroll',
              }}
            >
              <div style={{ width: '100%' }}>{roomStatusContent}</div>
            </Grid>
          </div>

          <div hidden={tabValue !== 1}>
            <Grid container>
              <Grid item xs={12}>
                <AudioList
                  socket={socket}
                  roomID={chatroomID}
                  userID={userID}
                  username={username}
                  userRole={userRole}
                  transcript={transcriptHistory}
                  audioList={audioHistory}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
