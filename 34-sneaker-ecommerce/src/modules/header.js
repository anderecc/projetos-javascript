const $headerNav = document.querySelector('.header-nav');
const $basket = document.querySelector('.basket');

export default document.addEventListener('click', e => {
    const el = e.target;
    el.classList.contains('btn-open-menu') ? openMenu(): null;
    el.classList.contains('btn-close-menu') ? closeMenu(): null;
    el.classList.contains('btn-basket') ? toggleBasket(): null;
})

function openMenu () {
    $headerNav.style.transform = `translateX(0)`;
};

function closeMenu () {
    $headerNav.removeAttribute('style');
}

function toggleBasket() {
    $basket.classList.toggle('toggleBasket')
}