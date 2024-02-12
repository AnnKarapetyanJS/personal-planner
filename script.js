// Calendar
const calendar = document.querySelector('.calendar');
const date = document.querySelector('.date');
const daysContainer = document.querySelector('.days');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

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

// Function to add days

function initCalendar() {
    const firstDay = new Date(year, month, 0);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay();

    // update date on top of the calendar
    date.innerHTML = months[month] + ' ' + year;

    // adding days to the DOM
    let days = '';

    // previous month days
    for (let x = day; x > 0; --x) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    // current month days
    for (let i = 1; i <= lastDate; ++i) {
        // if day is today, add class today
        if (
            i === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth()
        ) {
            days += `<div class="day today">${i}</div>`;
        }
        // add remaining as it is
        else {
            days += `<div class="day">${i}</div>`;
        }
    }

    // next month days
    for (let j = 1; j <= nextDays; ++j) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
}
initCalendar();


// previous month
function prevMonth() {
    --month;
    if (month < 0) {
        month = 11;
        --year;
    }
    initCalendar();
}

// next month
function nextMonth() {
    ++month; 
    if (month > 11) {
        month = 0;
        ++year;
    }
    initCalendar();
}

// adding eventListeners on prev and next

prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);


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
const countValue = document.querySelector('#count-value');
let taskCount = 0;

function displayCount(taskCount) {
    countValue.innerText = taskCount;
}

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
        </button>
        <button class="delete">
        <i class="fa-solid fa-trash-can"></i>
        </button>
    </div>`;

    taskContainer.insertAdjacentHTML('beforeend', task);

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount--;
            displayCount(taskCount);
        };
    });

    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.className === 'edit')) {
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount--;
            displayCount(taskCount);
        };
    });

    const tasksCheck = document.querySelectorAll('.task-check');
        tasksCheck.forEach((checkBox) => {
        checkBox.addEventListener('change', () => {
            checkBox.nextElementSibling.classList.toggle('completed');
            if (checkBox.checked) {
                taskCount--;
            } else {
                taskCount++;
            }
            displayCount(taskCount);
        });
    });


    taskCount++;
    displayCount(taskCount);
    newTaskInput.value = '';
}

addButton.addEventListener('click', addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
}



// eventListener for activating buttons
document.addEventListener('DOMContentLoaded', function() {
    const calendarButton = document.getElementById('calendar');
    const notesButton = document.getElementById('notes');
    // const mainCalendar = document.getElementById('mainCalendar');
    // const mainNotes = document.getElementById('mainNotes');

    calendarButton.addEventListener('click', function() {
        mainCalendar.style.display = 'block';
        mainNotes.style.display = 'none';
    });

    notesButton.addEventListener('click', function() {
        mainNotes.style.display = 'block';
        mainCalendar.style.display = 'none';
    });
});

