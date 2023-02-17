let $bottomContainer = document.querySelector('.bottom-container');
let $navbar = document.querySelector('.navbar');

window.addEventListener('scroll', (e) => {
    console.log($bottomContainer.offsetTop, $navbar.offsetHeight);
    window.scrollY >= $bottomContainer.offsetTop - $navbar.offsetHeight - 50
        ? $navbar.classList.add('active')
        : $navbar.classList.remove('active');
});
