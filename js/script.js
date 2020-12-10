const todayElement = document.querySelector('.date__dayName');
const dateElement = document.querySelector('.date__numericDate');

const dateHandler = {
    getCurrentDay: function () {
        let now = new Date();
        currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now.getDay());
        return (currentDay);
    },
    getCurrentDate: function () {
        let now = new Date();
        let day = now.getDate();
        let month = now.getMonth() + 1;
        let year = now.getFullYear();
        currentDate = `${month}-${day}-${year}`;
        return (currentDate);
    },
}

// A dátum kiírása
console.log(dateHandler.getCurrentDate());
todayElement.innerHTML = dateHandler.getCurrentDay();
dateElement.innerHTML = dateHandler.getCurrentDate();