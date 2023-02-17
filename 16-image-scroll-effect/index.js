let $image = document.querySelector('.bg-image');
window.addEventListener('scroll', () => {
    updateImage();
});

function updateImage() {
    $image.style.opacity = 1 - window.pageYOffset / 800;
    $image.style.backgroundSize = 400 - window.pageYOffset / 12 + '%';
}
