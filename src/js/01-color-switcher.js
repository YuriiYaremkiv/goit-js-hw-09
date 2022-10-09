const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    btnReset: document.querySelector('button[data-reset]'),
}

let timerChangeColor = null;

refs.btnStop.setAttribute('disabled', true);
refs.btnReset.setAttribute('disabled', true);



refs.btnStart.addEventListener('click', changeColorOfBody);
refs.btnStop.addEventListener('click', stopChangeColor);
refs.btnReset.addEventListener('click', resetChangeColor);
    
function changeColorOfBody(){
    refs.btnStart.setAttribute('disabled', true);
    refs.btnStop.removeAttribute('disabled');
    refs.btnReset.removeAttribute('disabled');

    timerChangeColor = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopChangeColor() {
    clearInterval(timerChangeColor);
    refs.btnStart.removeAttribute('disabled');
    refs.btnStop.setAttribute('disabled', true);
}

function resetChangeColor() {
    clearInterval(timerChangeColor);

    refs.btnStart.removeAttribute('disabled');
    refs.btnReset.setAttribute('disabled', true);
    refs.btnStop.setAttribute('disabled', true);

    refs.body.style.backgroundColor = '#fff';
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}