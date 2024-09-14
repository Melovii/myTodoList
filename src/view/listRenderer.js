import {todoList} from "../model/data";

console.log('listRenderer.js is being executed');

import createElement from "../utils/helpers.js";
import optionsIcon from "../assets/icons/options.svg";
import { checkEvent, optionsEvent, setupInputListener }  from '../controller/events.js';

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
    setupInputListener();
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
    const infoTitle = createElement('p', task.title, { class: 'info-title', contenteditable: 'true' }); // TODO: make it not work when blank
    infoTitle.style.fontSize = '23px';
    infoTitle.style.margin = '25px 0';
    titleContainer.appendChild(infoTitle);
    infoHeader.appendChild(titleContainer);

    const infoUtil = createElement('div', '', { class: 'info-util' });

    const taskDueDate = createElement('p', task.dueDate);
    infoUtil.appendChild(taskDueDate);

    const taskPriority = createElement('p', task.description, { contenteditable: 'true' }); // TODO: make it work for only numbers n allat
    infoUtil.appendChild(taskPriority);
    infoHeader.appendChild(infoUtil);

    const divider = createElement('div', '', { class: 'divider' });
    container.appendChild(divider);

    const infoBody = createElement('div', '', { class: 'info-body' });
    container.appendChild(infoBody);

    const taskDescription = createElement('p', task.priority, { contenteditable: 'true' });
    infoBody.appendChild(taskDescription);

    const taskCheckList = createElement('ul', '', { class: 'checklist' });
    if (Array.isArray(task.checklistItems) && task.checklistItems.length > 0) {
        task.checklistItems.forEach(item => {
            const listItem = createElement('li', item, { contenteditable: 'true' });
            taskCheckList.appendChild(listItem);
        });
    } else {
        const noItemsMessage = createElement('li', 'No checklist items.', { contenteditable: 'true' });
        taskCheckList.appendChild(noItemsMessage);
    }
    infoBody.appendChild(taskCheckList);

    // Handle updating the task when 'Enter' is pressed
    [infoTitle, taskDueDate, taskPriority, taskDescription].forEach(field => {
        field.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();  // prevent newline in contenteditable

                // update the task properties
                task.title = infoTitle.textContent;
                task.dueDate = taskDueDate.textContent.replace('Due Date: ', '');
                task.priority = taskPriority.textContent.replace('Priority: ', '');
                task.description = taskDescription.textContent.replace('Description: ', '');

                // unfocus
                field.blur();

                // Update the task list view everywhere
                // renderTasks(tasks); // ! UHH TODO: UHHH SHOULD BE ABLE TO RENDER TASKS???
                console.log('so uhh, I work??');
            }
        });
    });
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

export function appendProject(project) {
    const container = document.querySelector('.sidebar');
    const projectContainer = createElement('div', '', { class: 'sidebar-option projects' });
    const projectTitle = createElement('p', project.name);

    projectContainer.addEventListener('click', () => {
        listRenderer(project.name);
        renderTasks(project.tasks);
    });

    projectContainer.appendChild(projectTitle);
    container.appendChild(projectContainer);
}

export default listRenderer;