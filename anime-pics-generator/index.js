let $btn = document.querySelector('.button');
let $image = document.querySelector('.anime-image');
let $name = document.querySelector('.name-anime');
let $loadings = document.querySelectorAll('.loading');
let $containerImage = document.querySelector('.anime-container');
let $container = document.querySelector('.container');
let $loadingContainer = document.querySelector('.loading-container');
let $texts = document.querySelectorAll('.text');

$btn.addEventListener('click', getCatBoy);

async function getCatBoy() {
    setLoadings(true);
    text(false);
    $loadingContainer.style.display = 'flex';
    $image.style.display = 'none';
    $btn.disabled = true;
    try {
        let image = await fetch('https://api.catboys.com/img').then((data) =>
            data.json()
        );
        let name = await fetch('https://api.catboys.com/catboy').then((data) =>
            data.json()
        );
        $container.style.justifyContent = 'space-between';
        $loadingContainer.style.display = 'none';
        text(true);
        setLoadings(false);
        setInfos(image.url, name.response);
        $btn.disabled = false;
    } catch (error) {
        setLoadings(false);
        text(true);
        $image.src = '#';
        $name.innerHTML = 'Try Again.';
    }
}

function setInfos(url, name) {
    $containerImage.style.display = 'block';
    $image.style.display = 'flex';
    $image.src = url;
    $name.innerHTML = name;
}

function setLoadings(value) {
    if (value) {
        $loadings.forEach((loading) => (loading.style.display = 'block'));
    } else {
        $loadings.forEach((loading) => (loading.style.display = 'none'));
    }
}

function text(value) {
    if (!value) {
        $texts.forEach((text) => (text.style.display = 'none'));
    } else {
        $texts.forEach((text) => (text.style.display = 'block'));
    }
}
