import React, {useEffect, useRef, useState} from 'react';
import './ValidateData.css';
import {
  ThumbsDownIcon,
  OldPlayIcon,
  StopIcon,
  ThumbsUpIcon,
  SkipIcon,
  VolumeIcon
} from "../../../components/ui/icon";

import Wave from '../../ASR/Chatroom/Section/Wave';
import {useDispatch} from "react-redux";
// import {getAllAudio} from '../../../_actions/audio_actions'
import axios from "axios";
import Popup from "../../AudioManage/AudioList/Popup";
import AudioForm from "./AudioForm";
import {getCookie} from "../../../utils/cookie";
import {
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, useMediaQuery, useTheme
} from "@material-ui/core";
import Button from "../../AudioManage/AudioList/controls/Button";
import Controls from "../../AudioManage/AudioList/controls/Controls";


export default function ValidateData() {
  const [value, setValue] = useState('');
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState('');
  const [hasPlayed, setHasPlayed] = useState(false);
  const [editText, setEditText] = useState(false);
  const [clips, setClips] = useState([]);
  const [allowedState, setAllowState] = useState([5])
  const [open, setOpen] = useState(false);
  const USER_SERVER = `${process.env.REACT_APP_ASR_APP}/api/users`;
  let search = window.location.search;
  // const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [user, setUser] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [audioValidate, setAudioValidate] = useState(0)

  useEffect(() => {
    // let cookieAccessToken;
    //
    // document.cookie.split(";").map(info => {
    //   info = info.replace(" ", "")
    //   if (info.slice(0, "accessToken=".length) === "accessToken=") {
    //     cookieAccessToken = info.substring("accessToken=".length);
    //     return document.cookie.substring("accessToken=".length);
    //   } else {
    //     return null;
    //   }
    // })
    const cookieAccessToken = getCookie('accessToken')
    console.log(cookieAccessToken)
    const body = {
      "accessToken": cookieAccessToken
    }
    axios.post(`${USER_SERVER}/getUser`, body)
      .then(response => {
        const user = response.data.user
        const userID = user._id
        setUser(user)
        axios.get(`${process.env.REACT_APP_ASR_APP}/api/audio/`)
          .then(result => {
            const audios = result.data;
            const audioFilter = []
            audios.map(ele => {
              // console.log(ele.up_vote)
              if (ele.up_vote.length !== 0 || ele.up_vote.length>3) {
                ele.up_vote.map(e => {

                  if (e.user !== user._id) {
                    audioFilter.push(ele)
                  }
                })
              } else if (ele.down_vote.length !== 0) {
                ele.down_vote.map(e => {
                  if (e.user !== user._id) {
                    audioFilter.push(ele)
                  }
                })
              } else {
                audioFilter.push(ele)
              }
            })
            setClips(audioFilter)
            setSelectedIndex(0)
          })
          .then(res => {
            axios.get(`${process.env.REACT_APP_ASR_APP}/api/validate/${userID}`)
              .then(res => {
                console.log(res.data)
                if (res.data.up_vote && res.data.up_vote.length){
                  const countAudio = res.data.up_vote.length + res.data.down_vote.length
                  setAudioValidate(countAudio)
                }
              })
          })
      });
  }, [])


  // useEffect(() => {
  //   // dispatch(getAllAudio()).then(result => {
  //   axios.get(`${process.env.REACT_APP_ASR_APP}/api/audio/`).then(result=>{
  //     const audios = result.data;
  //
  //     const audioFilter = []
  //     audios.map(ele=>{
  //       // console.log(ele.up_vote)
  //       if(ele.up_vote.length!==0){
  //         ele.up_vote.map(e=>{
  //           // console.log(e.user)
  //           console.log(user)
  //           // if(!user){
  //           //   if(e.user !== user._id){
  //           //     audioFilter.push(ele)
  //           //   }
  //           // }
  //
  //         })
  //       }else{
  //         audioFilter.push(ele)
  //       }
  //     })
  //   setClips(audioFilter)
  //   setSelectedIndex(0)
  // })
  //
  // }, [])

  useEffect(() => {
    const activeAudio = clips[selectedIndex]
    if (activeAudio && activeAudio.down_vote.length > 2) {
      setValue(activeAudio && activeAudio.final_transcript)
    } else {
      setValue(activeAudio && activeAudio.bot_transcript)
    }
    setAudio(activeAudio && activeAudio.audioLink)
    // setAudio(clips[selectedIndex] && clips[selectedIndex].audioLink);

  })
  const _ToggleNext = () => {
    if (selectedIndex === clips.length - 1) {
      handleClickOpen();
      return;
    }
    stop();
    setHasPlayed(false)
    setEditText(false)
    setSelectedIndex(selectedIndex + 1);
  }

  const play = () => {
    const {current: audio} = audioRef;
    if (isPlaying) {
      stop()
      return;
    }
    audio.play()
    setIsPlaying(true)
  }
  const stop = () => {
    const {current: audio} = audioRef;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false)
  }
  const hasPlayed1 = () => {
    setHasPlayed(true)
    setIsPlaying(false)
  }
  const voteYes = async (object) => {
    if (!hasPlayed) {
      return;
    }
    let body = {
      userID: clips[selectedIndex].user,
      audioID: clips[selectedIndex]._id,
      transcript: clips[selectedIndex].bot_transcript,
      upVoteTime: new Date()
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_ASR_APP}/api/validate`, body
      ).then(res => {
        // console.log(res)
        // setOpen(false)
        const count = audioValidate + 1
        setAudioValidate(count)
        // voteYes(clips[selectedIndex])
        // console.log(object)
        // let newHistory = [...allowedState]
        // newHistory.push(object)
        // setAllowState(newHistory);
        _ToggleNext()
      })
    } catch (error) {
      alert(error)
    }
    // console.log(object)
    // let newHistory = [...allowedState]
    // newHistory.push(object)
    // setAllowState(newHistory);
    // _ToggleNext()
  };

  useEffect(() => {
    const canvasObj = canvasRef.current;
    let wave = new Wave(canvasObj);
    wave.idle();
    if (wave) {
      isPlaying ? wave.play() : wave.idle();
    }
    return () => {
      if (wave) {
        wave.idle();
      }
    }
  });

  const addOrEdit = async (audio, resetForm) => {
    let body = {
      userID: user._id,
      audioID: audio._id,
      transcript: audio.transcript,
      downVoteTime: new Date()
    }
    // console.log(body)
    try {
      await axios.post(
        `${process.env.REACT_APP_ASR_APP}/api/validate/update`,
        body,
      ).then(res => {
        // console.log(res)
        // setOpen(false)
        setRecordForEdit(null)
        setOpenPopup(false)
        // voteYes(clips[selectedIndex])
        const count = audioValidate + 1
        setAudioValidate(count)
        _ToggleNext()
      })
    } catch (error) {
      alert(error)
    }


    // setRecords(employeeService.getAllEmployees())
  }
  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="contribution">
      <div className="contribution-wrapper">
        <div className="cards-pill">
          <div className="personal">
            <div className="goal-box">
              <div className="goal">{audioValidate}</div>
              <hr className="hr2"/>
              <div className="unit">Đã xác thực được</div>
              <div className="date">{new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              }).format(new Date())}</div>
            </div>
          </div>
          <div className="cards-and-instruction">
            <div className="cards">
              <div className="card-dimension">
                {value}
                {/*</dv>*/}
              </div>
              {/*<div className="text-card">*/}
              {/*  */}
              {/*</div>*/}
            </div>
            {/*<div className="card-dimension">*/}
            {/*  {value}*/}
            {/*</div>*/}

            <div className="button-footer">
              <button className="skip" type="butto  n" onClick={_ToggleNext}>
                <span style={{marginRight: "15px"}}>Skip</span>
                <SkipIcon/>
              </button>
            </div>
            <div className="button-listen">
              <div className="primary-buttons">
                <canvas className="primary-buttons canvas" ref={canvasRef}
                        style={{
                          width: '100%',
                          position: 'absolute',
                          maxWidth: 'calc(1400px - 40px)'
                        }}/>
                <button className={"vote-button " + (hasPlayed ? 'yes' : '')}
                        onClick={() => voteYes(clips[selectedIndex])}
                        type="button">
                  {/*disabled={!hasPlayed}>*/}
                  <ThumbsUpIcon/>
                  <span style={{marginLeft: "10px"}}>Yes</span>
                </button>
                <div className="button-listen">
                  <div className="primary-button">
                    <audio
                      src={audio}
                      preload="auto"
                      onEnded={hasPlayed1}
                      ref={audioRef}
                    />
                    <button className="listen" onClick={play} type="button">
                      {isPlaying ? <StopIcon/> : <OldPlayIcon/>}
                    </button>
                    <div className="primary-button backgroundPlay-asr"/>
                  </div>
                </div>
                <button className={"vote-button " + (hasPlayed ? 'no' : '')}
                        type="button" onClick={() => {
                  openInPopup(clips[selectedIndex])
                }}>
                  {/*disabled={!hasPlayed}>*/}
                  <ThumbsDownIcon/>
                  <span style={{marginLeft: "10px"}}>No</span>
                </button>
              </div>
            </div>
          </div>

          <div className="voted-list">
            {allowedState.map((message, i) =>
              <div key={i}>
                <div className="pill active">
                  <div className="contents">
                    <VolumeIcon/>
                  </div>
                  <div className="num">{i + 1}</div>
                </div>
                {/*<div className="pill done">*/}
                {/*  <div className="contents">*/}
                {/*    <CheckIcon/>*/}
                {/*  </div>*/}
                {/*  <div className="num">{i+1}</div>*/}
                {/*</div>*/}
                {/*<div className="pill pending">*/}
                {/*  <div className="contents"/>*/}
                {/*  <div className="num">{i}</div>*/}
                {/*</div>*/}
              </div>
            )}
          </div>
        </div>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Thông báo"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn đã xác thực hết audio
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Controls.Button
              type="submit"
              text="Quay lại trang chủ" onClick={handleClose}/>

          </DialogActions>
        </Dialog>
      </div>
      <Popup
        title="Chỉnh sửa nội dung"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AudioForm audio={recordForEdit} addOrEdit={addOrEdit}/>
      </Popup>
    </div>

  )
}
