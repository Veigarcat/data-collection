import React, { useState, useEffect } from 'react';
import {
  Typography,
  // Grid,
  // RadioGroup,
  // Radio,
  // FormControlLabel,
} from '@material-ui/core';
import axios from 'axios';
import './Admin.css';

export default function Admin() {
  const [serverStatistic, setServerStatistic] = useState({
    roomDoneCount: 0,
    roomNotDoneCount: 0,
    audioCount: 0,
    intentCount: [],
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SLU_BACKEND_DOMAIN}/api/server/statistic`)
      .then((response) => {
        const {
          roomDoneCount,
          roomNotDoneCount,
          audioCount,
          intentCount,
        } = response.data;
        // eslint-disable-next-line
        let tempServerStat = {};
        tempServerStat.roomDoneCount = roomDoneCount;
        tempServerStat.roomNotDoneCount = roomNotDoneCount;
        tempServerStat.audioCount = audioCount;
        tempServerStat.intentCount = [];
        Object.keys(intentCount).forEach((property) => {
          tempServerStat.intentCount.push({
            name: property,
            count: intentCount[property],
          });
        });
        setServerStatistic(tempServerStat);
      });
  }, []);
  return (
    <div className="SLU-report-container">
      <Typography
        gutterBottom
        variant="h4"
        component="h4"
        className="SLU-title-report"
      >
        SLU
        {serverStatistic.roomDoneCount}
      </Typography>
    </div>
  );
}
