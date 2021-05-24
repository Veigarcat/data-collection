import React, {useState, useEffect, useRef} from 'react'
import {Redirect} from 'react-router-dom';
import axios from "axios";
import { OldPlayIcon} from '../../../components/ui/icon';
import ReadyButton from './Section/ReadyButton';
import './LandingPage.css';
import {Button, Grid} from "@material-ui/core";
import RoomList from "./Section/RoomList";
import ConfirmModal from "./Section/ConfirmModal";
import {getCookie} from "../../../utils/cookie";
// let socket
import OpenChatSound from "../Asset/goes-without-saying-608.mp3";

function LandingPage(props) {
  let socket = props.socket;
  let {history} = props;
  const USER_SERVER = `${process.env.REACT_APP_ASR_APP}/api/users`;
  const [roomList, setRoomList] = useState([]);
  const [roomListShown, setRoomListShown] = useState([]);
  const pageSize = 3;
  const [page, setPage] = useState(0);
  let accessToken = getCookie('accessToken')
  const [user, setUser] = useState({});
  const ROOM_SERVER = `${process.env.REACT_APP_ASR_APP}/api/chatroom`;

  if (accessToken !== null) {
    document.cookie = `accessToken=${accessToken}`;
  }

  useEffect(() => {
    const body = {
      "accessToken": accessToken
    }
    axios.post(`${USER_SERVER}/getUser`, body)
      .then(response => {
        const user = response.data.user
        axios.get(`${ROOM_SERVER}`).then((response) => {

          setUser(user)

          response.data.roomFound.map((room) => {
            return (room.key = room._id);
          });
          response.data.roomFound.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          const filter = []
          response.data.roomFound.map((ele) => {


            if (ele.user1 === user._id || ele.user2 === user._id) {
              filter.push(ele)
            }
          })

          setRoomList(filter);
          setRoomListShown(
            filter.slice(page * pageSize, (page + 1) * pageSize),
          );

        });
      });

  }, [])

  const role = useRef("")
  const content_type = useRef("")

  const [inputType, setInputType] = useState("audio")
  const [readyStatus, setReadyStatus] = useState(false)
  // 0 - nothing, 1 - waiting for the other person to accept
  const [promptStatus, setPromptStatus] = useState(0)
  const [promptDuration, setPromptDuration] = useState(10)

  const [matchFound, setMatchFound] = useState(false)
  const [redirect, setRedirect] = useState(false) // redirect is the substitute of history.
  const [roomLink, setRoomLink] = useState('')
  const openChatSound = new Audio(OpenChatSound);


  useEffect(() => {
    if (socket) {
      socket.on('match', ({client, servant, roomType}) => {
        let yourRole = ""
        if (user && client.userID === user._id) yourRole = "client"
        if (user && servant.userID === user._id) yourRole = "servant"
        console.log(`Found match! You are ${yourRole}. Your room type is ${roomType}`)
        role.current = yourRole;
        openChatSound.play();

        content_type.current = roomType;
        setMatchFound(true)
      })
    }
    return () => {
      if (socket) {
        socket.off('match');
      }
    };
  })

  useEffect(() => {
    if (socket) {
      socket.on('prompt successful', ({roomID}) => {
        let link = `asr/chatroom/${content_type.current === "audio" ? 0 : 1}/${roomID}`
        setMatchFound(false)
        setReadyStatus(false)
        setRoomLink(link)
        setRedirect(true)
      })
    }
  })

  useEffect(() => {
    if (socket) {
      // when the other user miss or doesn't accept the second prompt, get back to queueing
      socket.on('requeue', () => {
        setMatchFound(false)
        setPromptStatus(0)
        setPromptDuration(10)
      })
    }
  })

  const readySignal = () => {
    if (socket) {
      setReadyStatus(true)
      let userID = user ? user._id : "";
      let username = user ? user.name : "";
      let socketID = socket.id;

      socket.emit("ready", {
        socketID,
        userID,
        username,
        inputType,
      })
    }
  }

  const cancelReadySignal = () => {
    if (socket) {
      setReadyStatus(false)
      let userID = user ? user._id : "";
      let username = user ? user.name : "";
      let socketID = socket.id;
      socket.emit("cancel ready", {
        socketID,
        userID,
        username,
        inputType,
      })
    }
  }

  // when the user confirm the second prompt, be ready for the conversation to start.
  const handleConfirmPromptModal = () => {
    // socket logic goes here
    let userID = user ? user._id : "";
    let username = user ? user.name : "";
    let socketID = socket.id
    socket.emit("confirm prompt", {
      socketID,
      userID,
      username,
      inputType,
    })
  }

  // when the user denies the prompt or misses the prompt because time runs out.
  const handleDenyPromptModal = () => {
    console.log("Got here!")
    setMatchFound(false)
    setReadyStatus(false)

    let userID = user ? user._id : "";
    let username = user ? user.name : "";
    let socketID = socket.id;
    // socket logic goes here
    socket.emit('cancel prompt', ({
      socketID,
      userID,
      username,
      inputType,
    }))
  }

  return (
    <>
      {
        redirect ? (<Redirect to={roomLink} userRole={role.current}/>) : ""
      }
      <div className="container">
        <div className="box">
          <div className="column-title">
            <h1 style={{fontSize: "48px", fontWeight: "normal"}}>Thu âm</h1>
            <h1 style={{fontSize: "20px", fontWeight: "normal"}}>Chat voice theo kịch bản có sẵn</h1>
            <p className="content-hover">Thu thập giọng nói từ 2 user theo kịch bản thực tế đã được đưa
              ra trước giữa nhân viên ngân hàng và khách hàng.
            </p>
            <a
              href="https://docs.google.com/document/d/10tzuTHFk-rc4q8PvEFvNTjivV4KE-Fhc02kN_62k_f0/edit"
              className="guide"
              target="_blank">Hướng dẫn</a>
          </div>
          <div className="column-cta">
            <ReadyButton
              readyStatus={readyStatus}
              readySignal={readySignal}
              cancelReadySignal={cancelReadySignal}/>
            {/*<div className="primary-button">*/}
            {/*  <button className="record" type="button">*/}
            {/*    <MicIcon/>*/}
            {/*  </button>*/}
            {/*  <div className="primary-button background"/>*/}
            {/*</div>*/}
          </div>
        </div>
        <div className="box1">
          <div className="column-title">
            <h1 style={{fontSize: "48px", fontWeight: "normal"}}>Xác thực</h1>
            <h1 style={{fontSize: "20px", fontWeight: "normal"}}>Kiểm tra lại âm
              thanh đã thu âm</h1>
            <p className="content-hover">Xác thực lại nội dung âm thanh và sửa lại cho đúng nhé
            </p>
            <a
              href="https://docs.google.com/document/d/17UJtZ0XFzAul-RpUvBAZRdkUC_VVZk7sgFJ1oACk3Gc/edit?usp=sharing"
              className="guide">Hướng dẫn</a>
          </div>
          <div className="column-cta">
            <div className="primary-button">
              <Button className="listen" type="button"
                      onClick={() => history.push('/validateData')}>
                <OldPlayIcon/>
              </Button>
              <div className="primary-button backgroundPlay"/>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Grid container>
          <Grid item span={8}></Grid>
          <Grid item style={{textAlign: "center"}}>
            <ConfirmModal
              socket={socket}
              visible={matchFound}
              roomType={content_type.current}
              promptStatus={promptStatus}
              promptDuration={promptDuration}
              setPromptStatus={setPromptStatus}
              handleOk={handleConfirmPromptModal}
              handleCancel={handleDenyPromptModal}/>
          </Grid>
          <Grid span={8}></Grid>
        </Grid>
        {/*<Row style={{marginBottom: "10px", marginTop: "10px"}}>*/}
        {/*  <Col style={{textAlign: "center"}}>*/}
        {/*    <ContentSelection*/}
        {/*        disabled={readyStatus}*/}
        {/*        setInputType={setInputType}/>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<Grid container style={{marginBottom: "10px", marginTop: "10px"}}>*/}
        <div className="room-list-asr">
          <p>**Vì đây là chức năng chat voice nên bạn hãy <b>bật micro</b> trên thiết bị nhé. Nếu quên thì kiểm tra tại <b>chrome://settings/content/microphone</b></p>
          <RoomList pageSize="3"
                    accessToken={accessToken}
                    user={user}
                    roomListShow={roomListShown}
                    roomList={roomList}
                    setRoomListShown={setRoomListShown}
                    setPage={setPage}
                    page={page}
          />
        </div>
        {/*</Grid>*/}
        {/*<Row>*/}
        {/*  <Col style={{textAlign: "center"}}>*/}
        {/*    {readyStatus}*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </div>
    </>
  )
}

export default LandingPage
