const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const name = document.getElementById("name");
const focus = document.getElementById("focus");

// show time and greeting

const showAmPm = true;


function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  const amPm = isPM(hour);
  hour = hour % 12 || 12;

  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm :''}`;
  setTimeout(showTime, 1000);
}

function isPM(hour) {
  return hour >= 12 ? "PM" : "AM";
}

function addZero(num) {
  return (parseInt(num, 10) < 10 ? "0" : "") + num;
}

function setGreet() {
  let today = new Date(),
    hour = today.getHours();

  document.body.style.backgroundPosition = "center center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";

  if (hour < 12) {
    document.body.style.backgroundImage = "url('img/morning.jpg')";
    greeting.textContent = "Good Morning!";
    document.body.style.color = "#fff";
  } else if (hour < 18) {
    document.body.style.backgroundImage = "url('img/afternoon.jpg')";
    greeting.textContent = "Good Afternoon";
    document.body.style.color = "#fff";
  } else {
    document.body.style.backgroundImage = "url('img/night.jpg')";
    greeting.textContent = "Good Evening";
    document.body.style.color = "#fff";
  }
}

function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Your Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

function setName(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
}

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);

function setFocus(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("focus", e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
}

focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

// RUN

showTime();
setGreet();
getName();
getFocus();
