let api_key = 'CYF9XP2n9NxBJi0ep02Tn85xyecJoOWI';

let $currencyFirst = document.querySelector('#currency-first');
let $currencySecond = document.querySelector('#currency-second');

let $worthFirst = document.querySelector('#worth-first');
let $worthSecond = document.querySelector('#worth-second');
let $exchangeRate = document.querySelector('.exchange-rate');

let $loading = document.querySelector('.loading');

let options = {
    method: 'GET',
    redirect: 'follow',
    headers: {
        apiKey: api_key,
    },
};

(() => {
    computeConverter(
        $currencyFirst.value,
        $currencySecond.value,
        $worthFirst.value
    );
})();

$currencyFirst.addEventListener('change', () => {
    computeConverter(
        $currencyFirst.value,
        $currencySecond.value,
        $worthFirst.value
    );
});
$currencySecond.addEventListener('change', () => {
    computeConverter(
        $currencyFirst.value,
        $currencySecond.value,
        $worthFirst.value
    );
});

$worthFirst.addEventListener('keyup', () => {
    computeConverter(
        $currencyFirst.value,
        $currencySecond.value,
        $worthFirst.value
    );
});
$worthSecond.addEventListener('change', () => {
    computeConverter(
        $currencyFirst.value,
        $currencySecond.value,
        $worthSecond.value
    );
});

async function computeConverter(to, from, value) {
    $loading.style.display = 'flex';
    try {
        let response = await fetch(
            `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${value}`,
            options
        ).then((data) => data.json());
        $worthSecond.value = response.result.toFixed(2);
        $exchangeRate.innerText = `${$worthFirst.value} ${
            $currencyFirst.value
        } = ${response.result.toFixed(2)} ${$currencySecond.value}`;
        $loading.style.display = 'none';
    } catch (error) {
        $exchangeRate.innerText = 'An error occurred, please try again';
        $loading.style.display = 'none';
    }
}
