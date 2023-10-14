import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      window.alert("Please choose a date in the future");
      document.querySelector('[data-start]').setAttribute('disabled', 'true');
    } else {
      document.querySelector('[data-start]').removeAttribute('disabled');
    }
  },
};

flatpickr("#datetime-picker", options);

const startButton = document.querySelector('[data-start]');
const timerFields = document.querySelectorAll('.value');

let countdownInterval;

startButton.addEventListener('click', () => {
  const selectedDate = new Date(document.querySelector("#datetime-picker").value);

  countdownInterval = setInterval(updateCountdown, 1000);

  startButton.disabled = true;

  function updateCountdown() {
    const currentTime = new Date();
    const timeRemaining = selectedDate - currentTime;

   if (timeRemaining <= 0) {
  // Countdown is complete
  clearInterval(countdownInterval);
  timerFields[0].textContent = "00";
  timerFields[1].textContent = "00";
  timerFields[2].textContent = "00";
  timerFields[3].textContent = "00";
  startButton.disabled = false;
  return;
}


    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    displayTimeLeft(days, hours, minutes, seconds);
  }

  function displayTimeLeft(days, hours, minutes, seconds) {
    timerFields[0].textContent = addLeadingZero(days);
    timerFields[1].textContent = addLeadingZero(hours);
    timerFields[2].textContent = addLeadingZero(minutes);
    timerFields[3].textContent = addLeadingZero(seconds);
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor(((ms % day) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
  }
});
