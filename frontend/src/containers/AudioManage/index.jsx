import React, {useState, useEffect} from 'react';

import AudioManageStyle from './audioManager.style';
import {Paper, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import AudioList from './AudioList'
import axios from "axios";


export default function AudioManage() {
  const {t} = useTranslation();
  const [audioList, setAudioList] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_ASR_APP}/api/audio`).then(result=>{
      const audios = result.data;
      const dataArr = Object.keys(audios).map((key) => audios[key]);
      console.log(dataArr)
      setAudioList(dataArr)
    })
  }, [])

  return (
    <AudioManageStyle>
      <Paper className="audio-manage-container">
        <div className="header">
          <Typography gutterBottom variant="h4" className="title-page">
            {t('audioManage')}
          </Typography>
        </div>


        <div className="campaign-list">
          <AudioList
            setListAudio={setAudioList}
            listAudio={audioList}
          />
        </div>
      </Paper>
    </AudioManageStyle>
  );
}
