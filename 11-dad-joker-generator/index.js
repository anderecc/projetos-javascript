let btn = document.querySelector('#btn');
let $joke = document.querySelector('#joke');
let container = document.querySelector('.container');

btn.addEventListener('click', getJoke);

let url = 'https://api.api-ninjas.com/v1/dadjokes?limit=1';
let apiKey = 'HsJZ3gEzZawzBJaPvT3Ejg==8OSPgZA9b68dwdMS';
var options = {
    method: 'GET',
    headers: { 'X-Api-Key': apiKey },
};

let jokeR;

async function getJoke() {
    try {
        container.classList.add('loading');
        btn.disabled = true;
        let req = await fetch(url, options)
            .then((data) => data.json())
            .then((result) => (jokeR = result[0].joke));
        btn.disabled = false;
        container.classList.remove('loading');
        $joke.innerHTML = jokeR;
    } catch (error) {
        btn.disabled = false;
        container.classList.remove('loading');
        $joke.innerHTML = 'Verify your conecction';
    }
}
