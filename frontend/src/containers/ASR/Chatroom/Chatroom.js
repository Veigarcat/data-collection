import React, {useState, useEffect, useRef} from 'react';
import './Section/RecordButton.css';
import './Chatroom.css'
import Scenario from './Section/Scenario';
import Snackbar from '@material-ui/core/Snackbar';
import AudioRecordingScreen from "./Section/Sub-container/AudioRecordingScreen";
import ChatCard from "./Section/Sub-container/ChatCard";
import axios from "axios";
import {ThumbDown, ThumbUp} from "@material-ui/icons";
import NewMessage from "../Asset/to-the-point-568.mp3";
import LoadingDots from "./Section/LoadingDots";


// let socket
export default function Chatroom(props) {
  const canvasRef = useRef(null);
  let socket = props ? props.socket : null;
  const room_content_type = window.location.href.split("/")[5]
  const chatroomID = window.location.href.split("/")[6].split("?")[0]
  // const user = useSelector(state => state.user);
  const [userRole, setUserRole] = useState("");
  const [audioHistory, setAudioHistory] = useState(([]))
  // const dispatch = useDispatch();
  const [message, setMessage] = useState('')
  const [joinLeave, setJointLeave] = useState('')

  const [user, setUser] = useState(null);
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const divRef = useRef(null);
  let userID = user ? user._id : "";
  let username = user ? user.name : "";
  let ssoUserId = user ? user.ssoUserId : "";
  const USER_SERVER = `${process.env.REACT_APP_ASR_APP}/api/users`;
  const [scenario, setScenario] = useState([]);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const {vertical, horizontal, open} = state;
  const newMessage = new Audio(NewMessage);
  const [sendLoading, setSendLoading] = useState(false)
  useEffect(() => {
    let cookieAccessToken;

    document.cookie.split(";").map(info => {
      info = info.replace(" ", "")
      if (info.slice(0, "accessToken=".length) === "accessToken=") {
        cookieAccessToken = info.substring("accessToken=".length);
        return document.cookie.substring("accessToken=".length);
      } else {
        return null;
      }
    })
    const body = {
      "accessToken": cookieAccessToken
    }
    axios.post(`${USER_SERVER}/getUser`, body)
      .then(response => {
        const user = response.data.user
        axios.get(`${process.env.REACT_APP_ASR_APP}/api/chatroom/${chatroomID}`)
          .then(async (response) => {
            setUser(user)
            const userID = user._id
            if (userID === response.data.roomFound.user1) setUserRole("client");
            if (userID === response.data.roomFound.user2) setUserRole("servant");
            const audios = response.data.roomFound.audioList;
            const scenario = response.data.roomFound.intent;
            let tempScenario = [];
            for (const property in scenario) {
              if (property !== '_id' && property !== '__v' && scenario[property] !== null) {
                tempScenario.push([
                  property,
                  (property === 'floor' ? 'Tầng ' + scenario[property] : scenario[property]),
                  scenario[property],
                ])
              }
            }
            setScenario(tempScenario);
            let tempAudioList = [];
            audios.map(audio => {
              const audio_obj = {
                userID: audio.user._id,
                sender: audio.username,
                audioLink: audio.audioLink,
                transcript: audio.transcript,
                audioID: audio._id,
                isLike: audio.isLike,
              }
              return tempAudioList.push(audio_obj);
            })
            setAudioHistory(tempAudioList);

          })
      });
  }, [chatroomID])


  // useEffect(() => {
  //   divRef.current.scrollIntoView({behavior: 'smooth'});
  // });

  const handleClose = () => {
    setState({...state, open: false});
  };
  useEffect(() => {
    if (socket && user !== null) {
      socket.emit("joinRoom", {
        chatroomID,
        username,
      });
    }

    return () => {
      if (socket && user !== null) {
        socket.emit("leaveRoom", {
          chatroomID,
          username,
        });
      }
    };
  }, [socket, chatroomID, username])

  useEffect(() => {
    if (socket) {
      socket.on('newAudioURL', (data) => {
        newMessage.play()
        // console.log(`Receive signal from ${data.userID} with the ID of ${data.userID}. Here's the link: ${data.audioLink}`)
        let newHistory = [...audioHistory]
        newHistory.push(data)
        setAudioHistory(newHistory);
        setMessage("")
        setSendLoading(false)
      })
    }
    return () => {
      if (socket) {
        socket.off('newAudioURL');
      }
    };
  })
  useEffect(() => {
    if (socket) {
      socket.on('joinRoom announce', (data) => {
        if (user !== null) {
          if (data.username !== user.name) {
            setJointLeave(`${data.username} đã vào phòng chat`)
            setState({open: true});
          }
        }

      })

      socket.on('leaveRoom announce', (data) => {
        if (user !== null) {
          if (data.username !== user.name) {
            setJointLeave(`${data.username} đã rời khỏi phòng chat`)
            setState({open: true});
          }
        }

      })
    }
    return () => {
      if (socket) {
        socket.off('joinRoom announce');
        socket.off('leaveRoom announce');
      }
    };
  })
  useEffect(() => {
    if (socket) {
      socket.on('change transcript', ({username, transcript, index}) => {
        setAudioHistory(audioHistory.map((item, id) => {
          if (id === index) return {...item, transcript, fixBy: username};
          return item;
        }));

      })
    }
  }, [audioHistory, socket])

  useEffect(() => {
    if (socket) {
      socket.on('change like state', ({username, isLike, index}) => {
        setAudioHistory(audioHistory.map((item, id) => {
          if (id === index) return {...item, isLike, fixBy: username};
          return item;
        }));

      })
    }
  }, [audioHistory, socket])

  useEffect(() => {
    if (socket) {
      socket.on('user recording', ({username}) => {
        if (user !== null) {
          if (username !== user.name) {
            setMessage(`${username} đang thu âm`);
            setState({open: true});
          }
        }

      });

      socket.on('user done recording', ({username}) => {
        if (user !== null) {
          if (username !== user.name) {
            setMessage(`${username} đã thu âm xong chuẩn bị gửi`);
          }
        }
      });
      socket.on('getting transcript', ({username}) => {
        if (user !== null) {
          if (username !== user.name) {
            setMessage(`${username} đang gửi tin nhắn`)
            setSendLoading(true);
          }
        }
      })

      socket.on('123', ({username}) => {
        console.log("123")
        setMessage(`${username} đang thu âm lại`)
      })
    }

    return () => {
      if (socket) {
        socket.off('user recording');
        socket.off('user done recording');
        socket.off('getting transcript');
      }
    };
  },);

  // const handleClose = () => {
  //   setState({...state, open: false});
  // };
  return (
    <div className="contribution">
      <div className="chatroom">
        <section className="left-screen">
          <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={open}
            onClose={handleClose}
            message={joinLeave}
            key={vertical + horizontal}
          />
          <div className="instruction">
            {
              message !== '' ? (
                message
              ) : (
                <>
                  Nhấp &nbsp;<ThumbUp fontSize="small"/>&nbsp; xác nhận nội dung đúng/
                  Nhấp  &nbsp;<ThumbDown fontSize="small"/>  &nbsp; sửa lại nội dung
                </>

              )
            }
          </div>

          <div className="infinite-container">
            <section className="audioHistory">
              <div className="messages">
                {audioHistory.map((message, i) =>
                  <ChatCard
                    key={i}
                    name={username}
                    listAudio={audioHistory}
                    setListAudio={setAudioHistory}
                    index={i}
                    socket={socket}
                    chatroomID={chatroomID}
                  />
                )}
                {
                  sendLoading ? (
                    <div className="messageContainer justifyStart" id="c">
                      <div className="message-area">
                        <div className="text-username">
                          <div className="audio-text">
                            <div className="text-checkButton">
                              <div
                                className="messageBox backgroundBlue-loading">
                                <LoadingDots/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>) : ""
                }

              </div>
            </section>
            {/*<div*/}
            {/*    ref={divRef}*/}
            {/*    style={{float: "left"}}/>*/}
          </div>
          <AudioRecordingScreen
            audioName={`vi${chatroomID}_${userID}_${Date.now()}.wav`}
            canvasRef={canvasRef}
            username={username}
            socket={socket}
            user={user}
            roomContentType={room_content_type}
            chatroomID={chatroomID}
            userRole={userRole}
            userID={userID}
            ssoUserId={ssoUserId}
          />
        </section>
        <section className="right-screen">
          <Scenario scenario={scenario} user_role={userRole}/>
          <hr className="hr1"/>
        </section>
      </div>
    </div>

  )
}
