
// dátum kezelés változói
const todayElement = document.querySelector('.date__dayName');
const dateElement = document.querySelector('.date__numericDate');

// input mező és input gomb elemek kiválasztása és a gombra kettintás figyelése
const buttonElement = document.querySelector('.add__button');
const inputElement = document.querySelector('.add__input');
buttonElement.addEventListener('click', clickHandler);

// todo JSON alapbeállítása 2 előre elkészített elemmel
// olyan tömb, ami objektumokat tárol
// https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/
let todoDB = [
    { 'id': 0, 'todo': 'Go to codepen and get inspired', 'done': false },
    { 'id': 1, 'todo': 'Pick a project', 'done': false },
    { 'id': 2, 'todo': 'Create a new pen', 'done': false },
];

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
    // inputElement törlése, ha bevitel megtörtént
    inputElement.value = '';
    // ha lenyomom a gombot, egy timestampet rögzítek
    let timestamp = Date.now();
    console.log(timestamp);
    // key=timestamp, value
    return (timestamp, input);
}

// localStorage kezelő objektum
const localStorageHandler = {
    storeItem: function (database) {
        localStorage.setItem('todo', JSON.stringify(database))
    }
}


/* működés:
induláskor beolvassa a LS-et: key: todo, value: JSON adat
Ezt a todoDB változóban tárolja, ami egy objektumokat tartalmazó tömb:
{ 'id': x=int, 'todo': str='', 'done': bool=boolean },


*/