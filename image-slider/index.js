let $btnPrev = document.querySelector('.prev');
let $btnNext = document.querySelector('.next');
let $imageContainer = document.querySelector('.image-container');
let $imgs = document.querySelectorAll('img');
let $container = document.querySelector('.slider-container');

let timeout;

let imagePositions = [
    0, -500, -1000, -1500, -2000, -2500, -3000, -3500, -4000, -45000, -5000,
];
let counterNext = 0;
let counterPrev = $imgs.length;

$btnNext.addEventListener('click', () => {
    counterNext++;
    if (counterNext >= $imgs.length) {
        counterNext = 0;
    }

    $imageContainer.style.transform = `translate(${imagePositions[counterNext]}px)`;
});

$btnPrev.addEventListener('click', () => {
    counterPrev--;
    if (counterPrev <= -1) {
        counterPrev = $imgs.length - 1;
    }
    $imageContainer.style.transform = `translate(${imagePositions[counterPrev]}px)`;
});
