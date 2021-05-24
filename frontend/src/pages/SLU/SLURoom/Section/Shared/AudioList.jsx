import React, { useEffect, useRef } from 'react';

import Grid from '@material-ui/core/Grid';
import AudioPlayerWithTranscript from './AudioPlayerWithTranscript';

export default function AudioList(props) {
  /* eslint-disable-next-line prefer-const */
  let { socket } = props;
  const { transcript, audioList, userRole, roomID, userID, username } = props;
  const audioEndRef = useRef(null);

  const scrollToBottom = () => {
    audioEndRef.current.scrollIntoView({
      behaviour: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [audioList.length]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'calc(100vh - 119px)',
        backgroundColor: 'white',
        overflowX: 'hidden',
        overflowY: 'scroll',
        paddingLeft: '10px',
        paddingRight: '20px',
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          {audioList.map((audio, index) => {
            return (
              /* eslint-disable-next-line react/no-array-index-key */
              <div key={`audio_${index}`}>
                <AudioPlayerWithTranscript
                  index={index}
                  backgroundColor={index % 2 === 0 ? '#F8EFF0' : '#E9FFFB'}
                  offset={
                    (userRole === 'client' && index % 2 === 0) ||
                    (userRole === 'servant' && index % 2 === 1)
                      ? 'left'
                      : 'right'
                  }
                  socket={socket}
                  roomID={roomID}
                  userID={userID}
                  username={username}
                  audioRole={index % 2 === 0 ? 'Client' : 'Servant'}
                  audioLink={audio}
                  transcript={transcript[index]}
                />
              </div>
            );
          })}
        </Grid>
      </Grid>
      <div ref={audioEndRef} />
    </div>
  );
}
