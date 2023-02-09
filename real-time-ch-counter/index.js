let $text = document.querySelector('#textarea');
let $totalCounter = document.querySelector('#total-counter');
let $reamingCounter = document.querySelector('#reaming-counter');

$text.addEventListener('keyup', (e) => {
    updateCounter();
});

function updateCounter() {
    $totalCounter.innerHTML = $text.value.length;
    $reamingCounter.innerHTML =
        $text.getAttribute('maxLength') - $text.value.length;
}
