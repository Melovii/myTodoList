import { listRenderer, renderTasks } from '../view/listRenderer.js';
import { initLists, todoItem } from '../model/data.js';
import { appendTask, getProjectInput } from '../view/projects';
import { saveLocal } from "../model/storage";

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
    saveLocal();
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
            saveLocal();
        }
    });
}

function setupEventListeners() {
    // initialize list with inbox
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

export function deleteEvent(task) {
    currentList.deleteTask(task);
    renderTasks(currentList.tasks);
    updateTaskCount(currentList);
    saveLocal();
}

export function setCurrentList(projectName) {
    currentList = projectName;
}

export function updateTasks() {
    renderTasks(currentList.tasks);
    saveLocal();
}

export default setupEventListeners;