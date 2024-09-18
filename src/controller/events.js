import { listRenderer, renderTasks } from '../view/listRenderer.js';
import { initLists, todoItem } from '../model/data.js';
import { appendTask, getProjectInput } from '../view/projects';

const { inboxTasks, todayTasks, tomorrowTasks } = initLists();
let currentList = inboxTasks;

const todoLists = {
    inbox: inboxTasks,
    today: todayTasks,
    tomorrow: tomorrowTasks
};

function updateTaskCount() {
    const inboxCount = document.querySelector('.inbox-count');
    const todayCount = document.querySelector('.today-count');
    const tomorrowCount = document.querySelector('.tomorrow-count');

    inboxCount.textContent = todoLists.inbox.getTaskCount();
    todayCount.textContent = todoLists.today.getTaskCount();
    tomorrowCount.textContent = todoLists.tomorrow.getTaskCount();
}

export function setupInputListener() {
    const input = document.querySelector('.new-task');
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && input.value.length > 0) {
            const newTask = new todoItem(input.value, '', '', '', []);
            currentList.addTask(newTask);
            appendTask(newTask)
            input.value = '';
            updateTaskCount();
            // console.log(currentList.tasks); // TODO: UPDATE TASK VIEW?
        }
    });
}

function setupEventListeners() {
    // initialize list with inbox
    // console.log("setting up event listeners!");
    currentList = todoLists.inbox;
    listRenderer('Inbox');
    renderTasks(currentList.tasks);
    updateTaskCount();

    // buttons to load lists
    const inboxButton = document.querySelector('.inbox');
    inboxButton.addEventListener('click', () => {
        currentList = todoLists.inbox;
        listRenderer('Inbox');
        renderTasks(currentList.tasks);
    });

    const todayButton = document.querySelector('.today');
    todayButton.addEventListener('click', () => {
        currentList = todoLists.today;
        listRenderer('Today');
        renderTasks(currentList.tasks);
    });

    const tomorrowButton = document.querySelector('.tomorrow');
    tomorrowButton.addEventListener('click', () => {
        currentList = todoLists.tomorrow;
        listRenderer('Tomorrow');
        renderTasks(currentList.tasks);
    });

    function addProject() {
        getProjectInput();
    }

    // button to add project
    const plusButton = document.querySelector('.plus-icon');
    plusButton.addEventListener('click', addProject);

    // initial input event listener
    setupInputListener();
}

export function checkEvent(task) {
    // todoLists.deleteTask(task);
    console.log("uhh did you delete a task? lol");
    // TODO: do?
}

export function deleteEvent(task) {
    currentList.deleteTask(task);
    renderTasks(currentList.tasks);
    updateTaskCount(currentList);
}

export function setCurrentList(projectName) {
    currentList = projectName;
    console.log(`just change current list to: ${projectName}`);
}

export function updateTasks() {
    renderTasks(currentList.tasks);
}

export function getCurrentList() {
    return currentList;
}


export default setupEventListeners;