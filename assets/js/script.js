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
  const now = new Date();
  currentTime.innerText = formatDate(now);

  if (alarmTime) {
    let timeDiff = Math.abs(now.getTime() - alarmTime.getTime());
    const diffInHours = timeDiff / (1000 * 3600);
    const diffHours = Math.floor(diffInHours);
    const diffMinutes = Math.floor((diffInHours - diffHours) * 60);
    const diffSeconds = Math.ceil((diffInHours - (diffHours + diffMinutes / 60)) * 3600);
    timer.innerText = `${addLeadingZeros(diffHours)}:${addLeadingZeros(diffMinutes)}:${addLeadingZeros(diffSeconds)}`;
  }
  else
    timer.innerText = "00:00:00";

  if (alarmTime && alarmTime <= now) {
    ringtone.play();
    ringtone.loop = true;
    alarmTime = null;
  }
});

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = null;
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.classList.remove("clean-button")
    setAlarmBtn.innerText = "Definir Alarme";
    return (isAlarmSet = false);
  }

  const hour = selectMenu[0].value;
  const minute = selectMenu[1].value;
  if (hour.includes("Hour") || minute.includes("Minute"))
    return alert("Por favor, selecione um horário válido!");

  const now = new Date();
  alarmTime = new Date(`${now.getUTCFullYear()}-${addLeadingZeros(now.getUTCMonth() + 1)}-${now.getUTCDate()}T${hour}:${minute}:00.000`);

  if (alarmTime < now)
    alarmTime.setDate(alarmTime.getDate() + 1);

  isAlarmSet = true;
  content.classList.add("disable");
  setAlarmBtn.classList.add("clean-button")
  setAlarmBtn.innerText = "Limpar Alarme";
}

function formatDate(date) {
  let h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
  return `${addLeadingZeros(h)}:${addLeadingZeros(m)}:${addLeadingZeros(s)}`;
}

function addLeadingZeros(number) {
  return number < 10 ? "0" + number : number;
}

setAlarmBtn.addEventListener("click", setAlarm);
