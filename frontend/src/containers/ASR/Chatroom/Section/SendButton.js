import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ConfirmForm from "./ConfirmForm";
import Popup from "../../../AudioManage/AudioList/Popup";
import Loading from "../Loading";


export default function SendButton(props) {
  const socket = props.socket;
  const data = props ? props.audio : null;
  const blob = props ? props.blob : null;
  const userID = props ? props.userID : "";
  const roomID = props ? props.roomID : "";
  // const textValue = props ? props.value : "No content";
  const audioName = props ? props.audioName : "test.wav";
  const audioLink = props ? props.audioLink : "";
  const username = props.username;
  const audio_duration = props.audioDuration;
  const ssoUserId = props.ssoUserId;
  const disabled = props.disabled;
  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [loading,setLoading]=useState(false)

  // const uploadAudio = async () => {
  //
  //   console.log(blob)
  //
  //   const file = new File([blob],`${audioName}`,{type:'audio/wav'})
  //   console.log(file)
  //   let formData = new FormData()
  //   formData.append("file",file)
  //   formData.append('userID',userID)
  //   formData.append('roomID',roomID)
  //   formData.append('username',username)
  //   formData.append('duration', audio_duration)
  //
  //
  //   try {
  //     await axios.post(
  //         `${process.env.REACT_APP_ASR_APP}/api/upload/file`,
  //         formData,
  //     ).then(res => {
  //       console.log(res)
  //       props.sendAudioSignal(res.data.link,res.data.transcript,res.data.audioID,res.data.isLike)
  //
  //     })
  //   } catch(error){
  //       alert(error)
  //   }
  // }

  const addOrEdit = async (audio, resetForm) => {
    console.log("audio", audio)
    const matches = username.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu);
    const speaker_id = matches.join('') + ssoUserId;
    const body = {
      userID: userID,
      roomID: roomID,
      username: username,
      duration: audio_duration,
      audio_link: audio.audioLink,
      transcript: audio.transcript,
      speaker_id: speaker_id,
    }
    await axios.post(
      `${process.env.REACT_APP_ASR_APP}/api/upload/fileV3`,
      body,
    ).then(res => {
      setOpenPopup(false)
      // setDisabled(false)
      props.sendAudioSignal(res.data.link, res.data.transcript, res.data.audioID, res.data.isLike)
      setRecordForEdit(null)
      props.setDisable(false)
    })
  }
  const uploadAudio = async () => {

    if (disabled) {
      return;
    }
    props.setDisable(true);
    if(socket){
      socket.emit("Get transcript",{
        roomID,
        username,
      })
    }
    setLoading(true)
    const file = new File([blob], `${audioName}`, {type: 'audio/wav'})
    const destination = `congpt/record/${roomID}`
    let formData = new FormData()
    formData.append('destination', destination);
    formData.append('name', audioName.split(".")[0]);
    formData.append('file', file);
    try {
      await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_UPLOAD_DATA}/api/v1/uploads/file`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + `${process.env.REACT_APP_UPLOAD_AUTH_KEY}`,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }).then(async res => {
        if (res.data.status === 1) {

          const audioLink = res.data.result.link;
          const body = {
            audio_link: audioLink,
          }
          try {
            await axios.post(
              `${process.env.REACT_APP_ASR_APP}/api/upload/transcript`,
              body,
            ).then(res => {
              setOpenPopup(true)
              setRecordForEdit({
                transcript: res.data.transcript,
                audioLink: audioLink
              })
              setLoading(false)
              console.log(res)
              // setDisabled(false)
              // props.sendAudioSignal(res.data.link, res.data.transcript, res.data.audioID, res.data.isLike)
            })
          } catch (e) {
            alert(e)
          }
        } else {
          console.error(res.data.status)
        }
      })
    } catch (e) {
      alert(e)
    }
  }
  const insertButton = data !== null ? (
    <button className="ASR_buttons" onClick={uploadAudio} type="button"
            disabled={disabled}>
      {disabled ? (<Loading loading={loading}/>) : 'Gửi'}
    </button>
  ) : ""

  return (
    <>
      {insertButton}
      <Popup
        title="Xác nhận lại nội dung âm thanh"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ConfirmForm audio={recordForEdit} addOrEdit={addOrEdit}/>
      </Popup>
    </>
  )
}
