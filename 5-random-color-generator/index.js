let $container = document.querySelector('.container');
let $btn = document.querySelector('.btn');
let newsColors = 12;
$btn.addEventListener('click', () => {
    for (let i = 0; i < newsColors; i++) {
        newsColorsEl();
    }
});

for (let i = 0; i < 30; i++) {
    let colorContainer = document.createElement('div'); // criando um elemento
    colorContainer.classList.add('color-container'); // colocando classe nesse elemento
    $container.appendChild(colorContainer); // colocando o elemento no html dinamicamente
}

let colorContainers = document.querySelectorAll('.color-container');

function randomColor() {
    let chars = '0123456789abcdef';
    let colorCodeLenght = 6;
    let colorCode = '';
    for (let i = 0; i < colorCodeLenght; i++) {
        let randomNum = Math.round(Math.random() * chars.length);
        colorCode += chars.substring(randomNum, randomNum + 1);
    }
    return colorCode;
}

function newsColorsEl() {
    let color = document.createElement('div');
    let newColor = randomColor();
    color.style.backgroundColor = '#' + newColor;
    color.innerHTML = `#${newColor}`;
    color.classList.add('color-container');
    $container.appendChild(color);
}

function genereteColors() {
    colorContainers.forEach((div) => {
        let newColor = randomColor();
        div.style.backgroundColor = '#' + newColor;
        div.innerHTML = `#${newColor}`;
    });
}
genereteColors();
