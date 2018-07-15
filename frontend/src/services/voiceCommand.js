const fs = require('fs');
var req = require('request');
const record = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const Storage = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename: '/Users/minhhoang/AWS/MachineLearning.json'
});
// Creates a client
const client = new speech.SpeechClient({
  keyFilename: '/Users/minhhoang/AWS/MachineLearning.json'
});
const URL = 'http://192.168.33.159/api';
/*
const sendMessage = body => {
  console.log('send message', body);
  return fetch(`${URL}/question`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};
*/
const sendMessage = msg => {
  req(
    {
      uri: 'http://192.168.33.159:5000/api/question',
      method: 'POST',
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10,
      body: JSON.stringify({
        root: [],
        list_message: [],
        message: msg
      })
    },
    function(error, response, body) {
      console.log(body);
    }
  );
};
/*
const sendMessage = body => {
  req(
    {
      uri: `${URL}/question/greeting`,
      method: 'GET'
      //body: JSON.stringify(body)
    },
    function(error, response, body) {
      console.log(error);
      console.log(body);
      console.log(response);
    }
  );
};
*/

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const filename = 'Local path to audio file, e.g. /path/to/audio.raw';
// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
// const sampleRateHertz = 16000;
// const languageCode = 'BCP-47 language code, e.g. en-US';

const request = {
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    enableAutomaticPunctuation: true,
    languageCode: 'vi-VN',
    model: 'default'
  },
  interimResults: false // If you want interim results, set this to true
};

const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', data => {
    process.stdout.write(
      data.results[0] && data.results[0].alternatives[0]
        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        : `\n\nReached transcription time limit, press Ctrl+C\n`
    );
    sendMessage(data.results[0].alternatives[0].transcript);
  });

// Start recording and send the microphone input to the Speech API
record
  .start({
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    enableAutomaticPunctuation: true,
    languageCode: 'vi-VN',
    model: 'default',
    threshold: 0.2,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '30.0'
  })
  .on('error', console.error)
  .pipe(recognizeStream);
sendMessage('asbx');
setTimeout(() => {
  console.log('Stop record.');
  record.stop();
}, 5000);
