/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import RejectAudioButton from '../Shared/RejectAudioButton';

export default function ServantSendButton(props) {
  const data = props ? props.audio : null;
  const roomDone = props ? props.roomDone : null;
  const userRole = props ? props.userRole : '';
  const buttonDisable = props ? props.disable : true;
  const userID = props ? props.userID : '';
  const roomID = props ? props.roomID : '';
  const roomName = props ? props.roomName : '';
  const turn = props ? props.turn : -1;
  const socket = props ? props.socket : null;
  const rejectButtonDisabled = props ? props.rejectButtonDisabled : true;
  const intent = props ? props.intent : null;
  const audioName = props ? props.audioName : 'test.wav';

  const [buttonState, setButtonState] = useState(false);
  const [buttonPhase, setButtonPhase] = useState(0);

  const validateIntent = () => {
    if (!intent) return false;

    if (intent && intent.four_last_digits) {
      const re = '^[0-9]+$';
      if (
        intent.four_last_digits.length !== 4 ||
        !new RegExp(re).test(intent.four_last_digits)
      )
        return false;
    }

    if (intent && intent.cmnd) {
      const re = '^[0-9]+$';
      if (!new RegExp(re).test(intent.cmnd)) return false;
    }

    return true;
  };

  const uploadAudioAWS = async () => {
    // create data
    let formdata = new FormData();
    formdata.append('destination', roomName);
    formdata.append('name', audioName);
    formdata.append(
      'file',
      new File([data.blob], `${roomName}/${audioName}.wav`, {
        type: 'audio/wav',
      }),
    );

    // const requestConfig = {
    //   headers: new Headers({
    //     enctype: 'multipart/form-data',
    //     Authorization: process.env.REACT_APP_UPLOAD_AUTH_KEY,
    //   }),
    // };

    try {
      setButtonPhase(1);
      setButtonState(true);
      // await axios
      //   .post(
      //     // `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}${process.env.REACT_APP_SLU_UPLOAD_API}`,
      //     `${process.env.REACT_APP_SLU_UPLOAD_API}`,
      //     formdata,
      //     requestConfig,
      //   )
      await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SLU_UPLOAD_API}/api/v1/uploads/file`,
        data: formdata,
        headers: {
          'Content-Type': `multipart/form-data;`,
          Authorization: `Bearer ${process.env.REACT_APP_UPLOAD_AUTH_KEY}`,
        },
        maxContentLength: 'Infinity',
        maxBodyLength: 'Infinity',
      }).then((res) => {
        if (res.data.status === 1) {
          setButtonPhase(2);
          const audioLink = res.data.result.link;
          axios
            .post(`${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/audio`, {
              userID,
              link: audioLink,
            })
            .then((response) => {
              const { audioID } = response.data;
              axios
                .put(
                  `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/chatroom`,
                  {
                    roomID,
                    audioID,
                  },
                )
                .then((response) => {
                  if (!response.data.success) {
                    setButtonState(false);
                    setButtonPhase(0);
                  }
                });
              // tell the server that thing's are ready to move on.
              props.sendAudioSignal(audioID, audioLink);
              // get transcript
              axios
                .put(
                  `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/audio/transcript`,
                  {
                    audioLink,
                    audioID,
                  },
                )
                .then(() => {
                  setButtonState(false);
                  setButtonPhase(0);
                  if (socket) {
                    socket.emit('servant audio', {
                      roomID,
                      audioID,
                    });
                  }
                });
            });
        } else {
          setButtonState(false);
          setButtonPhase(0);
        }
      });
    } catch (error) {
      setButtonState(false);
      setButtonPhase(0);
      alert(error);
    }
  };

  const onConfirm = async () => {
    setButtonState(false);
    if (socket) {
      await socket.emit('servant intent', {
        roomID,
        intentDetailed: intent,
      });
    }
    setButtonState(false);
  };

  // const buttonStyle = {
  //   display: 'inline-block',
  // };

  const insertConfirmButton =
    buttonDisable || !validateIntent() ? (
      <button className="buttons-SLU" type="button" disabled={true}>
        Xác nhận
      </button>
    ) : buttonState ? (
      <button className="buttons-SLU" type="button" disabled={true}>
        <CircularProgress />
      </button>
    ) : (
      <button className="buttons-SLU" type="button" onClick={onConfirm}>
        Xác nhận
      </button>
    );

  const insertSendButton =
    turn === 3 && data !== null && data !== undefined ? (
      buttonState ? (
        <button
          type="button"
          className="buttons-SLU"
          style={{
            cursor: 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
          }}
          disabled
        >
          <CircularProgress />
          {buttonPhase === 0
            ? 'Gửi'
            : buttonPhase === 1
            ? 'Xử lý audio...'
            : buttonPhase === 2
            ? 'Lấy transcript...'
            : '????HOWWWW???'}
        </button>
      ) : roomDone ? (
        <button
          className="buttons-SLU"
          type="button"
          disabled={roomDone || buttonState}
        >
          Gửi
        </button>
      ) : (
        <button
          type="button"
          className="buttons-SLU"
          onClick={uploadAudioAWS}
          disabled={roomDone || buttonState}
        >
          {buttonPhase === 0
            ? 'Gửi'
            : buttonPhase === 1
            ? 'Xử lý audio...'
            : buttonPhase === 2
            ? 'Lấy transcript...'
            : '????HOWWWW???'}
        </button>
      )
    ) : turn === 2 ? (
      <div>
        <RejectAudioButton
          roomID={roomID}
          userRole={userRole}
          socket={socket}
          disabled={rejectButtonDisabled}
        />
        {insertConfirmButton}
      </div>
    ) : (
      ''
    );

  return <>{insertSendButton}</>;
}
