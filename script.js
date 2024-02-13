// Calendar
const calendar = document.querySelector('.calendar');
const date = document.querySelector('.date');
const daysContainer = document.querySelector('.days');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const todayButton = document.querySelector('.today-btn');
const gotoButton = document.querySelector('.goto-btn');
const dateInput = document.querySelector('.date-input');

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

function initCalendar() {
    const firstDay = new Date(year, month, 0);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay();

    date.innerHTML = months[month] + ' ' + year;
    let days = '';

    for (let x = day; x > 0; --x) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }
    for (let i = 1; i <= lastDate; ++i) {
        if ((i === today.getDate()) && (year === today.getFullYear()) && (month === today.getMonth())) {
            days += `<div class="day today">${i}</div>`;
        } else {
            days += `<div class="day">${i}</div>`;
        }
    }
    for (let j = 1; j <= nextDays; ++j) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
}
initCalendar();

function prevMonth() {
    --month;
    if (month < 0) {
        month = 11;
        --year;
    }
    initCalendar();
}
function nextMonth() {
    ++month; 
    if (month > 11) {
        month = 0;
        ++year;
    }
    initCalendar();
}

prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);

todayButton.addEventListener('click', () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener('keyup', (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }
});

function gotoDate() {
    const dateArr = dateInput.value.split('/');
    if(dateArr.length === 2) {
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert('invalid date!');
}

gotoButton.addEventListener('click', gotoDate);



// Notes
const notesContainer = document.querySelector('.notes-container');
const createButton = document.querySelector('.btn');
let notes = document.querySelectorAll('.input-box');

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes');
}
showNotes();

function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

function buttonClick() {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = 'input-box';
    inputBox.setAttribute('contenteditable', 'true');
    img.src = 'https://png.pngtree.com/png-vector/20220926/ourmid/pngtree-delete-button-3d-icon-png-image_6217492.png';
    notesContainer.appendChild(inputBox).appendChild(img);
}

function deleteNotes(e) {
    if (e.target.tagName === 'IMG') {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === 'P') {
        notes = document.querySelectorAll('.input-box');
        notes.forEach(nt => {
            nt.onkeyup = function() {
                updateStorage();
            } 
        })
    }
}

createButton.addEventListener('click', buttonClick);
notesContainer.addEventListener('click', deleteNotes);

document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        document.execCommand('insertLineBreak');
        event.preventDefault();
    }
})



// My day
const addButton = document.querySelector('#add-btn');
const newTaskInput = document.querySelector('#text');
const taskContainer = document.querySelector('#tasks');
const error = document.getElementById('error');

function addTask() {
    const taskName = newTaskInput.value;
    error.style.display = 'none';
    if (!taskName) {
        setTimeout(() => {
            error.style.display = 'block';
        }, 0);
        return;
    }

    const task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="delete">
        <i class="fa-solid fa-trash-can"></i>
        </button>
    </div>`;

    taskContainer.insertAdjacentHTML('beforeend', task);

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
        };
    });
    newTaskInput.value = '';
}

addButton.addEventListener('click', addTask);

window.onload = () => {
    newTaskInput.value = "";
}



// Random quote generation
const quote = document.getElementById('motivationalQuote');
const author = document.getElementById('author');
const apiUrl = 'http://api.quotable.io/random';

async function getQuote(url) {
    const response = await fetch(url);
    let data = await response.json();

    quote.innerHTML = data.content;
    author.innerHTML = data.author;
}
getQuote(apiUrl);



// eventListener for activating buttons
document.addEventListener('DOMContentLoaded', function() {
    const calendarButton = document.getElementById('calendar');
    const mainCalendar = document.getElementById('mainCalendar');
    const notesButton = document.getElementById('notes');
    const mainNotes = document.getElementById('mainNotes');
    const myDayButton = document.getElementById('myDay');
    const mainMyDay = document.getElementById('mainMyDay');

    calendarButton.addEventListener('click', function() {
        mainCalendar.style.display = 'block';
        mainNotes.style.display = 'none';
        mainMyDay.style.display = 'none';
    });

    notesButton.addEventListener('click', function() {
        mainNotes.style.display = 'block';
        mainCalendar.style.display = 'none';
        mainMyDay.style.display = 'none';
    });

    myDayButton.addEventListener('click', function() {
        mainMyDay.style.display = 'block';
        mainCalendar.style.display = 'none';
        mainNotes.style.display = 'none';
    })
});

