import React, {useEffect, useState} from 'react'

import './CountdownTimer/CountdownTimer.css'
import CountdownTimer from './CountdownTimer/CountdownTimer'
import {makeStyles} from '@material-ui/core/styles';
import {Button, Divider, Modal} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: '1px solid #dedede',
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function ConfirmModal(props) {

  let socket = props.socket;
  const classes = useStyles();
  const [ buttonState, setButtonState ] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on('wait for other prompt', () => {
        props.setPromptStatus(1)
      })
    }
  })
  const handleOk = () => {
    if (!buttonState) {
      setButtonState(true);
      console.log("ok")
      props.handleOk();
      setButtonState(false);
    }
  }
  return (
    <>
      {
        props.promptStatus === 0 ? (
          <Modal
            disableBackdropClick={true}
            open={props ? props.visible : false}>
            <div className={classes.paper}>
              <p className="textP">Đã tìm được người phù hợp!</p>
              <CountdownTimer
                handleTimeout={props.handleCancel}
                key={props.visible}
                isPlaying={props.visible}
                duration={props.promptDuration}/>
                <Divider style={{ marginTop: "10px", marginBottom: "10px" }}/>
              <div style={{float: "right"}}>
                <Button variant="contained" color="secondary" onClick={props.handleCancel}>Từ chối</Button>
                {
                  buttonState ? (
                    <Button variant="contained" style={{marginLeft: "10px", backgroundColor: "#90caf9", color: "#585D5E"}} disabled>Bắt đầu</Button>
                  ) : (
                    <Button variant="contained" style={{marginLeft: "10px", backgroundColor: "#90caf9", color: "#585D5E"}} onClick={handleOk}>Bắt đầu</Button>
                  )
                }
              </div>
            </div>
          </Modal>
        ) : (
          <Modal open={props.visible} disableBackdropClick={true}>
            <div className={classes.paper}>
              <h2>Phòng {props.roomType}</h2>
              <p>Đang chờ người còn lại...</p>
            </div>
          </Modal>
        )
      }

    </>

  )
}
