console.log('events.js is being executed');

import {appendTask, listRenderer, renderTasks} from '../view/listRenderer.js';
import { initLists, todoItem } from '../model/data.js';

const { inboxTasks, todayTasks, tomorrowTasks } = initLists();
let currentList = inboxTasks; // Ensure this always references a todoList instance

const todoLists = {
    inbox: inboxTasks,
    today: todayTasks,
    tomorrow: tomorrowTasks
};

function setupEventListeners() {
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
        // TODO: loadProjectOption(); // import from projects.js
    }

    // button to add project
    const plusButton = document.querySelector('.plus-icon');
    plusButton.addEventListener('click', addProject);

    // to-do object input
    const input = document.querySelector('.new-task');
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && input.value.length > 0) {
            // input.blur();
            const newTask = new todoItem(input.value, '', '', '', []);
            currentList.addTask(newTask);
            appendTask(newTask)
            input.value = '';
            console.log(currentList.tasks); // TODO: UPDATE TASK VIEW?
        }
    });
}

export default setupEventListeners;
