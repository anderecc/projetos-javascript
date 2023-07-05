let $amount = document.getElementById('amount');
let $rate = document.getElementById('rate');
let $months = document.getElementById('months');
let $result = document.querySelector('.payment');

$amount.addEventListener('keyup', () => {
    computePayment();
});
$amount.addEventListener('change', () => {
    computePayment();
});
$rate.addEventListener('keyup', () => {
    computePayment();
});
$rate.addEventListener('change', () => {
    computePayment();
});
$months.addEventListener('keyup', () => {
    computePayment();
});
$months.addEventListener('change', () => {
    computePayment();
});

function computePayment() {
    let amount = +$amount.value;
    let rate = +$rate.value;
    let months = +$months.value;
    let total;
    let result;
    if (Number.isInteger(rate)) {
        rate /= 100;
    } else if (rate >= 1) {
        rate /= 100;
    }
    total = amount * rate + amount;
    result = total / months;

    $result.innerHTML = `Monthly Payment: ${result.toFixed(2)} <br>
    Total interest: ${amount * rate} `;
}
