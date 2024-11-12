import { backend } from 'declarations/backend';

const inputText = document.getElementById('inputText');
const languageSelect = document.getElementById('languageSelect');
const translateBtn = document.getElementById('translateBtn');
const outputText = document.getElementById('outputText');
const speakBtn = document.getElementById('speakBtn');
const spinner = document.getElementById('spinner');
const logo = document.getElementById('logo');

translateBtn.addEventListener('click', translateText);
speakBtn.addEventListener('click', speakText);

async function translateText() {
    const text = inputText.value.trim();
    const targetLang = languageSelect.value;

    if (!text) {
        alert('Please enter some text to translate.');
        return;
    }

    spinner.classList.remove('d-none');
    translateBtn.disabled = true;

    try {
        const translatedText = await fetchTranslation(text, targetLang);
        outputText.value = translatedText;

        // Store translation in backend
        await backend.addTranslation(text, translatedText, targetLang);
    } catch (error) {
        console.error('Translation error:', error);
        alert('An error occurred during translation. Please try again.');
    } finally {
        spinner.classList.add('d-none');
        translateBtn.disabled = false;
    }
}

async function fetchTranslation(text, targetLang) {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.responseStatus === 200) {
        return data.responseData.translatedText;
    } else {
        throw new Error('Translation failed');
    }
}

function speakText() {
    const text = outputText.value.trim();
    if (!text) {
        alert('No translated text to read.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageSelect.value;
    speechSynthesis.speak(utterance);
}

function animateLogo() {
    const animations = ['spin', 'bounce'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    logo.classList.add(randomAnimation);
    
    setTimeout(() => {
        logo.classList.remove(randomAnimation);
    }, 2000);
}

function scheduleNextAnimation() {
    const delay = Math.floor(Math.random() * 5000) + 2000; // Random delay between 2-7 seconds
    setTimeout(() => {
        animateLogo();
        scheduleNextAnimation();
    }, delay);
}

scheduleNextAnimation();
