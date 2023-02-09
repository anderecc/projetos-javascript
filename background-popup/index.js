let $container = document.querySelector('.container');
let $btn = document.querySelector('.btn');
let $popupContainer = document.querySelector('.popup-container');
let $closeIcon = document.querySelector('.close-icon');

$btn.addEventListener('click', () => {
    $container.classList.add('active');
    $popupContainer.classList.remove('active');
});
$closeIcon.addEventListener('click', () => {
    $container.classList.remove('active');
    $popupContainer.classList.add('active');
});
