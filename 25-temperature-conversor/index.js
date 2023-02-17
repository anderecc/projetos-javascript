let $celsius = document.getElementById('celsius');
let $fahrenheit = document.getElementById('fahrenheit');
let $kelvin = document.getElementById('kelvin');

$celsius.addEventListener('change', () => {
    computeTemp('celsius', $celsius.value);
});
$fahrenheit.addEventListener('change', () => {
    computeTemp('fahrenheit', $fahrenheit.value);
});
$kelvin.addEventListener('change', () => {
    computeTemp('kelvin', $kelvin.value);
});
$celsius.addEventListener('keyup', () => {
    computeTemp('celsius', $celsius.value);
});
$fahrenheit.addEventListener('keyup', () => {
    computeTemp('fahrenheit', $fahrenheit.value);
});
$kelvin.addEventListener('keyup', () => {
    computeTemp('kelvin', $kelvin.value);
});

let celsius;
let fahrenheit;
let kelvin;

function computeTemp(temperature, value) {
    value = parseFloat(value);
    switch (temperature) {
        case 'celsius':
            fahrenheit = (value * 9) / 5 + 32;
            kelvin = value + 273.15;
            setTemperatures('celsius', fahrenheit, kelvin);
            break;
        case 'fahrenheit':
            celsius = ((value - 32) * 5) / 9;
            kelvin = ((value - 32) * 5) / 9 + 273.15;
            setTemperatures('fahrenheit', celsius, kelvin);
            break;
        case 'kelvin':
            celsius = value - 273.15;
            fahrenheit = ((value - 273.15) * 9) / 5 + 32;
            setTemperatures('kelvin', celsius, fahrenheit);
            break;
    }
}

function setTemperatures(primary, temp1, temp2) {
    switch (primary) {
        case 'celsius':
            $fahrenheit.value = temp1;
            $kelvin.value = temp2;
            break;
        case 'fahrenheit':
            $celsius.value = temp1;
            $kelvin.value = temp2;
            break;
        case 'kelvin':
            $celsius.value = temp1;
            $fahrenheit.value = temp2;
            break;
    }
}
