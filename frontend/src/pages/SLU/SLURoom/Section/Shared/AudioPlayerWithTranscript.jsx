/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import { PlayOutlineIcon, StopIcon } from '../../../ui/icons';

export default function AudioPlayerWithTranscript(props) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  /* eslint-disable-next-line prefer-const */
  let { socket, transcript } = props;
  const {
    userID,
    roomID,
    username,
    index,
    backgroundColor,
    audioLink,
    offset,
    audioRole,
  } = props;

  if (transcript && (transcript.content === '' || transcript.content === ' '))
    transcript.content = '...';

  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(
    transcript ? transcript.content : '...',
  );
  // const [extraOptionVisibility, setExtraOptionVisibility] = useState('hidden');
  const [extraOptionVisibility, setExtraOptionVisibility] = useState('none');
  const getAudioFormat = () => {
    // const preferredFormat = 'audio/ogg; codecs=opus';
    // const audio = document.createElement('audio');
    // const format = audio.canPlayType(preferredFormat)
    //   ? preferredFormat
    //   : 'audio/wav';
    // return format;
    return 'audio/wav';
  };

  const onTranscriptHover = () => {
    // setExtraOptionVisibility('visible');
    setExtraOptionVisibility('inline-flex');
  };

  const offTranscriptHover = () => {
    // setExtraOptionVisibility('hidden');
    setExtraOptionVisibility('none');
  };

  const onSaveTranscript = () => {
    if (transcript) {
      axios
        .put(
          `${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/audio/${transcript.audioID}/${userID}`,
          {
            transcript: editContent,
          },
        )
        .then((response) => {
          // console.log(response.data);
          if (response.data.success) {
            // emit a signal here
            setEditMode(false);
            if (socket) {
              socket.emit('fix transcript', {
                roomID,
                username,
                editContent,
                index,
              });
            }
          } else {
            alert(
              "Something's wrong with the server. Please not using this function for now.",
            );
          }
        });
    } else {
      setEditMode(false);
    }
  };

  const renderAudio = (audioUrl) => {
    if (audioUrl !== null) {
      return (
        <div>
          <audio preload="none" onEnded={toggleIsPlaying} ref={audioRef}>
            <source src={audioUrl} type={getAudioFormat()} />
          </audio>
          <button className="play" type="button" onClick={toggleIsPlaying}>
            <span className="padder">
              {isPlaying ? <StopIcon /> : <PlayOutlineIcon />}
            </span>
          </button>
        </div>
      );
    }
    return '';
  };

  if (audioLink === undefined || audioLink === null) return '';

  if (
    socket === null ||
    roomID === '' ||
    userID === '' ||
    username === '' ||
    audioLink === '' ||
    audioRole === 'Loading...' ||
    JSON.stringify(transcript) === JSON.stringify({})
  ) {
    return 'Đang tải';
  }

  return (
    <>
      <Grid
        container
        onMouseEnter={onTranscriptHover}
        onMouseLeave={offTranscriptHover}
        style={{ margin: '10px 5px' }}
        justify={offset === 'right' ? 'flex-end' : 'flex-start'}
        alignItems="center"
      >
        {offset === 'right' ? (
          <>
            {transcript ? (
              <Grid
                item
                style={{
                  maxWidth: '50%',
                  alignItems: 'center',
                  display: offset === 'right' ? extraOptionVisibility : 'none',
                  // visibility: offset === 'right' ? extraOptionVisibility : 'hidden',
                }}
              >
                {renderAudio(audioLink)}
                <IconButton
                  disabled={editMode}
                  onClick={() => {
                    onSaveTranscript();
                  }}
                >
                  {!editMode && transcript.fixBy !== 'ASR Bot' ? (
                    <ThumbUpIcon color="primary" fontSize="small" />
                  ) : (
                    <ThumbUpOutlinedIcon fontSize="small" />
                  )}
                </IconButton>
                <IconButton
                  disabled={editMode}
                  onClick={() => {
                    setEditContent(transcript ? transcript.content : '...');
                    setEditMode(true);
                  }}
                >
                  <ThumbDownOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}
        {/* </Grid> */}
        <Grid item style={{ maxWidth: '50%' }}>
          <Grid container style={{ display: 'inline-block' }}>
            <Grid
              container
              style={{
                padding: '10px 10px 10px',
                border: '1px solid #dedede',
                borderRadius: '16px',
                backgroundColor,
              }}
            >
              <Grid item>
                <Grid container>
                  {editMode ? (
                    <>
                      <Grid item xs={12}>
                        <Input
                          style={{ width: '100%' }}
                          value={editContent}
                          onChange={(e) => {
                            setEditContent(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} style={{ float: 'right' }}>
                        {transcript ? (
                          editContent === transcript.content ? (
                            <Button disabled>Lưu</Button>
                          ) : (
                            <Button onClick={() => onSaveTranscript()}>
                              Lưu
                            </Button>
                          )
                        ) : editContent === '...' ? (
                          <Button disabled>Lưu</Button>
                        ) : (
                          <Button onClick={() => onSaveTranscript()}>
                            Lưu
                          </Button>
                        )}

                        <Button onClick={() => setEditMode(false)}>Hủy</Button>
                      </Grid>
                    </>
                  ) : (
                    <div>
                      {transcript
                        ? `${transcript.content}`
                        : 'Bot đang dịch transcript...'}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {offset === 'left' ? (
          <Grid
            item
            style={{
              alignItems: 'center',
              display: offset === 'left' ? extraOptionVisibility : 'none',
              // visibility: offset === 'left' ? extraOptionVisibility : 'hidden',
            }}
          >
            {transcript ? (
              <>
                <IconButton
                  disabled={editMode}
                  onClick={() => {
                    onSaveTranscript();
                  }}
                >
                  {!editMode && transcript.fixBy !== 'ASR Bot' ? (
                    <ThumbUpIcon color="primary" fontSize="small" />
                  ) : (
                    <ThumbUpOutlinedIcon fontSize="small" />
                  )}
                </IconButton>
                <IconButton
                  disabled={editMode}
                  onClick={() => {
                    setEditContent(transcript ? transcript.content : '...');
                    setEditMode(true);
                  }}
                >
                  <ThumbDownOutlinedIcon fontSize="small" />
                </IconButton>
                {renderAudio(audioLink)}
              </>
            ) : (
              ''
            )}
          </Grid>
        ) : (
          ''
        )}
      </Grid>
    </>
  );
}
