// init speachSynthesis
const synth = window.speechSynthesis;

// get DOM with document.querySelector
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

let isFirefox = typeof InstallTrigger !== "undefined";

let isChrome = !!window.chrome && !!window.chrome.webstore;

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  console.log(voices);
  voices.forEach((voice) => {
    // create option element
    const option = document.createElement("option");
    option.textContent = voice.name + `(${voice.lang})`;

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);

    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

const speak = () => {

    // add img



  if (synth.speaking) {
    console.log("Already speaking...");
    return;
  }

  if (textInput.value !== "") {
    body.style.background = '#141414 url(img/dark-eyes.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = (e) => {
        body.style.background = '#141414';
    };
    speakText.onerror = (e) => {
      console.log("Error -> Something went wrong");
    };

    const selectedVoice =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    console.log(selectedVoice);

    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
};


// event listiners
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
  });
  
  rate.addEventListener('change', e => (rateValue.textContent = rate.value));
  pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));
  voiceSelect.addEventListener('change', e => speak());