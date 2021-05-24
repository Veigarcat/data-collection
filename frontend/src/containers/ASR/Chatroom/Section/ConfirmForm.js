import React, {useEffect, useRef, useState} from 'react'
import {Grid, IconButton,} from '@material-ui/core';
import Controls from "../../../AudioManage/AudioList/controls/Controls";
import {useForm, Form} from '../../../AudioManage/AudioList/useForm';
import {PlayOutlineIcon, StopIcon} from "../../../../components/ui/icon";

const initialFValues = {}
export default function AudioForm({addOrEdit, audio}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const {
    values,
    setValues,
    handleInputChange,
    resetForm
  } = useForm(initialFValues);

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
  const handleSubmit = e => {
    e.preventDefault()
    addOrEdit(values, resetForm);
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
  useEffect(() => {
    if (audio != null)
      setValues({
        ...audio
      })
  }, [audio])
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.TextArea
            name="transcript"
            label="Nội dung"
            value={values.transcript}
            onChange={handleInputChange}
          />
          <audio
            src={values.audioLink}
            preload="auto"
            onEnded={toggleIsPlaying}
            ref={audioRef}
          />

        </Grid>
        <Grid item xs={6}>
          <div>
            <IconButton
              className="play"
              type="button"
              onClick={toggleIsPlaying}>
                <span className="padder">
                            {isPlaying ? <StopIcon/> : <PlayOutlineIcon/>}
                </span>
            </IconButton>
            <Controls.Button
              type="submit"
              text="Xác nhận"/>
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}
