let $input = document.querySelector('.input');
let $body = document.querySelector('body');

$input.checked = JSON.parse(localStorage.getItem('theme'));

updateBody();

$input.addEventListener('input', updateBody);

function updateBody() {
    if ($input.checked) {
        $body.style.backgroundColor = 'black';
        localStorage.setItem('theme', JSON.stringify($input.checked));
    } else {
        $body.style.backgroundColor = 'white';
        localStorage.setItem('theme', JSON.stringify($input.checked));
    }
}
