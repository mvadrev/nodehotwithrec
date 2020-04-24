// Imports modules.
const fs = require("fs");
const AudioRecorder = require("node-audiorecorder");

const recorderOptions = {};

let audioRecorder = new AudioRecorder(recorderOptions);

audioRecorder.start();

audioRecorder.stream().on(`error`, function (error) {
  throw error;
});
audioRecorder.on(`close`, function (exitCode) {
  console.log(`Audio stream closed, exit code: '${exitCode}'.`);
  // Stop audio recorder.
  audioRecorder.stop();
});

let stream = fs.createWriteStream(`recording-${new Date().getTime()}.wav`, {
  encoding: `binary`,
});

audioRecorder.stream().pipe(stream);
