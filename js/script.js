
// dátum kezelés változói
const todayElement = document.querySelector('.date__dayName');
const dateElement = document.querySelector('.date__numericDate');

// input mező és input gomb elemek kiválasztása és a gombra kettintás figyelése
const buttonElement = document.querySelector('.add__button');
const inputElement = document.querySelector('.add__input');
buttonElement.addEventListener('click', clickHandler);

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


// gomb lenyomására az input mező tartamát kiírjuk a console-ra

function clickHandler() {
    input = inputElement.value;
    // ha üres a beviteli mező, nem történik semmi
    if (!input) return; 
    //inputElement
    inputElement.value = '';
    console.log(input);
}


