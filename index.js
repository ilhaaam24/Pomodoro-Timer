const notifier = require("node-notifier");
const moment = require("moment");

const argTime = process.argv.slice(2);

const POMODORO_DURATION = argTime[0];
const BREAK_DURATION = argTime[1];

let isWorking = false;
let remainingTime = 0;

function formattingTime(totalSecond) {
  const duration = moment.duration(totalSecond, "second");
  const hours = duration.hours().toString().padStart(2, "0");
  const minutes = duration.minutes().toString().padStart(2, "0");
  const seconds = duration.seconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function startTime(duration) {
  isWorking = !isWorking;
  remainingTime = duration * 60; //convert to minutes

  const timer = setInterval(() => {
    remainingTime--;

    const formattedTime = formattingTime(remainingTime);

    console.log(`${isWorking ? "Working" : "break"} : ${formattedTime}`);

    if (remainingTime === 0) {
      clearInterval(timer);
      notifier.notify({
        title: isWorking ? "Time to break" : "Time to work",
        message: isWorking ? "good break" : "good work",
        sound: true,
        wait: true,
      });
      startTime(isWorking ? BREAK_DURATION : POMODORO_DURATION);
    }
  }, 1000);
}

startTime(POMODORO_DURATION);
