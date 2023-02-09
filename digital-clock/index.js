let $hour = document.querySelector('#hour');
let $minutes = document.querySelector('#minutes');
let $seconds = document.querySelector('#seconds');
let $ampm = document.querySelector('#ampm');

function menorQueDez(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

function ampm(hora) {
    if (hora >= 12) {
        $ampm.innerHTML = 'PM';
    } else {
        $ampm.innerHTML = 'AM';
    }
}
function getDate() {
    let date = new Date();
    $hour.innerHTML = menorQueDez(date.getHours());
    $minutes.innerHTML = menorQueDez(date.getMinutes());
    $seconds.innerHTML = menorQueDez(date.getSeconds());

    setInterval(() => {
        // veja que aqui eu estou chamando a propria funcao dentro dela
        getDate();
    }, 1000);
}
getDate();
