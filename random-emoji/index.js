let $btn = document.querySelector('.button');
let $emojiName = document.querySelector('.emoji-name');

$btn.addEventListener('click', randomEmoji);

let emojis = [];

async function getEmoji() {
    $btn.disabled = true;
    $btn.innerHTML = 'loading...';
    try {
        let response = await fetch(
            `https://emoji-api.com/emojis?access_key=a5b5f8b22a511bc781ce76e4c559f1ab1ae3588a`
        ).then((data) => data.json());
        emojis = [...response];
        $btn.disabled = false;
        randomEmoji();
    } catch (error) {
        alert('Verify your connection with internet.');
    }
}
getEmoji();

function randomNum() {
    return Math.round(Math.random() * emojis.length);
}

async function randomEmoji() {
    let num1 = randomNum();
    let num2 = randomNum();
    $btn.innerHTML = emojis[num1].character + emojis[num2].character;
    $emojiName.innerHTML = `${emojis[num1].slug} & ${emojis[num2].slug}`;
}
