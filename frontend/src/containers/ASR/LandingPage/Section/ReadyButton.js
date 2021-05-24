import React, { useState, useRef, useEffect } from 'react'
import {StopIcon,MicIcon} from '../../../../components/ui/icon';
import {Button, Grid} from "@material-ui/core";
export default function ReadyButton(props) {

  const [ timer, setTimer ] = useState(0)
  const increment = useRef(null)

  useEffect(() => {
    // seems redundant but need it. So when the user denies their second queue confirmation, we'll reset the timer.
    if (!props.readyStatus) {
      clearInterval(increment.current);
      setTimer(0);
    }
  }, [ props.readyStatus ])

  const ready = () => {
    props.readySignal()
    // start counting
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const cancelReady = () => {
    props.cancelReadySignal()
    // stop counting
    clearInterval(increment.current);
    setTimer(0);
  }

  const timeConverter = (seconds) => {
    const format = val => `0${Math.floor(val)}`.slice(-2)
    const hours = seconds / 3600
    const minutes = (seconds % 3600) / 60

    return [hours, minutes, seconds % 60].map(format).join(':')
  }

  return (
    <>
      <div className="primary-button">
        {!props.readyStatus ?
            <Button onClick={ready} className="record" type="button">
              <MicIcon/>
            </Button> :
            <Button onClick={cancelReady} className="record" type="button">
              <StopIcon/>
            </Button>
        }
        <div className="primary-button background"/>
      </div>
      {
        props.readyStatus ? (
          <Grid container>
            <Grid item>
              Đang tìm bạn: {timeConverter(timer)}
            </Grid>
          </Grid>
        ) : ""
      }

    </>
  )
}
