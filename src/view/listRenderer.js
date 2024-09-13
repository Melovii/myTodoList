console.log('listRenderer.js is being executed');

import createElement from "../utils/helpers.js";
import optionsIcon from "../assets/icons/options.svg";
import { checkEvent, optionsEvent }  from '../controller/events.js';

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
    // reset tasks list
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    // append tasks to tasks list
    tasks.forEach((task) => appendTask(task));
}

export function renderTaskInfo(task) {
    // reset task info section
    const container = document.querySelector('.todo');
    container.innerHTML = '';

    const infoHeader = createElement('div', '', { class: 'info-header' });
    container.appendChild(infoHeader);

    const titleContainer = createElement('div', '', { class: 'title-container'} );
    const infoTitle = createElement('p', task.title, { class: 'info-title' });
    infoTitle.style.fontSize = '23px';
    infoTitle.style.margin = '25px 0';
    titleContainer.appendChild(infoTitle);
    infoHeader.appendChild(titleContainer);

    const infoUtil = createElement('div', '', { class: 'info-util' });

    const taskDueDate = createElement('p', `Due Date: ${task.description}`);
    infoUtil.appendChild(taskDueDate);

    const taskPriority = createElement('p', `Priority: ${task.dueDate}`);
    infoUtil.appendChild(taskPriority);
    infoHeader.appendChild(infoUtil);

    const divider = createElement('div', '', { class: 'divider' });
    container.appendChild(divider);

    const infoBody = createElement('div', '', { class: 'info-body' });
    container.appendChild(infoBody);

    const taskDescription = createElement('p', `Description: ${task.priority}`);
    infoBody.appendChild(taskDescription);

    const taskCheckList = createElement('ul', '', { class: 'checklist' });
    if (Array.isArray(task.checklistItems) && task.checklistItems.length > 0) {
        task.checklistItems.forEach(item => {
            const listItem = createElement('li', item);
            taskCheckList.appendChild(listItem);
        });
    } else {
        const noItemsMessage = createElement('li', 'No checklist items.');
        taskCheckList.appendChild(noItemsMessage);
    }
    infoBody.appendChild(taskCheckList);
}



export function appendTask(task) {
    const taskList = document.querySelector('.task-list');

    const taskContainer = createElement('div', '', { class: 'task-container' });
    const taskTitle = createElement('p', task.title);
    const optionContainer = createElement('div', '', { class: 'option-container' });
    const checkMark = createElement('div', '', { class: 'checkmark' });
    const optionDots = createElement('img', '', { class: 'options' });
    const divider = createElement('div', '', { class: 'divider'} );

    taskTitle.style.cursor = 'pointer';
    taskTitle.addEventListener('click', () => renderTaskInfo(task));

    optionDots.src = optionsIcon;
    checkMark.addEventListener('click', () => checkEvent(task));
    optionDots.addEventListener('click', () => optionsEvent(task));

    optionContainer.appendChild(checkMark);
    optionContainer.appendChild(optionDots);

    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(optionContainer);
    taskList.appendChild(taskContainer);
    taskList.appendChild(divider);
}

export default listRenderer;