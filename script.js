// ------------------ Задание на смену цвета ----------------------

// Напиши скрипт, который после нажатия кнопки Start, раз в секунду меняет цвет фона body на случайное значение из массива используя инлайн - стиль.При нажатии на кнопку Stop, изменение цвета фона должно останавливаться.

// ⚠️ Учти, на кнопку Start можно нажать бесконечное количество раз.Сделай так, чтобы пока изменение темы запушено, кнопка Start была не активна.

// Для генерации случайного числа(индекс элемента массива цветов), используй функцию randomIntegerFromInterval.

const randomIntegerFromInterval = (min, max) => {
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
    bodyColorSet(colors[randomIntegerFromInterval(0, colors.length - 1)]);
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
