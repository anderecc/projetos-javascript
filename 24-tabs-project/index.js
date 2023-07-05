let tabs = document.querySelector('.tabs');
let btns = document.querySelectorAll('.button');
let articles = document.querySelectorAll('.content');

tabs.addEventListener('click', (e) => {
    console.log(e.target.dataset.id);
    let id = e.target.dataset.id;
    if (id) {
        btns.forEach((btn) => {
            btn.classList.remove('live');
        });
        e.target.classList.add('live');
        articles.forEach((article) => {
            article.classList.remove('live');
            if (id == article.id) {
                article.classList.add('live');
            }
        });
    }
});
