console.log('events.js is being executed');

import {appendProject, appendTask, listRenderer, renderTasks} from '../view/listRenderer.js';
import {createProject, initLists, todoItem} from '../model/data.js';

const { inboxTasks, todayTasks, tomorrowTasks } = initLists();
let currentList = inboxTasks; // Ensure this always references a todoList instance

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
            console.log(currentList.tasks); // TODO: UPDATE TASK VIEW?
        }
    });
}

function setupEventListeners() {
    // initialize list with inbox
    console.log("setting up event listeners!");
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
        console.log('testing "add project" button');
        let project = createProject('name');
        if (project)
            appendProject(project);
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

export function optionsEvent(task) {
    console.log('bomboclatt?');
    // TODO: display task options
}


export default setupEventListeners;
