import { listRenderer, renderTasks } from '../view/listRenderer.js';
import { initLists, todoItem } from '../model/data.js';
import { appendTask, getProjectInput } from '../view/projects';
import {getDefaultProjects, loadDefaultProjects, saveDefaultProjects, saveProjects} from "../model/storage";

const { inboxTasks, todayTasks, tomorrowTasks } = getDefaultProjects();
let currentList = inboxTasks;
updateTaskCount();
initLists();
saveDefaultProjects();

function updateTaskCount() {
    const inboxCount = document.querySelector('.inbox-count');
    const todayCount = document.querySelector('.today-count');
    const tomorrowCount = document.querySelector('.tomorrow-count');

    inboxCount.textContent = inboxTasks.taskCount;
    todayCount.textContent = todayTasks.taskCount;
    tomorrowCount.textContent = tomorrowTasks.taskCount;
    // saveDefaultProjects();
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
            saveProjects();
        }
    });
}

function setupEventListeners() {
    // // initialize list with inbox
    currentList = inboxTasks;
    listRenderer('Inbox');
    renderTasks(currentList.tasks);
    updateTaskCount();

    // // buttons to load lists

    const inboxButton = document.querySelector('.inbox');
    inboxButton.addEventListener('click', () => {
        currentList = inboxTasks;
        listRenderer('Inbox');
        renderTasks(currentList.tasks);
    });

    const todayButton = document.querySelector('.today');
    todayButton.addEventListener('click', () => {
        currentList = todayTasks;
        listRenderer('Today');
        renderTasks(currentList.tasks);
    });

    const tomorrowButton = document.querySelector('.tomorrow');
    tomorrowButton.addEventListener('click', () => {
        currentList = tomorrowTasks;
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
    saveProjects();
}

export function setCurrentList(projectName) {
    currentList = projectName;
}

export function updateTasks() {
    renderTasks(currentList.tasks);
    // saveProjects();
}

export default setupEventListeners;