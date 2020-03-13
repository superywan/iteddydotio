// npm packages
var randomWords = require("random-words");

//DOM
const givenTxt = document.getElementById("givenTxt");
const userInput = document.getElementById("userInput");

//Word Maker (100 words)
const wordList = randomWords({ exactly: 300, maxLength: 4 });
//Timer Variables
let count = 30;
let didTimeEnd = false;
let didPracticeStart = false;
let wpm = 0;
//Correct
let counter = 0;
let correctCounter = 0;
let i = 0;

// Type Writer
function typeWriter() {
  correctChecker();
  // Empty the txtarea and move on to the next word.
  userInput.value = "";
  givenTxt.innerHTML = wordList[i];
  i++;
  counter += 1;
}

// Correct Checker
function correctChecker() {
  // Check User typed correctly..
  if (givenTxt.innerText === userInput.value) {
    if (counter != 0) {
      // Correct! and add 1 to correct counter.
      console.log("Correct!");
      correctCounter++;
      console.log(correctCounter);
    }
  } else {
    // You Suck!
    console.log("You suck!");
  }
}

// Timer
let timer = setInterval(() => {
  if (didPracticeStart === true) {
    document.getElementById("count").innerHTML = count;
    count--;
    if (count === 0) {
      clearInterval(timer);
      didTimeEnd = true;
    }
  }
}, 1000);

// When User Pressed Enter, Run this.
userInput.addEventListener("keydown", function(e) {
  //checks whether the pressed key is "Enter"
  if (e.keyCode === 13) {
    didPracticeStart = true;
    if (didTimeEnd) {
      console.log("didTimeEnd: " + didTimeEnd);
      document.getElementById("count").innerHTML = "Done";
      correctChecker();
      wpm = correctCounter * 2;
      document.getElementById("result").innerHTML = wpm;
      return;
    }
    typeWriter();
  }
});
