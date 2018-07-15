const fs = require('fs');
const record = require('node-record-lpcm16');
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const Storage = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: '/Users/minhhoang/AWS/MachineLearning.json'
});
// Creates a client
const client = new speech.SpeechClient({
  keyFilename: '/Users/minhhoang/AWS/MachineLearning.json'
});

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
  interimResults: true // If you want interim results, set this to true
};

const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', data =>
    process.stdout.write(
      data.results[0] && data.results[0].alternatives[0]
        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        : `\n\nReached transcription time limit, press Ctrl+C\n`
    )
  );

// Start recording and send the microphone input to the Speech API
record
  .start({
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    enableAutomaticPunctuation: true,
    languageCode: 'vi-VN',
    model: 'default',
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '10.0'
  })
  .on('error', console.error)
  .pipe(recognizeStream);

setTimeout(() => {
  console.log('Stop record.');
  record.stop();
}, 5000);
