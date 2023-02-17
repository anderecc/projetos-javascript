let $heightCM = document.getElementById('height-cm');
let $heightKG = document.getElementById('height-kg');
let $result = document.getElementById('result');
let $btn = document.querySelector('.btn');
let $condition = document.querySelector('.condition');

$btn.addEventListener('click', computeBMI);

function computeBMI() {
    let cm = +$heightCM.value;
    let kg = +$heightKG.value;
    let condition;
    if (cm.toString().indexOf('.') !== -1) {
        condition = kg / (cm * cm);
        $result.value = condition.toFixed(2);
        setCondition(condition);
    } else {
        cm /= 100;
        condition = kg / (cm * cm);
        $result.value = condition.toFixed(2);
        setCondition(condition);
    }
}

function setCondition(condition) {
    +condition < 18.5
        ? ($condition.innerHTML = 'Abaixo do peso normal')
        : +condition >= 18.5 && +condition < 24.9
        ? ($condition.innerHTML = 'Peso normal')
        : +condition >= 25 && +condition < 29.9
        ? ($condition.innerHTML = 'Excesso de peso')
        : +condition >= 30 && +condition < 34.9
        ? ($condition.innerHTML = 'Obesidade classe 1')
        : +condition >= 35 && +condition < 39.9
        ? ($condition.innerHTML = 'Obesidade classe 2')
        : +condition >= 40
        ? ($condition.innerHTML = 'Obesidade classe 3')
        : null;
}
