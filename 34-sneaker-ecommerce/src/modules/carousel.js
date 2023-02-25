const $carousel = document.querySelector('.carousel-container');
const $previewImgs = document.querySelectorAll('.carousel-preview img');

const $lightbox = document.querySelector('.lightbox-container');
const $lightboxCarousel = document.querySelector('.lightbox-carousel');
const $lightboxPreviewImgs = document.querySelectorAll('.lightbox-preview img');

const translates = [0, 100, 200, 300];
let number = 0;

export default document.addEventListener('click', e => {
    const el= e.target;
    if(el.dataset.carousel){
        const number = el.dataset.carousel;
        selectImage(number, $carousel);
        setClassSelected(number, $previewImgs);
    }
    if(el.dataset.carousellightbox){
        const number = el.dataset.carousellightbox;
        selectImage(number, $lightboxCarousel);
        setClassSelected(number, $lightboxPreviewImgs);
    }
    el.classList.contains('btnPrev') ? prevImage($carousel) : null;
    el.classList.contains('btnNext') ? nextImage($carousel) : null;
    el.classList.contains('btnPrevLightbox') ? prevImage($lightboxCarousel, $lightboxPreviewImgs) : null;
    el.classList.contains('btnNextLightbox') ? nextImage($lightboxCarousel, $lightboxPreviewImgs) : null;
    el.classList.contains('btn-close-lightbox') ? closeLightbox() : null;
    el.dataset.imglightbox ? openLightbox() : null;

})
function openLightbox() {
    $lightbox.style.display = `flex`;
}
function closeLightbox() {
    $lightbox.style.display = `none`;
}
function setClassSelected(num, elem) {
    elem.forEach(img => img.classList.remove('img-selected'));
    elem[num - 1].classList.add('img-selected');

}

function selectImage(num, elem) {
    elem.style.transform = `translateX(-${translates[num -1]}%)`;
}

function prevImage(carousel, preview) {
    minus();
    preview ? setClassSelected(number + 1, preview) : null;

    carousel.style.transform = `translateX(-${translates[number]}%)`;
}

function nextImage(carousel, preview) {
    plus();
    preview ? setClassSelected(number + 1, preview) : null;

    carousel.style.transform = `translateX(-${translates[number]}%)`;
}

function plus() {
    number >= 3 ? number = 0: number += 1;
}

function minus (){
    number <= 0 ? number = 3: number -= 1;

}
