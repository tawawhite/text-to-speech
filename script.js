// Speech API.
const speechApi = window.speechSynthesis;

const body = document.querySelector("body");
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");

let voices = null;

function getVoices() {
    voices = speechApi.getVoices();

    voices.forEach(voice => {
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

function speak() {
    if (speechApi.speaking) {
        console.error("Already speaking...");
        return;
    }

    if (textInput.value === "") {
        console.error("Input empty...");
        return;
    }

    body.style.background = "#141414 url(./img/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";

    const speakText = new SpeechSynthesisUtterance(textInput.value);
    speakText.onend = e => {
        console.log("Done speaking...");

        body.style.background = "#141414";
    };

    speakText.onerror = e => {
        console.error("Something went wrong...");
    };

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");
    voices.forEach(voice => {
        if (voice.name === selectedVoice) {
            speakText.voice = voice;
        }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    speechApi.speak(speakText);
}

textForm.addEventListener("submit", e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

rate.addEventListener("change", () => (rateValue.textContent = rate.value));
pitch.addEventListener("change", () => (pitchValue.textContent = pitch.value));
