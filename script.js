// Speech API.
const speechApi = window.speechSynthesis;

// DOM Elements.
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");

// Init voices array.
let voices = null;

function getVoices() {
    voices = speechApi.getVoices();

    voices.forEach(voice => {
        // Create option element.
        const option = document.createElement("option");
        option.textContent = `${voice.name} - (${voice.lang})`;
        option.setAttribute("data-lang", voice.lang);
        option.setAttribute("data-name", voice.name);
        voiceSelect.appendChild(option);
    });
}

getVoices();

if (speechApi.onvoiceschanged !== undefined) {
    speechApi.onvoiceschanged = getVoices;
}
