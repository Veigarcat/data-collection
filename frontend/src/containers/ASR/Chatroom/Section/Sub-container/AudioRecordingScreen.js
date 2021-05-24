import React, {useRef, useEffect, useState} from 'react';
import {
  RedoIcon,
  PlayOutlineIcon,
  StopIcon,

} from '../../../../../components/ui/icon';
import Wave from '../Wave';
import SendButton from '../SendButton';
import Recorder from '../../../Speak/Recorder'
import axios from "axios";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function AudioRecordingScreen(props) {
  const canvasRef = props.canvasRef;
  const audioRef = useRef(null);
  const userID=props.userID;
  const [value, setValue] = useState('')


  let socket = props.socket;
  const chatroomID = props.chatroomID;
  const user = props.user;
  const username = props.username;
  const audioName = props.audioName;
  const ssoUserId = props.ssoUserId;
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [blob, setBlob] = useState(null);
  const [audioLink, setAudioLink] = useState('')
  const [duration,setDuration]=useState(0)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const canvasObj = canvasRef.current;
    let wave = new Wave(canvasObj);
    wave.idle();
    if (wave) {
      isRecording ? wave.play() : wave.idle();
    }
    return () => {
      if (wave) {
        wave.idle();
      }
    }
  });

  useEffect(()=>{
    const {current: audio} = audioRef;
    if(audio!==null){
      audio.onloadedmetadata = () => {
        setDuration(audio.duration.toFixed(0))
      }
    }

  })
  // function formatTime(seconds) {
  //   const h = Math.floor(seconds / 3600)
  //   const m = Math.floor((seconds % 3600) / 60)
  //   const s = seconds % 60
  //   return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
  //     .filter(a => a)
  //     .join(':')
  // }
  const sendAudioSignal = (link, transcript,audioID) => {
    if (socket) {
      let sender = user.name;
      let ava = user.image;
      socket.emit("chatroomAudio", {
        chatroomID,
        sender,
        ava,
        link,
        transcript,
        audioID,
        userID
      })
    }
    setValue(null);
    setAudio(null);
  }

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

  function onRerecord() {
    setAudio(null);
    setValue(null);
    setDisabled(false)
    if(socket){
      socket.emit("Re record",{
        chatroomID,
        username,
      })
    }
  }

  // const onGetText = async (blob) =>{
  //   const url = "https://cdn.vbee.vn/api/v1/uploads/file";
  //   let formData = new FormData();
  //
  //   const file = new File([blob],`${audioName}`,{type:"audio/wav"})
  //   let name = audioName.split(".");
  //   setFileName(name[0])
  //   console.log(file)
  //   formData.append("destination", "congpt/record")
  //   formData.append("name",name[0])
  //   formData.append("file",file)
  //   try {
  //     await axios.post(
  //         url,
  //         formData,
  //     ).then(res => {
  //       if(res.data.status===1){
  //         setAudioLink(res.data.result.link)
  //         let body={
  //           link: res.data.result.link
  //         }
  //         axios.post('/api/getText',body)
  //             .then(res=>{
  //               console.log(res)
  //               setValue(res.data)
  //             })
  //       }
  //     })
  //   } catch(error){
  //     alert(error)
  //   }
  // }


  const renderAudio = (audio) => {
    if (audio !== null) {
      return (
          <div className="pill">
            <div className="pill done">
              <div className="pill done contents">
                <audio preload="auto" onEnded={toggleIsPlaying} ref={audioRef}>
                  <source src={audio} type="audio/wav"/>
                </audio>
                {/*<Tooltip*/}
                {/*    title={text1}*/}
                {/*    arrow*/}
                {/*    open={isPlaying}*/}
                {/*    theme="grey-tooltip">*/}
                  <Button
                      className="play"
                      type="button"
                      onClick={toggleIsPlaying}
                  >
                    <span className="padder">
                        {isPlaying ? <StopIcon/> : <PlayOutlineIcon/>}
                    </span>
                  </Button>
                {/*</Tooltip>*/}
                {isPlaying ? (
                    <div className="placeholder"/>
                ) : (
                    <>
                      {/*<Tooltip arrow title={text2}>*/}
                        <Button className={"redo" +(disabled ? 'disable' : '')} type="button" onClick={onRerecord} disabled={disabled}>
                          <span className="padder">
                            <RedoIcon/>
                          </span>
                        </Button>
                      {/*</Tooltip>*/}
                    </>
                )}
              </div>
            </div>
          </div>
      );
    } else return ""
  }

  return (
      <div>
        <Grid container justify="center" style={{display:"flex",alignSelf:"center",margin:"auto",width: "100%"}}>
          <div className="button-listen">
            <div className="primary-buttons">
              <canvas className="primary-buttons canvas" ref={canvasRef}
                      style={{width: '10%', position: 'absolute'}}/>
              {renderAudio(audio)}
              <Recorder isRecording={isRecording}
                        setAudio={setAudio}
                        setBlob={setBlob}
                        setIsRecording={setIsRecording}
                        socket={socket}
                        roomID={chatroomID}
                        username={username}
                        disabled={disabled}
                        setDisable={setDisabled}
              />
              <SendButton
                  username={username}
                  audioLink={audioLink}
                  audioName={audioName}
                  audioDuration={duration}
                  audio={audio}
                  blob={blob}
                  sendAudioSignal={sendAudioSignal}
                  userID={user? user._id : ""}
                  roomID={chatroomID}
                  value={value}
                  socket={socket}
                  ssoUserId={ssoUserId}
                  setDisable={setDisabled}
                  disabled={disabled}
              />
            </div>
          </div>
        </Grid>

      </div>
  )
}
