import { createElement } from '../utils/helpers.js';
import { setupInputListener }  from '../controller/events.js';
import { appendTask } from './projects';

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
        console.log(`Priority updated: ${task.priority}`);
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

    // ! COMMENTED OUT CHECKLIST IMPLEMENTATION
    // const taskCheckList = createElement('ul', '', { class: 'checklist' });
    // if (Array.isArray(task.checklistItems) && task.checklistItems.length > 0) {
    //     task.checklistItems.forEach((item, index) => {
    //         const listItem = createElement('li', '', { contenteditable: 'true' });
    //         const checkbox = createElement('input', '', { type: 'checkbox', checked: item.done });
    //         const text = createElement('span', item.text);
    //
    //         checkbox.addEventListener('change', () => {
    //             task.checklistItems[index].done = checkbox.checked;
    //             console.log('Checklist updated:', task.checklistItems);
    //             // You might want to update the task list or save the updated task here
    //             // updateTaskInTaskList(task); // Uncomment this if you have such a function
    //         });
    //
    //         listItem.appendChild(checkbox);
    //         listItem.appendChild(text);
    //         taskCheckList.appendChild(listItem);
    //     });
    // } else {
    //     const noItemsMessage = createElement('li', 'No checklist items.');
    //     taskCheckList.appendChild(noItemsMessage);
    // }
    //
    // const newItemInput = createElement('input', '', { type: 'text', placeholder: 'Add a new item' });
    // newItemInput.addEventListener('keydown', (e) => {
    //     if (e.key === 'Enter') {
    //         const newItemText = newItemInput.value.trim();
    //         if (newItemText) {
    //             task.checklistItems.push({ text: newItemText, done: false });
    //             renderTaskInfo(task); // re-render to include the new item
    //             // updateTaskInTaskList(task); // TODO: implement function
    //         }
    //     }
    // });

    // infoBody.appendChild(taskCheckList);
    // infoBody.appendChild(newItemInput);

    // update the task when 'Enter' is pressed
    [infoTitle, taskDescription].forEach(field => {
        field.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();  // prevent newline in contenteditable
                task.title = infoTitle.textContent;
                task.description = taskDescription.textContent;
                field.blur();

                // update task title in the task list
                // ! updateTaskInTaskList(task); uhh you're forgerring me :c TODO: implement this function

                console.log('Task updated:', task);
            }
        });
    });

    taskDueDate.addEventListener('change', () => {
        task.dueDate = taskDueDate.value;
        console.log(`Due date updated: ${task.dueDate}`);
    });
}

export default listRenderer;