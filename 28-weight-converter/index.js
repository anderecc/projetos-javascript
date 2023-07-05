let $pounds = document.getElementById('pounds');
let $kilogram = document.getElementById('kilogram');
let $resultKilogram = document.querySelector('.result-kilogram');
let $resultPounds = document.querySelector('.result-pounds');

$pounds.addEventListener('change', computeConverter);
$pounds.addEventListener('keyup', computeConverter);
$kilogram.addEventListener('change', computeConverter);
$kilogram.addEventListener('keyup', computeConverter);

function computeConverter() {
    let result;
    if ($pounds.value !== '') {
        result = +$pounds.value / 2.205;
        $resultPounds.innerHTML = `Your weight in Kg is: <strong>${result.toFixed(
            4
        )}</strong>`;
    }
    if ($kilogram.value !== '') {
        result = +$kilogram.value * 2.205;
        $resultKilogram.innerHTML = `Your weight in Pounds is: <strong>${result.toFixed(
            4
        )}</strong>`;
    }
}
