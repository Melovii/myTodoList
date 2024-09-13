console.log('listRenderer.js is being executed');

import createElement from "../utils/helpers.js";

export function listRenderer(title) {
    const container = document.querySelector('.list');
    container.innerHTML = '';

    const mainTitle = createElement('p', title, { class: 'task-list-title' });
    mainTitle.style.fontSize = '38px';
    mainTitle.style.margin = '25px 0';
    container.appendChild(mainTitle);

    const divider = createElement('div', '', { class: 'divider' });
    container.appendChild(divider);

    const placeholder = '+ Add a task. Press Enter to save.'
    const input = createElement('input', '', { class: 'new-task', type: 'text', placeholder: placeholder });

    const taskListElement = createElement('div', '', { class: 'task-list' });

    container.appendChild(input);
    container.appendChild(taskListElement);
}

export function renderTasks(tasks) {
    // now we have (tasks) which for example returns Inbox or Project-Name
}

export function appendTask(task) {
    const listContainer = document.querySelector('.task-list');
    const taskContainer = createElement('div', '', { class: 'task-container' });
    const taskTitle = createElement('p', task.title);
    const checkMark = createElement('div', '', { class: 'checkmark' });

    taskContainer.appendChild(taskTitle); // TODO: append title and priority and maaybe duedate
    taskContainer.appendChild(checkMark);

    listContainer.appendChild(taskContainer);
}

export default listRenderer;