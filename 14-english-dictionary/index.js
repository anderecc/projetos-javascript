let input = document.querySelector('.input');
let title = document.querySelector('.title');
let meaning = document.querySelector('.meaning');
let meaningContainer = document.querySelector('.meaning-container');
let audio = document.querySelector('#audio');
let infoText = document.querySelector('.info-text');
input.focus();

input.addEventListener('keyup', (e) => {
    if (input.value == '') {
        meaningContainer.style.display = 'none  ';
        infoText.innerHTML = 'Type a word and press Enter';
    }
    if (e.target.value && e.key == 'Enter') {
        fetchApi(e.target.value);
    }
});

async function fetchApi(value) {
    infoText.innerHTML = `Searching the meaning if "${value}"`;
    try {
        let response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
        ).then((data) => data.json());

        audio.style.display = 'block';
        infoText.innerHTML = '';
        title.innerHTML = response[0].word;
        meaning.innerHTML = response[0].meanings[0].definitions[0].definition;

        audio.src = response[0].phonetics[0].audio;
        meaningContainer.style.display = 'flex';
    } catch (error) {
        infoText.innerHTML = `Nothing found for "${value}"`;
        title.innerHTML = 'Try another word';
        meaning.innerHTML = 'N/A';
        meaningContainer.style.display = 'flex';
        audio.style.display = 'none';
    }
}
