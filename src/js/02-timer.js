import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let timeId = null;

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  values: document.querySelectorAll('.value'),
};

refs.btnStart.setAttribute('disabled', true);

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: selectedDates => {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Report.warning(
        'Warning',
        'Please choose a date in the future',
        'Close message'
      );
    } else {
      refs.btnStart.removeAttribute('disabled');
    }
  },
});

refs.btnStart.addEventListener('click', startTimer);
refs.input.addEventListener('change', changeDate);

function startTimer() {
  refs.btnStart.setAttribute('disabled', true);

  timeId = setInterval(timer, 1000);
}

function timer() {
  const time = new Date(refs.input.value) - Date.now();

  if (time < 1000) {
    clearInterval(timeId);
  }

  updateClockFace(convertMs(time));
}

function updateClockFace(object) {
  for (const key in object) {
    document.querySelector(`span[data-${key}]`).textContent = String(
      object[key]
    ).padStart(2, '0');
  }
}

function changeDate() {
  clearInterval(timeId);

  if (new Date(refs.input.value) > Date.now()) {
    refs.btnStart.removeAttribute('disabled');
  }
  
  for (let value of refs.values) {
    value.textContent = '00';
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
