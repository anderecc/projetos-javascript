let $btn = document.querySelector('.btn');
let $btnClose = document.querySelector('.close-icon');
let $containerVideo = document.querySelector('.trailer-container');
let $video = document.querySelector('video');

$btn.addEventListener('click', () => {
    $containerVideo.classList.remove('active');
});

$btnClose.addEventListener('click', () => {
    if (!$containerVideo.classList.contains('active')) {
        $containerVideo.classList.add('active');
        $video.pause();
        $video.currentTime = 0;
    }
});
