// dátum kezelés változói
const todayElement = document.querySelector('.date__dayName');
const dateElement = document.querySelector('.date__numericDate');

// Pendig szövegmező változója
const pendingDisplay = document.querySelector('.text__pending');

// todo lista container változója
const todoListContainer = document.querySelector('.todoList__container');

// completed todo lista container változója
const todoCompletedListContainer = document.querySelector('.todoCompletedList__container');

// input mező és input gomb elemek kiválasztása és a gombra kettintás figyelése
const inputElement = document.querySelector('.add__input');
const addBtnElement = document.querySelector('.add__button');
addBtnElement.addEventListener('click', addBtnClickHandler);

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
    },

    //  dbHandler.completeTodo(str)
    // megkeresi a tömb elemei között a megadott stringet és annak az elemnek
    // a done állapotát true-ra állítja, majd tárol és megjelenít
    completeTodo: function (todo) {
        todoDB.forEach((item, index) => {
            if (item.todo === todo) {
                todoDB[index].done = true;
            }
        })
        localStorageHandler.store(todoDB);
        displayPendingTodos();
    }
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
}


// dateHandler - dátum kezelő objektum
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

// a todoDB-ből kiírja a pending státuszben lévő elememket
function displayPendingTodos() {
    let num = dbHandler.getNumberOfPending();
    pendingDisplay.innerHTML = `You have ${num} pending items`;
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
}

// Div elem generálása
function createDiv() {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo__div'
    todoDiv.addEventListener('mouseenter', ev => {
        todo = ev.target.childNodes[1].innerText;
        const selectedDeleteBtn = ev.target.lastChild;
        selectedDeleteBtn.classList.add('todo__deleteButton--active')
    });
    todoDiv.addEventListener('mouseleave', ev => {
        const selectedDeleteBtn = ev.target.lastChild;
        selectedDeleteBtn.classList.remove('todo__deleteButton--active')
    });
    return todoDiv;
}

// Checkbox elem generálása
function createCheckbox() {
    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.className = 'todo__checkbox';
    checkboxElement.addEventListener('click', ev => {
        if (checkboxElement.checked === true) {
            let todo = ev.target.nextSibling.innerText;
            ev.target.parentElement.remove();
            dbHandler.completeTodo(todo);
        }
        else {
            document.querySelector('.testdiv').classList.remove('testdiv--alt');
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


// Span elem generálása
function createDeleteBtnElement() {
    const deleteBtnElement = document.createElement('button');
    deleteBtnElement.className = 'todo__deleteButton';
    deleteBtnElement.innerText = '\u2716';
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
    const todoDiv = createDiv();
    // CHECKBOX
    const checkboxElement = createCheckbox();
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
    /*    todoListContainer.appendChild(todoDiv);
        todoDiv.appendChild(checkboxElement);
        todoDiv.appendChild(spanElement);
        todoDiv.appendChild(deleteBtnElement);*/
}

/* --- JS INIT --- */
// A dátum kiírása
todayElement.innerHTML = dateHandler.getCurrentDay();
dateElement.innerHTML = dateHandler.getCurrentDate();


// DB változó: olyan tömb, ami objektumokat tárol
// a LS-ban tárolt lista betöltése
todoDB = localStorageHandler.read('todo');

if (todoDB != null && todoDB && Array.isArray(todoDB)) {
    // A pending elemek számának kiírása
    displayPendingTodos();
    dbListHandler.displayTodoList();
} else {
    // https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/
    todoDB = [
        { todo: 'Go to codepen and get inspired', done: false },
        { todo: 'Pick a project', done: false },
        { todo: 'Create a new pen', done: true },
    ];
    displayPendingTodos();
    dbListHandler.displayTodoList();

}
