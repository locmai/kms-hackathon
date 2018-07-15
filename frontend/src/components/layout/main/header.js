import React from 'react';
// import Speech from 'react-speech';
import { sendAudioFile } from '../../../services/homeApi';
export default class Header extends React.Component {
  state = {};
  constructor() {
    super();
    this.recordAudio = this.initRecordAudio().bind(this);
    this.startRecordVoice = this.startRecordVoice.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
  }

  initRecordAudio() {
    return () =>
      new Promise(async resolve => {
        const constraints = {
          audio: { sampleRate: 16000 }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', event => {
          audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = () =>
          new Promise(resolve => {
            mediaRecorder.addEventListener('stop', () => {
              const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
              console.log(audioBlob);
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              const play = () => audio.play();
              resolve({ audioBlob, audioUrl, play });
            });

            mediaRecorder.stop();
          });

        resolve({ start, stop });
      });
  }

  startRecordVoice() {
    (async () => {
      this.recorder = await this.recordAudio();

      this.recorder.start();
    })();
  }

  stopRecord() {
    (async () => {
      this.recorder.stop().then((audioBlob, audioUrl, play) => {
        console.log(audioBlob);
        audioBlob.play();
        sendAudioFile(audioBlob);
      });
      //audio.play();
    })();
  }
  getSpeechToText() {}
  render() {
    return <div className="header">Chat xàm có việc làm</div>;
  }
}
