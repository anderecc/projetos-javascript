let kits = ['crash', 'kick', 'snare', 'tom'];
let $container = document.querySelector('.container');

kits.forEach((kit) => {
    let btnEl = document.createElement('button');
    btnEl.classList.add('btn');
    btnEl.innerHTML = kit;
    btnEl.style.backgroundImage = `url(./${kit}.jpg)`;
    $container.appendChild(btnEl);

    let audioEl = document.createElement('audio');
    audioEl.src = `./${kit}.mp3`;
    $container.appendChild(audioEl);

    btnEl.addEventListener('click', () => {
        audioEl.play();
        btnEl.style.transform = 'scale(.95)';
        setTimeout(() => {
            btnEl.style.transform = 'scale(1)';
        }, 100);
    });
    window.addEventListener('keyup', (e) => {
        if (e.key == kit.slice(0, 1)) {
            audioEl.play();
            btnEl.style.transform = 'scale(.95)';
            setTimeout(() => {
                btnEl.style.transform = 'scale(1)';
            }, 100);
        }
    });
});
