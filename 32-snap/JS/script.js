let $btnOpenMenu = document.querySelector('#header-btn-menu')
let $btnCloseMenu = document.querySelector('#header-btn-menu-collapse')
let $Menu = document.querySelector('.header-menu')
let $aFeatures = document.querySelector('#aFeatures')
let $aCompany = document.querySelector('#aCompany')
let $divImage = document.querySelector('.main-image')
let $LoginRegister = document.querySelector('#login-register')
let $spanHeader = document.querySelector('.header-span')
$btnOpenMenu.addEventListener('click', OpenMenu)
$btnCloseMenu.addEventListener('click', CloseMenu)
_opened = false;

function OpenMenu(){
    $Menu.removeAttribute('style')
}
function CloseMenu(){
    if(!$Menu.hasAttribute('style')){
        $Menu.setAttribute("style", "display:none;")

    }
}

let $OpenCompany = document.querySelector('#linkCompany')
let $MenuCompany = document.querySelector('.menu-company')
let $OpenFeatures = document.querySelector('#linkFeatures')
let $MenuFeatures = document.querySelector('.menu-features')
$OpenFeatures.addEventListener('click', OpenOrCloseFeatures)
$OpenCompany.addEventListener('click', OpenOrCloseCompany)

function OpenOrCloseCompany(){
    if(_opened === false){
        OpenMenuCompany();
        _opened = true;
    } else {
        CloseMenuCompany();
        _opened = false;
    }
}
function OpenOrCloseFeatures(){
    if(_opened === false){
        OpenMenuFeatures();
        _opened = true;
    } else {
        CloseMenuFeatures();
        _opened = false;
    }
}

function OpenMenuFeatures(){
    $MenuFeatures.removeAttribute('style');
    $aFeatures.innerHTML = 'Features <img src="./images/icon-arrow-up.svg" alt="icon-arrow-up">'
}
function CloseMenuFeatures(){
    $MenuFeatures.setAttribute("style", "display:none;");
    $aFeatures.innerHTML = 'Features <img src="./images/icon-arrow-down.svg" alt="icon-arrow-down">'

}
function OpenMenuCompany(){
    $MenuCompany.removeAttribute('style');
    $aCompany.innerHTML = 'Company <img src="./images/icon-arrow-up.svg" alt="icon-arrow-up">'
}
function CloseMenuCompany(){
    $MenuCompany.setAttribute("style", "display:none;");
    $aCompany.innerHTML = 'Company <img src="./images/icon-arrow-down.svg" alt="icon-arrow-down">'
}