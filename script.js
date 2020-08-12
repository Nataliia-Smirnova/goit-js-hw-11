// ------------------ Задание на смену цвета ----------------------

// Напиши скрипт, который после нажатия кнопки Start, раз в секунду меняет цвет фона body на случайное значение из массива используя инлайн - стиль.При нажатии на кнопку Stop, изменение цвета фона должно останавливаться.

// ⚠️ Учти, на кнопку Start можно нажать бесконечное количество раз.Сделай так, чтобы пока изменение темы запушено, кнопка Start была не активна.

// Для генерации случайного числа(индекс элемента массива цветов), используй функцию randomIntegerFromInterval.

const randomIntegerFromInterv = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const colors = [
  "#FFFFFF",
  "#2196F3",
  "#4CAF50",
  "#FF9800",
  "#009688",
  "#795548",
];

// Назначение переменных
const bodyRef = document.querySelector("body");
const startBtnRef = document.querySelector('button[data-action="start"]');
const stopBtnRef = document.querySelector('button[data-action="stop"]');
let intervalId = null;

// Добавление слушателей
startBtnRef.addEventListener("click", onStartBtnClick);
stopBtnRef.addEventListener("click", onStopBtnClick);

// Функции
function bodyColorSet(color = "#fff") {
  bodyRef.style.backgroundColor = color;
}

function changeStartBtnStatus() {
  startBtnRef.hasAttribute("disabled")
    ? startBtnRef.removeAttribute("disabled")
    : startBtnRef.setAttribute("disabled", true);
}

function onStartBtnClick() {
  changeStartBtnStatus();
  intervalId = setInterval(() => {
    bodyColorSet(colors[randomIntegerFromInterv(0, colors.length - 1)]);
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(intervalId);
  changeStartBtnStatus();
  bodyColorSet();
}
//
//
//
// ------------------- Задание на счётчик ---------------
//
// Переменные
const refs = {
  daysRef: document.querySelector("[data-value=days]"),
  hoursRef: document.querySelector("[data-value=hours]"),
  minsRef: document.querySelector("[data-value=mins]"),
  secsRef: document.querySelector("[data-value=secs]"),
};

let targetDate = new Date("Oct 17, 2020");

// Функции

const timer = setInterval(() => {
  let currentDate = Date.now();
  let delta = targetDate.getTime() - currentDate;
  updateTimerValue(delta);
}, 1000);

function updateTimerValue(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  refs.daysRef.textContent = days;
  refs.hoursRef.textContent = hours;
  refs.minsRef.textContent = mins;
  refs.secsRef.textContent = secs;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

//
//
// -------------  ПРОМИСЫ ------------
//
// ----------- № 1 ------------------------------------
// Напиши функцию delay(ms), которая возвращает промис, переходящий в состояние "resolved" через ms миллисекунд.Значением исполнившегося промиса должно быть то кол - во миллисекунд которое передали во время вызова функции delay.

const delay = (ms) => {
  return new Promise((res, rej) => {
    setTimeout(() => res(ms));
  }, ms);
};

const logg = (time) => console.log(`Resolved after ${time}ms`);

// Вызовы функции для проверки
delay(2000).then(logg); // Resolved after 2000ms
delay(1000).then(logg); // Resolved after 1000ms
delay(1500).then(logg); // Resolved after 1500ms

//
// -------------- # 2 ------------------------------------------------------
// Перепиши функцию toggleUserState() так, чтобы она не использовала callback - функцию callback, а принимала всего два параметра allUsers и userName и возвращала промис.

const users = [
  { name: "Mango", active: true },
  { name: "Poly", active: false },
  { name: "Ajax", active: true },
  { name: "Lux", active: false },
];

const toggleUserState = (allUsers, userName) => {
  return new Promise((res) => {
    const updatedUsers = allUsers.map((user) =>
      user.name === userName ? { ...user, active: !user.active } : user
    );
    res(updatedUsers);
  });
};

const logger = (updatedUsers) => console.table(updatedUsers);
/*
 * Должно работать так
 */
toggleUserState(users, "Mango").then(logger);
toggleUserState(users, "Lux").then(logger);

//
// ----------------- # 3 ------------------------------------------------------------
// Перепиши функцию makeTransaction() так, чтобы она не использовала callback - функции onSuccess и onError, а принимала всего один параметр transaction и возвращала промис.

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction) => {
  const delay = randomIntegerFromInterval(200, 500);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const canProcess = Math.random() > 0.3;

      if (canProcess) {
        resolve([transaction.id, delay]);
      }
      reject(transaction.id);
    }, delay);
  });
  return promise;
};

const logSuccess = ([id, time]) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = (id) => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

/*
 * Должно работать так
 */
makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);

makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);

makeTransaction({ id: 72, amount: 75 }).then(logSuccess).catch(logError);

makeTransaction({ id: 73, amount: 100 }).then(logSuccess).catch(logError);
