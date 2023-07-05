let $question = document.querySelector('#question');
let $input = document.querySelector('#input');
let $btn = document.querySelector('.btn');
let $score = document.querySelector('.score');

function aleatorio() {
    return Math.round(Math.random() * 10);
}

let n1;
let n2;
let score = +localStorage.getItem('score');
if (!score) {
    score = 0;
}

$score.innerHTML = `score: ${score}`;

function pergunta() {
    n1 = aleatorio();
    n2 = aleatorio();
    $input.value = '';
    return ($question.innerHTML = `What is ${n1} multiply by ${n2}?`);
}

pergunta();

$btn.addEventListener('click', confere);
document.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        confere;
    }
});

function confere(e) {
    e.preventDefault();
    let resposta = +$input.value;
    if (n1 * n2 == resposta) {
        score += 1;
        $score.innerHTML = `score: ${score}`;
        pergunta();
        local(score);
    } else {
        score = 0;
        $score.innerHTML = `score: ${score}`;
        local(score);
    }
}

function local(score) {
    localStorage.setItem('score', score);
}
