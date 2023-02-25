const publicityImg = document.querySelector('.publicity img');
const highlightImgs = document.querySelectorAll('.main-highlight-container img')
const divoltisImgs = document.querySelectorAll('.divoltis-container img')
const pirulitaImgs = document.querySelectorAll('.pirulita-container img')
const cevadissImgs = document.querySelectorAll('.cevadiss-container img')
console.log(cevadissImgs)

function trocaImg(element, size, name) {
    element.forEach((img, i) => {
        img.setAttribute('src', `./slices/${size}/${name}-0${i+1}.png`);
    })}
var desktop = 'desktop';
var tablet = 'tablet';
var mobile = 'mobile';

var highlight = 'highlight';
var divoltis = 'divoltis_porris';
var pirulita = 'se_pirulita';
var cevadiss = 'suco_de_cevadiss';
setInterval(() => {
    if(window.innerWidth >= 769){
            trocaImg(highlightImgs, desktop, highlight);
            trocaImg(divoltisImgs, desktop, divoltis);
            trocaImg(pirulitaImgs, desktop, pirulita);
            trocaImg(cevadissImgs, desktop, cevadiss);
            publicityImg.setAttribute('src', './slices/desktop/ads-300x600.png');
        } else if(window.innerWidth <= 768 && window.innerWidth >= 481){
            trocaImg(highlightImgs, tablet, highlight);
            trocaImg(divoltisImgs, tablet, divoltis);
            trocaImg(pirulitaImgs, tablet, pirulita);
            trocaImg(cevadissImgs, tablet, cevadiss);
            publicityImg.setAttribute('src', './slices/tablet/ads-300x250.png');    
        } else {
            trocaImg(highlightImgs, mobile, highlight);
            trocaImg(divoltisImgs, mobile, divoltis);
            trocaImg(pirulitaImgs, mobile, pirulita);
            trocaImg(cevadissImgs, mobile, cevadiss);
            publicityImg.setAttribute('src', './slices/mobile/ads-300x250.png');    

        }

    }, 100);

