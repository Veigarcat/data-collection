import React, {useRef, useState} from 'react';
import {
  SendIcon,

} from '../../../../../components/ui/icon';
import ReactEmoji from 'react-emoji';

import axios from "axios";
import { IconButton, TextField} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {PlayArrow, Stop, ThumbDown, ThumbUp} from "@material-ui/icons";



export default function ChatCard(props) {
  let {
    sender,
    audioLink,
    transcript,
    audioID,
    userID,
    isLike,
  } = props.listAudio[props.index]
  let isSentByCurrentUser = false;
  const [edit, setEdit] = useState(false);
  const username = props.name;
  const setListAudio = props.setListAudio;
  const textInput = useRef();
  const socket = props.socket;
  const audioIndex = props.index
  const chatroomID = props.chatroomID;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [expenseTranscript, setExpenseTranscript] = useState(transcript);
  if (sender === username) {
    isSentByCurrentUser = true;
  }
  const [playbackMode, setPlaybackMode] = useState(false);

  const renderEditView = () => {
    return (
      <div className="edit-text">
        <TextField
          id="full-width-text-field"
          style={{color: "black", fontSize: "15px",overflow:"visible"}}
          type="text"
          inputRef={textInput}
          multiline
          rows={3}
          fullWidth={true}
          label={"Nội dung"}
          defaultValue={expenseTranscript}
          variant="outlined"
        />
        <div className="double-button">
          <IconButton onClick={() => setEdit(false)} type="button"
                      className="cancel"><CloseIcon/></IconButton>
          <IconButton onClick={() => updateValue()} type="button"
                      className="send"><SendIcon/></IconButton>
        </div>
      </div>
    );
  };
  const toggleIsPlaying = () => {
    const {current: audio} = audioRef;

    let status = !isPlaying;
    if (status) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(status);
  };
  const updateValue = async () => {
    const value = textInput.current.value;
    console.log(value)
    setExpenseTranscript(value);
    textInput.current.defaultValue = value;
    let body = {
      userID: userID,
      audioID: audioID,
      transcript: value,
      isValid: false,
    }
    console.log(body)
    try {
      await axios.put(
        `${process.env.REACT_APP_ASR_APP}/api/audio/updateTranscript`,
        body,
      ).then(res => {
        console.log(res)

        setEdit(false);
        const listAudio = [...props.listAudio]; // Get a copy of the expenses array
        // // Replace the current expense item
        listAudio.splice(props.index, 1, {
          userID,
          sender,
          audioLink,
          transcript: res.data.audioUpdated.transcript,
          audioID,
        });
        let newTranscript = res.data.audioUpdated.transcript
        console.log(newTranscript)
        // // Update the parent state
        setListAudio(listAudio);
        if (socket) {
          socket.emit("update transcript", {
            chatroomID,
            sender,
            newTranscript,
            audioIndex
          })
        }

      })
    } catch (error) {
      alert(error)
    }
  };

  const editText = () => {
    setEdit(true)
  }
  const renderAudio1 = (
    <>
      <audio
        controls
        key={audioLink}
        preload="auto"
        style={{
          display: playbackMode ? "block" : "none",
          height: "30px",
          width: edit ? "100px" : ""
        }}
      >
        <source src={audioLink} type="audio/wav"/>
      </audio>
    </>
  )
  const updateLikeState = async () => {

    let body = {
      userID: userID,
      audioID: audioID,
      isLike: true,
      upVoteTime: new Date()
    }
    console.log(body)
    try {
      await axios.put(
        `${process.env.REACT_APP_ASR_APP}/api/audio/updateLike`,
        body,
      ).then(res => {
        console.log(res)

        setEdit(false);
        const listAudio = [...props.listAudio]; // Get a copy of the expenses array
        // // Replace the current expense item
        listAudio.splice(props.index, 1, {
          userID,
          sender,
          audioLink,
          isLike,
          audioID,
        });
        let newIsLikeState = res.data.audioUpdated.isLike
        console.log(newIsLikeState)
        // // Update the parent state
        setListAudio(listAudio);
        if (socket) {
          socket.emit("update like state", {
            chatroomID,
            sender,
            newIsLikeState,
            audioIndex
          })
        }

      })
    } catch (error) {
      alert(error)
    }
  };
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd" id="a">
          <div className="check-button1" id="b">
            <IconButton onClick={toggleIsPlaying}>
              <audio id="ad" preload="auto" onEnded={toggleIsPlaying}
                     ref={audioRef}>
                <source src={audioLink} type="audio/wav"/>
              </audio>
              {isPlaying ? <Stop fontSize="small"/> :
                <PlayArrow fontSize="small"/>}
            </IconButton>
            <IconButton onClick={() => updateLikeState()}>
              {!isLike ? <ThumbUp style={{fontSize: 15}} color="disabled"/> :
                <ThumbUp style={{fontSize: 15}} color="primary"/>}
            </IconButton>
            <IconButton onClick={editText}>
              <ThumbDown style={{fontSize: 15}} color="disabled"/>
            </IconButton>
          </div>
          <div className="audio-text">
            <div className="message-area">
              <div className="text-username">
                <div className="text-checkButton1">
                  <div className="messageBox backgroundLight">
                    {edit ? renderEditView()
                      :
                      <span
                        className="messageText colorWhite">{expenseTranscript === "" ? "..." : ReactEmoji.emojify(expenseTranscript)}</span>
                    }
                  </div>
                </div>
              </div>
            </div>
            {/*{renderAudio1}*/}
          </div>
        </div>
      ) :
      (
        <div className="messageContainer justifyStart" id="c">
          <div className="message-area">
            <div className="text-username">
            <span
              style={{color: "#B0B3B8", fontSize: "0.6875rem"}}>{sender}</span>
              <div className="audio-text">
                <div className="text-checkButton">
                  <div className="messageBox backgroundBlue">
                    {edit ? renderEditView()
                      :
                      <span
                        className="messageText colorWhite">{expenseTranscript === "" ? "..." : ReactEmoji.emojify(expenseTranscript)}</span>
                    }
                  </div>
                </div>
                {/*{renderAudio1}*/}
              </div>

            </div>
            <div className="check-button" id="d">
              <IconButton onClick={() => updateLikeState()}>
                {!isLike ? <ThumbUp style={{fontSize: 15}} color="disabled"/> :
                  <ThumbUp style={{fontSize: 15}} color="primary"/>}
              </IconButton>
              <IconButton onClick={editText}>
                <ThumbDown color="disabled" style={{fontSize: 15}}/>
              </IconButton>
              <IconButton onClick={toggleIsPlaying}>
                <audio id="ad" preload="auto" onEnded={toggleIsPlaying}
                       ref={audioRef}>
                  <source src={audioLink} type="audio/wav"/>
                </audio>
                {isPlaying ? <Stop fontSize="small"/> :
                  <PlayArrow fontSize="small"/>}
              </IconButton>
            </div>

          </div>
        </div>

      )
  )
}
