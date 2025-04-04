let watchesHours = document.querySelector('.digital-clock__hours');
let watchesMinutes = document.querySelector('.digital-clock__minutes');
let watchesSeconds = document.querySelector('.digital-clock__seconds');
let countDowner = document.querySelector('.timer-input');
let countDownerDisplay = document.querySelector('.countdown-display');
let calendarInput = document.querySelector('.calendar-input');
let calendarDisplay = document.querySelector('.calendar-display');
let futureValueForCounter;

let months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function changeHour(){
    let currentDateTime = new Date();
    let hours = currentDateTime.getHours();
    let minutes = currentDateTime.getMinutes();
    let seconds = currentDateTime.getSeconds();

    watchesHours.innerHTML = hours.toString().padStart(2, '0');
    watchesMinutes.innerHTML = minutes.toString().padStart(2, '0');
    watchesSeconds.innerHTML = seconds.toString().padStart(2, '0');
    setTimeout(() => {watchesSeconds.innerHTML = "  "}, 700)

}

function changeCountDownDisplay(){

    let currentDateTime = new Date();
    let diff = futureValueForCounter - currentDateTime;

    if (diff <= 0) {
        countDownerDisplay.innerHTML = "00:00:00:00:00";
        alert("The date has already passed");
        return;
    }

    let futureYear = futureValueForCounter.getFullYear();
    let futureMonth = futureValueForCounter.getMonth();
    let futureDay = futureValueForCounter.getDate();

    let currentYear = currentDateTime.getFullYear();
    let currentMonth = currentDateTime.getMonth();
    let currentDay = currentDateTime.getDate();


    let years = futureYear - currentYear;
    let months = futureMonth - currentMonth;
    if (months < 0) {
        years--;
        months += 12;
    }

    let lastMonthDate = new Date(futureYear, futureMonth, 0).getDate();
    let days = futureDay - currentDay;
    if (days < 0) {
        months--;
        if (months < 0) {
            years--;
            months += 12;
        }
        days += lastMonthDate;
    }

    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((diff / (1000 * 60)) % 60);
    let seconds = Math.floor((diff / 1000) % 60);

    countDownerDisplay.innerHTML =
        years.toString().padStart(2, '0') + ":" +
        months.toString().padStart(2, '0') + ":" +
        days.toString().padStart(2, '0') + ":" +
        hours.toString().padStart(2, '0') + ":" +
        minutes.toString().padStart(2, '0') + ":" +
        seconds.toString().padStart(2, '0');
}

function changeCalendarInputTime() {
    let currenDate = new Date();
    let year = currenDate.getFullYear();
    let month = currenDate.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    calendarInput.value = year + '-' + month;
    calendarDisplay.innerHTML = currenDate.getFullYear().toString().padStart(2, '0') + ' ' + months[currenDate.getMonth() + 1];
}

countDowner.addEventListener('input', (input) => {

    futureValueForCounter = new Date(input.target.value);

    setInterval(() => changeCountDownDisplay(), 1000);
});

setInterval(() => {
    changeHour();
}, 1000);
changeCalendarInputTime()