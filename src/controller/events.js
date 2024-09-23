import { listRenderer, renderTasks } from '../view/listRenderer.js';
import { defaultProjects, todoItem } from '../model/data.js';
import { appendTask, getProjectInput } from '../view/projects';
import { getDefaultProjects, saveDefaultProjects, saveProjects } from '../model/storage';
import { renderPlaceholderImage } from '../utils/helpers';

const { inboxTasks, todayTasks, tomorrowTasks } = getDefaultProjects();
defaultProjects.push(inboxTasks, todayTasks, tomorrowTasks);

let currentList = inboxTasks;

function updateTaskCount() {
    const inboxCount = document.querySelector('.inbox-count');
    const todayCount = document.querySelector('.today-count');
    const tomorrowCount = document.querySelector('.tomorrow-count');

    inboxCount.textContent = inboxTasks.taskCount;
    todayCount.textContent = todayTasks.taskCount;
    tomorrowCount.textContent = tomorrowTasks.taskCount;
}

export function setupInputListener() {
    const input = document.querySelector('.new-task');
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && input.value.length > 0) {
            const newTask = new todoItem(input.value, '', '', '', []);
            currentList.addTask(newTask);
            appendTask(newTask) // ! might be the reason for the taskCount removing buttons
            input.value = '';
            updateTaskCount();
            saveProjects();
            saveDefaultProjects();
        }
    });
}

function setupEventListeners() {
    // initialize list with inbox
    currentList = inboxTasks;
    listRenderer('Inbox');
    renderTasks(currentList.tasks);
    updateTaskCount();

    // buttons to load lists

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
    const infoBody = document.querySelector('.todo');

    currentList.deleteTask(task);
    updateTaskCount();
    saveProjects();
    infoBody.innerHTML = '';
    renderPlaceholderImage();
}

export function setCurrentList(projectName) {
    currentList = projectName;
}

export function updateTasks() {
    renderTasks(currentList.tasks);
    saveProjects();
    saveDefaultProjects();
}

export default setupEventListeners;