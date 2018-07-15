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
const URL = 'http://192.168.33.159:5000/api/question';
const sendMessage = msg => {
  req(
    {
      uri: URL,
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
      console.log(body && body.toString('utf8'));
    }
  );
};
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
    const speechResult = data.results;
    console.log('Speech', data);
    for (let item of speechResult) {
      const alternatives = item.alternatives;
      console.log(alternatives);
    }
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
    sampleRateHertz: 44100,
    enableAutomaticPunctuation: true,
    languageCode: 'vi-VN',
    model: 'default',
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '3.0'
  })
  .on('error', console.error)
  .pipe(recognizeStream);
sendMessage('asbx');
setTimeout(() => {
  console.log('Stop record.');
  record.stop();
}, 5000);
