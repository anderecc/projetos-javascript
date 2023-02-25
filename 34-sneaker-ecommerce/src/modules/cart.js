const $inputQty = document.querySelector('.input-value');
let number = 1;
export default document.addEventListener('click', e => {
    const el = e.target
    el.classList.contains('btn-minus') ? el.onclick = minusQty() : null;
    el.classList.contains('btn-plus') ? el.onclick = plusQty() : null;
})

function minusQty() {
    number--;
    number < 0 ? number =5 : number; 
    $inputQty.value = number;
}

function plusQty() {
    number++;
    number > 5 ? number =0 : number; 
    $inputQty.value = number;
}
