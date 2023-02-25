var $header = document.querySelector('.header-menu')
var $main = document.querySelector('.main')
var $btnOpen = document.querySelector('.header-btn-open')
var $btnClose = document.querySelector('.header-btn-close')

document.addEventListener('loadstart',carregado())
function carregado(){
    let body = document.querySelector('body')
    body.style.backgroundColor = '#7a7a7a60'

}


function pressEnterOpen (){
    if($btnOpen.focus)
        $btnOpen.addEventListener('keyup', e => {
            if (e.keyCode === 13) {
                openMenu();
            }
        });
    };
function pressEnterClose (){
    if($btnClose.focus)
        $btnClose.addEventListener('keyup', e => {
            if (e.keyCode === 13) {
                closeMenu();
            }
        });
    };
pressEnterOpen ();
pressEnterClose ();



function openMenu (){
    $header.classList.add('header-menu-aberto');
    $main.classList.add('main-menu');
}

function closeMenu(){
    $header.classList.remove('header-menu-aberto');
    $main.classList.remove('main-menu');
}

document.addEventListener('click', (e) => {
    let el = e.target;
    if(el.classList.contains('header-img-open')){
        openMenu();
    } else if(el.classList.contains('header-img-close')){
        closeMenu();
    }
});



