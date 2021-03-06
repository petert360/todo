// Completed Lista mutatás boolean változója
let completedShown = false;

// dátum kezelés változói
const todayElement = document.querySelector('.date__dayName');
const dateElement = document.querySelector('.date__numericDate');

// Pendig section változója
const chillElement = document.querySelector('.chill__element');

// Pendig szövegmező változója
const pendingDisplay = document.querySelector('.text__pending');

// Pendig szövegmező változója
const completedDisplay = document.querySelector('.text__completed');

// todo lista container változója
const todoListContainer = document.querySelector('.todoList__container');

// completed todo lista container változója
const todoCompletedContainer = document.querySelector('.completed__section');

// input mező és input gomb elemek kiválasztása és a gombra kettintás figyelése
const inputElement = document.querySelector('.add__input');
inputElement.addEventListener('input', inputElementInput);
const addBtnElement = document.querySelector('.add__button');
addBtnElement.addEventListener('click', addBtnClickHandler);

// Show/Hide complete gomb eseményfigyelő
const showBtnElement = document.querySelector('.show__button');
showBtnElement.addEventListener('click', showBtnClickHandler);

// Clear all gomb eseményfigyelő
const clearAllBtnElemnt = document.querySelector('.clear__button');
clearAllBtnElemnt.addEventListener('click', clearAllBtnClickHandler);

// localStorageHandler - localStorage kezelő objektum
const localStorageHandler = {
    // localStorageHandler.store(database)
    store: function (database) {
        localStorage.setItem('todo', JSON.stringify(database));
    },
    // localStorageHandler.read(key)
    read: function (key) {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    },
    // localStorageHandler.clear(key)
    clear: function (key) {
        localStorage.removeItem(key);
    },
}

// dbHandler - DB kezelő objektum
const dbHandler = {
    // dbHandler.getNumberOfTodos return: num
    getNumberOfTodos: function () {
        let num = 0;
        todoDB.forEach(item => {
            num += 1;
        })
        return num;
    },

    // dbHandler.getNumberOfPending return: num
    getNumberOfPending: function () {
        let num = 0;
        todoDB.forEach(item => {
            if (!item.done) num += 1;
        });
        if (num === 0) {
            setChillBackground();
        } else {
            unsetChillBackground();
        };
        return num;
    },

    getNumberOfCompleted: function () {
        let num = 0;
        todoDB.forEach(item => {
            if (item.done) num += 1;
        })
        return num;
    },

    // dbHandler.addTodo(obj)
    // hozzáadja a todoDB-hez és tárolja a localStorage-ben a változást
    addTodo: function (todo) {
        let todoObject = { todo: todo, done: false };
        todoDB.push(todoObject);
        localStorageHandler.store(todoDB);
        dbListHandler.addToList(todoObject);
        displayPendingTodos();
    },

    // dbHandler.deleteTodo(str)
    // hozzáadja a todoDB-hez és tárolja a localStorage-ben a változást
    // majd megjeleníti a pending aktuális értékét
    deleteTodo: function (todo) {
        todoDB.forEach((item, index) => {
            if (item.todo === todo) {
                todoDB.splice(index, 1);
            }
        })
        localStorageHandler.store(todoDB);
        displayPendingTodos();
        displayCompletedTodos();
    },

    //  dbHandler.completeTodo(str)
    // megkeresi a tömb elemei között a megadott stringet és annak az elemnek
    // a done állapotát true-ra állítja, majd tárol és megjelenít
    completeTodo: function (todo) {
        todoDB.forEach((item, index) => {
            if (item.todo === todo) {
                todoDB[index].done = true;
                dbListHandler.addToCompletedList(todoDB[index]);
            }
        })
        localStorageHandler.store(todoDB);
        displayPendingTodos();
        displayCompletedTodos();
    },

    // dbHandler.unCompleteTodo(str)
    // megkeresi a tömb elemei között a megadott stringet és annak az elemnek
    // a done állapotát false-ra állítja, majd tárol és megjelenít

    unCompleteTodo: function (todo) {
        todoDB.forEach((item, index) => {
            if (item.todo === todo) {
                todoDB[index].done = false;
                dbListHandler.addToList(todoDB[index]);
            }
        })
        localStorageHandler.store(todoDB);
        displayPendingTodos();
        displayCompletedTodos();
    },

    // dbHandler.clearPendingTodo
    // a PENDING todo elemek törlése
    clearPendingTodo: function () {
        for (let i = todoDB.length - 1; i >= 0; i -= 1) {
            if (!todoDB[i].done) {
                todoDB.splice(i, 1);
            }
        }
        todoListContainer.innerHTML = '';
        localStorageHandler.store(todoDB);
        displayPendingTodos();
        displayCompletedTodos();
    },
}

//dbListHandler - todo lista kezelő
const dbListHandler = {
    // displayToDoList() - a PENDING státusú elemek kiírása
    displayTodoList: function () {
        todoDB.forEach(item => {
            if (!item.done) {
                createListElement(item);
            } else {
                createCompletedListElement(item);
            }
        });
    },
    // addToList() - a PENDING listához hozzáadás
    addToList: function (todo) {
        createListElement(todo);
    },
    // addToCompletedList() - a COMPLETED listához hozzáadás
    addToCompletedList: function (todo) {
        createCompletedListElement(todo);
    },
}

// dateHandler - dátum kezelő objektum
const dateHandler = {
    getCurrentDay: function () {
        let now = new Date();
        let currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);
        return (currentDay);
    },
    getCurrentDate: function () {
        let now = new Date();
        let day = now.getDate();
        let month = now.getMonth() + 1;
        let year = now.getFullYear();
        let currentDate = `${month}-${day}-${year}`;
        return (currentDate);
    },
}

