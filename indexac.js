// Imports module.
const HotwordDetector = require("node-hotworddetector");
const AudioRecorder = require("node-audiorecorder");
const fs = require("fs");

// Recorder default options
const recorderOptions = {};

// Init recorder
let audioRecorder = new AudioRecorder(recorderOptions);

// Options hotword detector.
const detectorData = {
  resource: `./node_modules/snowboy/resources/common.res`,
};
const modelData = [
  {
    file: `./resources/models/Swaasa.pmdl`,
    hotwords: `snowboy`,
    sensitivity: 0.5,
  },
];
const recorderData = {
  audioGain: 2,
};

// Initialize detector.
const hotwordDetector = new HotwordDetector(
  detectorData,
  modelData,
  recorderData,
  console
);
// Triggered when an error is encountered.
hotwordDetector.on(`error`, function (error) {
  throw error;
});
// Triggered when a hotword has been detected.const express = require("express");

hotwordDetector.on(`hotword`, function (index, hotword, buffer) {
  // Index is the associated index of the detected hotword.
  // Hotword is a string of which word has been detected.
  // Buffer is the most recent section from the audio buffer.
  console.log("Hello Zensark! Please record your message after the beep");
  console.log("Recording..");
  // Start recording
  audioRecorder.start();

  setTimeout(function () {
    audioRecorder.stop();
    console.log("Stopping recording.. Record sample now");
  }, 5000);

  // What?
  let stream = fs.createWriteStream(`recording-${new Date().getTime()}.wav`, {
    encoding: `binary`,
  });

  console.log("Writing file! Recording saved!");

  audioRecorder.stream().pipe(stream);

  // Stop detecting.
  //   hotwordDetector.stop();

  //   // Exit the program, perhaps here you want to re-enable the hotword detector again.
  //   process.exit(1);
});
// Triggered when there is no audible sound being recorded.
hotwordDetector.on(`silence`, function () {
  console.log(`Silence...`);
});

// Start recording and detecting.
hotwordDetector.start();
