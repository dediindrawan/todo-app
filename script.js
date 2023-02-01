// create variable to set local storage for tasks index array
const tasksArray = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

// create variable to set local storage for username index array
const userArray = localStorage.getItem('names') ? JSON.parse(localStorage.getItem('names')) : [];

// display function on window onload
window.onload = function () {
    displayContent();
    displayTotalTask();
    displayClock();
    displayDate();
};

// initialize button add in username input box
document.querySelector('.btn-submit').addEventListener('click', () => {
    const userInput = document.querySelector('.user-input');
    if (userInput.value == '') {
        document.querySelector('.wrapper-alert-login').style.display = 'block';
    } else {
        createUserName(userInput);
    };
    userInput.value = '';
});

// initialize function create username input for saving array on local storage
function createUserName(userInput) {
    userArray.push(userInput.value)
    localStorage.setItem('names', JSON.stringify(userArray));
    location.reload();
};

// execution function and display username
function displayUsername() {
    let user = ''
    user = `${userArray}`
    document.querySelector('.username').innerHTML = `Hi, ${user}`;
    document.querySelector('.avatar').innerHTML = `${user[0]}`;
    if (userArray != 0) {
        document.querySelector('.wrapper-registration').style.display = 'none';
    };
};
displayUsername();

// close page after user input their name
function closeAlertlogin() {
    document.querySelector('.wrapper-alert-login').style.display = 'none';
};

// open page every user want edit or change their name
function editName() {
    document.querySelector('.wrapper-registration').style.display = 'block';
    const userInput = document.querySelector('.user-input');
    userInput.value = userArray;
    userArray.splice(userInput.value);
    userInput.focus();
};

// open page app info on click information icon
function openInfoApp() {
    document.querySelector('.info-app').classList.toggle('info-app-opened');
};

// close page with onclick icon x on page app info
function infoAppClosed() {
    document.querySelector('.info-app').classList.toggle('info-app-opened');
};

// create funtion to set up and show about detail time
function displayClock() {
    let clockTime = document.querySelector('.clock'),
        date = new Date(), hour, minute, second, time;
    hour = set(date.getHours());
    minute = set(date.getMinutes());
    second = set(date.getSeconds());
    time = 'Am';

    if (hour >= 12) {
        hour -= 12;
        hour = hour < 10 ? '0' + hour : hour;
        time = 'Pm';
    };

    if (hour == 0) {
        hour = 12;
        hour = hour < 10 ? '0' + hour : hour;
    };

    clockTime.innerHTML = `<i class="fa-solid fa-clock"></i> ${hour}:${minute}:${second} ${time}`

    // set time out for seconds to be always run as realtime
    setTimeout('displayClock()', 1000);
};

// create function to set condition on the time display
function set(thisTime) {
    thisTime = thisTime < 10 ? '0' + thisTime : thisTime;
    return thisTime;
};

// create function to set up and show about detail date today
function displayDate() {
    const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let copyYear = document.querySelector('.info-app span');
    let today = document.querySelector('.review span h4');
    let dateTime = document.querySelector('.date-time'),
        date = new Date(), day, month, dates, year;
    day = dayIndex[date.getDay()];
    month = monthIndex[date.getMonth()];
    dates = date.getDate();
    year = date.getFullYear();

    dates = dates < 10 ? '0' + dates : dates;

    today.innerHTML = `${day} !`;

    dateTime.innerHTML = `${month}, ${dates}/${year}`;

    copyYear.innerHTML = `${year}`;
};

// initialize button add in task input box
document.querySelector('.btn-add').addEventListener('click', () => {
    const taskInput = document.querySelector('.task-input');
    if (taskInput.value == '') {
        document.querySelector('.wrapper-alert-btn-add').style.display = 'block';
    } else {
        createTaskInput(taskInput);
    };
});

// hide page alert on icon x button onclick
function closeAlertBtnAdd() {
    document.querySelector('.wrapper-alert-btn-add').style.display = 'none';
};

// initialize function create task input for saving array on local storage
function createTaskInput(taskInput) {
    tasksArray.push(taskInput.value)
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    location.reload();
};

// execution function and display content
function displayContent() {
    let tasks = '';
    if (tasksArray == 0) {
        tasks +=
            `
        <div class="no-task-notify">
            <i class="fa-solid fa-clipboard-list"></i>
            <h4>No Anything Tasks Here Yet !</h4>
        </div>
        `
        document.querySelector('.task-content').innerHTML = `${tasks}`;
    } else {
        for (let i = 0; i < tasksArray.length; i++) {
            tasks +=
                `
            <li class="task-item">
                <div class="list-item">
                     ${tasksArray[i]}
                </div>
                <span class="btn-delete"><i class="fa-solid fa-trash"></i></span>
            </li>
            `
        };
        document.querySelector('.task-content').innerHTML = `${tasks}`;
    };
    // create new function
    activateBtnClearAll();
    activateBtnDelete();
};

// initialize and execution button clear all
function activateBtnClearAll() {
    document.querySelector('.btn-clear-all').addEventListener('click', () => {
        if (tasksArray == 0) {
            document.querySelector('.wrapper-alert-btn-clear').style.display = 'block';
        } else {
            localStorage.removeItem('tasks');
            location.reload();
        };
    });
};

// hide page alert on icon x button onclick
function closeAlertClearAll() {
    document.querySelector('.wrapper-alert-btn-clear').style.display = 'none';
};

// initialize button delete task item
function activateBtnDelete() {
    let btnDelete = document.querySelectorAll('.btn-delete');
    btnDelete.forEach((del, i) => {
        del.addEventListener('click', () => {
            deleteTaskItem(i);
        });
    });
};

// initialize function delete task item for delete 1 index array on local storage
function deleteTaskItem(i) {
    tasksArray.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    location.reload();
};

// initialize and show total task length on array
function displayTotalTask() {
    let totalTasks = '';
    totalTasks = tasksArray.length;
    document.querySelector('.total-task').innerHTML = `<i class="fa-solid fa-bell"></i> ${totalTasks} Tasks`;
};