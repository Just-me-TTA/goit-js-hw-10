import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const form = document.querySelector('.form');
const btn = document.querySelector('button');
form.addEventListener('submit', startCreate);

function startCreate(event) {
  event.preventDefault();
  btn.disabled = true;
  const delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);
  let promisesCreated = 0;

  function handleCreatePromise(position, promiseDelay) {
    createPromise(position, promiseDelay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      )
      .finally(() => {
        promisesCreated++;
        if (promisesCreated === amount) {
          btn.disabled = false;
          form.reset();
        }
      });
  }

  for (let index = 0; index < amount; index++) {
    const promiseDelay = delay + step * index;
    const position = index + 1;
    handleCreatePromise(position, promiseDelay);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
