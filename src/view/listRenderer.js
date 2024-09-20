import { createElement } from '../utils/helpers.js';
import {setupInputListener, updateTasks} from '../controller/events.js';
import { appendTask } from './projects';
import {saveLocal} from "../model/storage";

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
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    tasks.forEach((task) => appendTask(task));
}

export function renderTaskInfo(task) {
    const container = document.querySelector('.todo');
    container.innerHTML = '';

    const infoHeader = createElement('div', '', { class: 'info-header' });
    container.appendChild(infoHeader);

    const titleContainer = createElement('div', '', { class: 'title-container' } );
    const infoTitle = createElement('p', task.title, { class: 'info-title', contenteditable: 'true' });
    infoTitle.style.fontSize = '23px';
    infoTitle.style.margin = '25px 0';
    titleContainer.appendChild(infoTitle);
    infoHeader.appendChild(titleContainer);

    const infoUtil = createElement('div', '', { class: 'info-util' });

    const containerDueDate = createElement('div', '', { class: 'date-container'} );
    const taskDueDateLabel = createElement('label', 'Due: ');
    const taskDueDate = createElement('input', '', { type: 'date', value: task.dueDate });
    containerDueDate.appendChild(taskDueDateLabel);
    containerDueDate.appendChild(taskDueDate);
    infoUtil.appendChild(containerDueDate);

    const containerPriority = createElement('div', '', { class: 'priority-container'} );
    const priorityLabel = createElement('label', 'Priority: ');
    const prioritySelect = createElement('select', '', { class: 'priority-select' });

    ['low', 'medium', 'high'].forEach((level) => {
        const option = createElement('option', level.charAt(0).toUpperCase() + level.slice(1), { value: level });
        if (task.priority === level) {
            option.selected = true;
        }
        prioritySelect.appendChild(option);
    });

    prioritySelect.addEventListener('change', (e) => {
        task.priority = e.target.value;
        saveLocal();
    });

    containerPriority.appendChild(priorityLabel);
    containerPriority.appendChild(prioritySelect);
    infoUtil.appendChild(containerPriority);
    infoHeader.appendChild(infoUtil);

    const divider = createElement('div', '', { class: 'divider' });
    container.appendChild(divider);

    const infoBody = createElement('div', '', { class: 'info-body' });
    container.appendChild(infoBody);

    const taskDescription = createElement('p', task.description, { contenteditable: 'true' });
    infoBody.appendChild(taskDescription);

    // update the task when 'Enter' is pressed
    [infoTitle, taskDescription].forEach(field => {
        field.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();  // prevent newline in contenteditable
                task.title = infoTitle.textContent;
                task.description = taskDescription.textContent;
                field.blur();

                // update task title in the task list
                updateTasks();
            }
        });
    });

    taskDueDate.addEventListener('change', () => {
        task.dueDate = taskDueDate.value;
        saveLocal();
    });
}