// a todoDB-ből kiírja a pending státuszben lévő elememket
function displayPendingTodos() {
    let num = dbHandler.getNumberOfPending();
    pendingDisplay.innerHTML = `You have ${num} pending items`;
}

// a todoDB-ből kiírja a completed státuszben lévő elememket
function displayCompletedTodos() {
    let num = dbHandler.getNumberOfCompleted();
    completedDisplay.innerHTML = `You have ${num} completed items`;
}

// az input mezőbe íráskor akívvá válik az input gomb
function inputElementInput() {
    if (inputElement.value === '') {
        addBtnElement.classList.remove('add__button--active');
    } else {
        addBtnElement.classList.add('add__button--active');
    }
}

// gomb lenyomására az input mező tartamát kiírjuk a console-ra
function addBtnClickHandler() {
    input = inputElement.value;
    // ha üres a beviteli mező, nem történik semmi
    if (!input) return;
    // inputElement törlése, ha bevitel megtörtént
    dbHandler.addTodo(input);
    // displayPendingTodos();
    inputElement.value = '';
    addBtnElement.classList.remove('add__button--active');
}

// gomb lenyomásására a completed list megjelenítése
function showBtnClickHandler() {
    if (completedShown) {
        todoCompletedContainer.classList.remove('completed__section--show');
        showBtnElement.innerText = 'Show complete';
        completedShown = false;
    } else {
        todoCompletedContainer.classList.add('completed__section--show');
        showBtnElement.innerText = 'Hide complete';
        completedShown = true;
    }
}

function clearAllBtnClickHandler() {
    dbHandler.clearPendingTodo();
}

// Div elem generálása
function createDiv(divName) {
    const todoDiv = document.createElement('div');
    todoDiv.className = divName;
    return todoDiv;
}

// Checkbox elem generálása
function createCheckbox(dbObject) {
    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    if (dbObject.done) {
        checkboxElement.checked = true;
    }
    checkboxElement.className = 'todo__checkbox';
    checkboxElement.addEventListener('click', ev => {
        if (checkboxElement.checked === true) {
            let todo = ev.target.nextSibling.innerText;
            ev.target.parentElement.remove();
            dbHandler.completeTodo(todo);
        }
        else {
            let todo = ev.target.nextSibling.innerText;
            ev.target.parentElement.remove();
            dbHandler.unCompleteTodo(todo);
        };
    });
    return checkboxElement;
}

// Span elem generálása
function createSpan(dbObject) {
    const spanElement = document.createElement('span');
    spanElement.className = 'todo__span';
    spanElement.innerText = dbObject.todo;
    return spanElement;
}

// Áthúzott Span elem generálása
function createCompletedSpan(dbObject) {
    const spanElement = document.createElement('span');
    spanElement.className = 'todoCompleted__span';
    spanElement.innerText = dbObject.todo;
    return spanElement;
}

// Span elem generálása
function createDeleteBtnElement() {
    const deleteBtnElement = document.createElement('button');
    deleteBtnElement.className = 'todo__deleteButton';
    //deleteBtnElement.innerText = '\u2716';
    deleteBtnElement.addEventListener('click', (ev) => {
        // delete todo from db
        let todo = ev.target.previousSibling.innerText;
        ev.target.parentElement.remove();
        dbHandler.deleteTodo(todo);
    });
    return deleteBtnElement;
}

// a todo lista elemeinek létrehozása
function createListElement(dbObject) {
    // DIV
    const todoDiv = createDiv('todo__div');
    // CHECKBOX
    const checkboxElement = createCheckbox(dbObject);
    // SPAN
    const spanElement = createSpan(dbObject);
    // DELETEBTN
    const deleteBtnElement = createDeleteBtnElement();

    // ELEMEK LÉTREHOZÁSA
    todoListContainer.appendChild(todoDiv);
    todoDiv.appendChild(checkboxElement);
    todoDiv.appendChild(spanElement);
    todoDiv.appendChild(deleteBtnElement);
}

function createCompletedListElement(dbObject) {
    // DIV
    const todoCompletedDiv = createDiv('todoCompleted__div');
    // CHECKBOX
    const checkboxElement = createCheckbox(dbObject);
    // SPAN
    const spanElement = createCompletedSpan(dbObject);
    // DELETEBTN
    const deleteBtnElement = createDeleteBtnElement();

    // ELEMEK LÉTREHOZÁSA
    todoCompletedContainer.appendChild(todoCompletedDiv);
    todoCompletedDiv.appendChild(checkboxElement);
    todoCompletedDiv.appendChild(spanElement);
    todoCompletedDiv.appendChild(deleteBtnElement);
}

function setChillBackground() {
    chillElement.classList.add('chill__element--enable');
    pendingDisplay.classList.add('text__pending--disable')
};
function unsetChillBackground() {
    chillElement.classList.remove('chill__element--enable');
    pendingDisplay.classList.remove('text__pending--disable')
};


/* --- JS INIT --- */
// A dátum kiírása
todayElement.innerText = dateHandler.getCurrentDay();
dateElement.innerText = dateHandler.getCurrentDate();

// DB változó: olyan tömb, ami objektumokat tárol
// a LS-ban tárolt lista betöltése
todoDB = localStorageHandler.read('todo');

if (todoDB != null && todoDB && Array.isArray(todoDB)) {
    // A pending elemek számának kiírása
    displayPendingTodos();
    displayCompletedTodos();
    dbListHandler.displayTodoList();
} else {
    // https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/
    todoDB = [
        { todo: 'Go to codepen and get inspired', done: false },
        { todo: 'Pick a project', done: false },
        { todo: 'Create a new pen', done: true },
    ];
    displayPendingTodos();
    displayCompletedTodos();
    dbListHandler.displayTodoList();
    localStorageHandler.store(todoDB);
}