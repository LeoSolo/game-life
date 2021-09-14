const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const countPLace = document.getElementById('counter');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
let cordsArr = [];
let countCycles = 0;
let timer;

canvas.onclick = function(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  
  x = Math.floor(x/10);
  y = Math.floor(y/10);
  
  cordsArr[y][x] = 1;
  createCandidates();
}

function createField() {  // Разметка
  const x = 60, y = 60;
  
  for (let i = 0; i < x; i++) {
    cordsArr[i] = [];
    for (let j = 0; j < y; j++) {
      cordsArr[i][j] = 0;
    }
  }
}

createField();

function createCandidates() {  // Создаем молекулу
  ctx.clearRect(0,0, 600,600);
  for (let i = 0; i < 60; i++) {
    for (let j = 0; j < 60; j++) {
      if (cordsArr[i][j] === 1) {
        ctx.fillRect(j*10, i*10,10,10);
      }
    }
  }
}

function start() {  // Моделируем жизнь
  let arr = [], neighbors = 0;
  
  for (let i = 0; i < 60; i++) {
    arr[i] = [];
    for (let j = 0; j < 60; j++) {  // Проверяем соседей
      neighbors = 0;
      if (cordsArr[checkBorderF(i)-1][j] === 1) neighbors++;
      if (cordsArr[checkBorderL(i)+1][j] === 1) neighbors++;
      if (cordsArr[i][checkBorderF(j)-1] === 1) neighbors++;
      if (cordsArr[i][checkBorderL(j)+1] === 1) neighbors++;
      if (cordsArr[checkBorderF(i)-1][checkBorderL(j)+1] === 1) neighbors++;
      if (cordsArr[checkBorderL(i)+1][checkBorderF(j)-1] === 1) neighbors++;
      if (cordsArr[checkBorderF(i)-1][checkBorderF(j)-1] === 1) neighbors++;
      if (cordsArr[checkBorderL(i)+1][checkBorderL(j)+1] === 1) neighbors++;
  
      (neighbors === 2 || neighbors === 3)
        ? arr[i][j] = 1
        : (neighbors < 2 || neighbors > 3) ? arr[i][j] = 0 : null;
    }
  }
  cordsArr = arr;
  
  if (checkLife()) {
    createCandidates();
    count();
    setTimer();
  } else {
    clear();
  }
}

function checkBorderF(i) {
  if (i === 0) {
    return 60;
  } else return i;
}

function checkBorderL(i) {
  if (i === 59) {
    return -1;
  } else return i;
}

function checkLife() {
  let isAlive = false;
  
  for (let i = 0; i < cordsArr.length; i++) {
    cordsArr[i].indexOf(1) !== -1 ? isAlive = true : null;
  }
  
  return isAlive;
}

function count() {
  countCycles++;
  countPLace.innerHTML = countCycles.toString();
}

function setTimer() {
  timer = setTimeout(() => {
    start();
  }, 400);
}

function clear() {
  clearTimeout(timer);
  createField();
  countCycles = 0;
  countPLace.innerHTML = countCycles.toString();
  ctx.clearRect(0,0, 600,600);
}

startBtn.onclick = start;
stopBtn.onclick = clear;