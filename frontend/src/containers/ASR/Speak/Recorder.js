import React, {Component} from 'react';
import RecorderJS from 'recorder-js';

import {getAudioStream, exportBuffer} from './audio';
import {MicIcon, StopIcon} from "../../../components/ui/icon";
import Button from "@material-ui/core/Button";

class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      // recording: false,
      recorder: null
    };
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
  }

  async componentDidMount() {
    let stream;

    try {
      stream = await getAudioStream();
    } catch (error) {
      // Users browser doesn't support audio.
      // Add your handler here.
      console.log(error);
    }

    this.setState({stream});
  }

  startRecord() {
    const {stream} = this.state;
    const roomID = this.props.roomID;
    const socket = this.props.socket;
    const username = this.props.username;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const recorder = new RecorderJS(audioContext);
    recorder.init(stream);
    this.props.setIsRecording(true)
    this.setState(
      {
        recorder,
        // recording: true
      },
      () => {
        recorder.start();
      }
    );
    if (socket) {
      socket.emit('Recording', {
        roomID,
        username
      });
    }
  }

  async stopRecord() {
    const {recorder} = this.state;
    const roomID = this.props.roomID;
    const socket = this.props.socket;
    const username = this.props.username;
    const {buffer} = await recorder.stop()
    const audio = exportBuffer(buffer[0]);
    const url = window.URL.createObjectURL(audio)
    // Process the audio here.
    this.props.setIsRecording(false)
    this.props.setBlob(audio)
    this.props.setAudio(url)
    this.setState({disableRecording: true});
    if (socket) {
      socket.emit('Done Recording', {
        roomID,
        username
      });
    }
  }

  render() {
    const {stream} = this.state;

    // Don't show record button if their browser doesn't support it.
    if (!stream) {
      return null;
    }

    return (
      <div className="button-listen">
        <div className="primary-button">
          <Button className={"record" + (this.props.disabled ? 'disable' : '')}
                  type="button" disabled={this.props.disabled}
                  onClick={() => {
                    this.props.isRecording ? this.stopRecord() : this.startRecord();
                  }}
          >
            {this.props.isRecording ? <StopIcon/> : <MicIcon/>}
          </Button>
          <div className="primary-button background"/>
        </div>
      </div>

    );
  }
}

export default Recorder;
