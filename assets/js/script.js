const currentTime = document.querySelector("h2"),
  timer = document.querySelector("h1"),
  content = document.querySelector(".content"),
  selectMenu = document.querySelectorAll("select"),
  setAlarmBtn = document.querySelector("button"),
  initialHour = '10',
  initialMinute = '05';

let alarmTime,
  isAlarmSet,
  ringtone = new Audio("assets/audio/ringtone.mp3");

for (let i = 23; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

selectMenu[0].value = initialHour;
selectMenu[1].value = initialMinute;

setInterval(() => {
  let date = new Date();
  const h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  currentTime.innerText = formatDate(date);

  const alarm = alarmTime.split(':');
  const difHour = alarm[0] - (h == 0 ? 24 : h);
  const difMinute = alarm[1] - m;
  const difSec = 60 - s;
  timer.innerText = `${difHour}:${difMinute}:${difSec}`;

  if (alarmTime === `${h}:${m}`) {
    ringtone.play();
    ringtone.loop = true;
  }
});

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Definir Alarme";
    return (isAlarmSet = false);
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute")
  ) {
    return alert("Por favor, selecione um horário válido!");
  }
  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Limpar Alarme";
}

function formatDate(date) {
  let h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  return `${h}:${m}:${s}`;
}

setAlarmBtn.addEventListener("click", setAlarm);
