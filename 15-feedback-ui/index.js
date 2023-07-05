let ratings = document.querySelectorAll('.rating');
let btn = document.getElementById('btn');
let container = document.querySelector('.container');

let selectedRating = '';

ratings.forEach((rating) => {
    rating.addEventListener('click', (e) => {
        removeClass();
        selectedRating = e.target.innerText || e.target.parentNode.innerText;
        e.target.classList.add('active');
        e.target.parentNode.classList.add('active');
    });
});

btn.addEventListener('click', () => {
    if (selectedRating !== '') {
        container.innerHTML = `<h3>Thank You</h3>
        <br>
        <strong>Feedback: ${selectedRating}</strong>
        <br>
        <p>
        We'll use your feedback to improve your customer support.<p/>`;
    }
});

function removeClass() {
    ratings.forEach((rating) => {
        rating.classList.remove('active');
    });
}
