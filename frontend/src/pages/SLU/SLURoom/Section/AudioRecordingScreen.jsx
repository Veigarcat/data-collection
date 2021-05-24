/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
import React, { useRef, useEffect, useState } from 'react';

import { Grid } from '@material-ui/core';
/* eslint-disable-next-line */
import { RedoIcon, PlayOutlineIcon, StopIcon } from '../../ui/icons';
import Wave from './Shared/Wave';
import Status from './Shared/Status';
import Dropdown from './Shared/Dropdown';
import RecordButton from './Shared/CustomRecorder/Recorder';

import ClientSendButton from './Client/ClientSendButton';

import ServantSendButton from './Servant/ServantSendButton';

export default function AudioRecordingScreen(props) {
  const audioRef = useRef(null);
  /* eslint-disable-next-line */
  let socket = props ? props.socket : null;
  const canvasRef = props.canvasRef;
  const roomDone = props ? props.roomDone : false;
  const audioName = props ? props.audioName : '';
  const chatroomID = props ? props.chatroomID : '';
  const roomName = props ? props.roomName : '';
  const user = props ? props.user : null;
  const userRole = props ? props.userRole : '';
  const turn = props ? props.turn : false;
  const message = props ? props.message : 'Loading';
  const latestAudio = props ? props.latestAudio : null;
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [intent, setIntent] = useState(null);
  const [genericIntent, setGenericIntent] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [tagVisibility, setTagVisibility] = useState(true);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    // eslint-disable-next-line
    let wave = new Wave(canvasObj);
    wave.idle();
    if (wave) {
      if (isRecording) wave.play();
      else wave.idle();
    }
    return () => {
      if (wave) {
        wave.idle();
      }
    };
  });

  useEffect(() => {
    if (intent !== null) {
      const newIntent = {
        intent: intent.intent,
      };

      setIntent(newIntent);
    }

    if (genericIntent !== null) {
      const newGenericIntent = {
        generic_intent: genericIntent.generic_intent,
      };

      setGenericIntent(newGenericIntent);
    }
  }, [turn]);

  const sendAudioSignal = (audioID, link) => {
    if (socket) {
      const sender = user.name;
      const userID = user ? user._id : '';
      socket.emit('chatroomAudio', {
        chatroomID,
        sender,
        link,
      });

      socket.emit('get transcript', {
        audioID,
        audioURL: link,
        userID,
        chatroomID,
      });
    }
    setAudio(null);
    // setTagVisibility(true);
  };

  const toggleIsPlaying = () => {
    // eslint-disable-next-line
    const { current: audio } = audioRef;

    const status = !isPlaying;
    if (status) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(status);
  };

  const getAudioFormat = () => {
    const preferredFormat = 'audio/ogg; codecs=opus';
    // eslint-disable-next-line
    const audio = document.createElement('audio');
    const format = audio.canPlayType(preferredFormat)
      ? preferredFormat
      : 'audio/wav';
    return format;
  };

  function onRerecord() {
    setAudio(null);
  }

  const toggleTagVisibility = (value) => {
    setTagVisibility(value);
  };

  /* eslint-disable-next-line no-shadow */
  const renderAudio = (audio) => {
    if (audio !== null) {
      return (
        <div className="pill">
          <div className="pill done">
            <div className="pill done contents">
              <audio preload="auto" onEnded={toggleIsPlaying} ref={audioRef}>
                <source src={audio.blobURL} type={getAudioFormat()} />
              </audio>
              <button className="play" type="button" onClick={toggleIsPlaying}>
                <span className="padder">
                  {isPlaying ? <StopIcon /> : <PlayOutlineIcon />}
                </span>
              </button>
              {/* </Tooltip> */}
              {isPlaying ? (
                <div className="placeholder" />
              ) : (
                <>
                  {/* <Tooltip arrow title={tooltipRerecord}> */}
                  <button className="redo" type="button" onClick={onRerecord}>
                    <span className="padder">
                      <RedoIcon />
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }
    return '';
  };

  const setNewIntent = (intentValue) => {
    if (intentValue === -1) {
      setIntent(null);
      return;
    }
    const newIntent = {
      intent: intentValue,
    };

    setIntent(newIntent);
  };

  const setNewGenericIntent = (genericIntentValue) => {
    if (genericIntentValue === -1) {
      setGenericIntent(null);
      return;
    }
    const newGenericIntent = {
      generic_intent: genericIntentValue,
    };

    setGenericIntent(newGenericIntent);
  };

  const setSlot = (slot, value) => {
    const newIntent = { ...intent };
    if (value === -1) {
      delete newIntent[slot];
    } else newIntent[slot] = value;
    if (slot === 'city') delete newIntent.district;
    setIntent(newIntent);
  };

  return (
    <>
      <Grid container justify="center" style={{ paddingTop: '15vh' }}>
        <div style={{ position: 'absolute', top: '80px' }}>
          <Status
            userRole={userRole}
            message={
              roomDone
                ? 'Nhiệm vụ phòng đã kết thúc! Bạn có thể rời phòng và bắt đầu cuộc trò chuyện khác. Cảm ơn bạn.'
                : message
            }
          />
        </div>

        <div className="primary-buttons">
          <canvas className="primary-buttons canvas" ref={canvasRef} />
          <RecordButton
            turn={
              ((turn === 1 && userRole === 'client' && !roomDone) ||
                (turn === 3 && userRole === 'servant' && !roomDone)) &&
              audio === null
            }
            roomID={chatroomID}
            socket={socket}
            isRecording={isRecording}
            setAudio={setAudio}
            setIsRecording={setIsRecording}
          />
        </div>
      </Grid>

      {/* latest audio */}
      {latestAudio !== null ? (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <p
              style={{
                border: '1px solid #dedede',
                borderRadius: '25px',
                padding: '5px',
              }}
            >
              Audio {turn === 1 ? 'agent' : 'client'} vừa gửi
            </p>
          </Grid>
          <Grid item>
            <audio
              controls
              controlsList="nodownload"
              key={latestAudio}
              autoPlay={true}
              preload="auto"
              style={{ display: 'block' }}
            >
              <source src={latestAudio} type={getAudioFormat()} />
            </audio>
          </Grid>
        </Grid>
      ) : (
        ''
      )}

      <Grid container style={{ marginTop: latestAudio ? '0px' : '60px' }}>
        <Grid item sm={12} md={12}>
          <div
            style={{ width: '100%', margin: '1rem auto', paddingLeft: '10px' }}
          >
            <Dropdown
              toggleTagVisibility={toggleTagVisibility}
              visible={tagVisibility}
              turn={turn}
              disabled={
                !(
                  (turn === 2 && userRole === 'servant') ||
                  (turn === 1 && userRole === 'client')
                )
              }
              setIntent={setNewIntent}
              setGenericIntent={setNewGenericIntent}
              setSlot={setSlot}
            />
          </div>
        </Grid>

        <Grid item sm={12} md={12}>
          <div className="submit-button-SLU">
            {renderAudio(audio)}
            {userRole === 'client' ? (
              <ClientSendButton
                roomName={roomName}
                audioName={audioName}
                turn={turn}
                disable={(intent === null && tagVisibility) || roomDone}
                rejectButtonDisabled={isRecording || latestAudio === null}
                socket={socket}
                audio={audio}
                intent={tagVisibility ? intent : genericIntent}
                userRole={userRole}
                userID={user ? user._id : ''}
                roomID={chatroomID}
                sendAudioSignal={sendAudioSignal}
              />
            ) : userRole === 'servant' ? (
              <ServantSendButton
                roomName={roomName}
                audioName={audioName}
                socket={socket}
                roomDone={roomDone}
                disable={(intent === null && tagVisibility) || roomDone}
                turn={turn}
                audio={audio}
                rejectButtonDisabled={isRecording || latestAudio === null}
                intent={tagVisibility ? intent : genericIntent}
                userRole={userRole}
                userID={user ? user._id : ''}
                roomID={chatroomID}
                sendAudioSignal={sendAudioSignal}
              />
            ) : (
              'Đang tải'
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
}
