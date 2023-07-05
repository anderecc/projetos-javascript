let $bottomContainer = document.querySelector('.bottom-container');
let $navbar = document.querySelector('.navbar');

window.addEventListener('scroll', (e) => {
    window.scrollY >= $bottomContainer.offsetTop - $navbar.offsetHeight - 50
        ? $navbar.classList.add('active')
        : $navbar.classList.remove('active');
});
