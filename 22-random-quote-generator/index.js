let btn = document.querySelector('.button');
let quote = document.querySelector('#quote');
let author = document.querySelector('.author');
let textButton = document.querySelector('.text-btn');
let loading = document.querySelector('.loading');

btn.addEventListener('click', getQuote);

async function getQuote() {
    textButton.style.display = 'none';
    loading.style.display = 'flex';
    btn.disabled = true;
    try {
        let response = await fetch('https://api.quotable.io/random').then(
            (data) => data.json()
        );
        quote.innerHTML = ` ${response.content} `;
        author.innerHTML = `~ ${response.author}`;
    } catch (error) {
        quote.innerHTML = ` Please try again. `;
        author.innerHTML = `~ Check you connection with internet`;
    }
    textButton.style.display = 'flex';
    loading.style.display = 'none';
    btn.disabled = false;
}
