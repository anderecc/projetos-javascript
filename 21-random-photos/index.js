let $container = document.querySelector('.image-container');
let $btn = document.querySelector('.btn');
let imageNumber = 10;

$btn.addEventListener('click', () => {
    addNewsImages();
});

function addNewsImages() {
    for (let i = 0; i < imageNumber; i++) {
        let newImg = document.createElement('img');
        newImg.src = `https://picsum.photos/300?random=${Math.round(
            Math.random() * 2000
        )}`;

        $container.appendChild(newImg);
    }
}
