let $body = document.querySelector('body');
$body.addEventListener('mousemove', (e) => {
    const xPos = e.offsetX;
    const yPos = e.offsetY;
    let $span = document.createElement('span');
    $span.style.top = yPos + 'px';
    $span.style.left = xPos + 'px';
    $body.appendChild($span);

    let size = Math.random() * 100;
    $span.style.width = size + 'px';
    $span.style.height = size + 'px';

    setTimeout(() => {
        $span.remove;
    }, 3000);
});
