import { createElement } from '../utils/helpers';
import { createProject } from '../model/data';
import { checkEvent, optionsEvent, setCurrentList } from '../controller/events';
import { listRenderer, renderTaskInfo, renderTasks } from './listRenderer';
import optionsIcon from '../assets/icons/options.svg';

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
    const projectContainer = createElement('div', '', { class: 'projects sidebar-option' });
    const projectTitle = createElement('p', project.name, { class: 'project-title' });
    const projectCount = createElement('p', project.taskCount, { class: 'project-count' });

    projectContainer.addEventListener('click', () => {
        setCurrentList(project);
        listRenderer(project.name);
        renderTasks(project.tasks);
    });

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(projectCount);
    container.appendChild(projectContainer);
}

export function getProjectInput() {
    const addButton = document.querySelector('.plus-icon');
    addButton.style.visibility = 'hidden';

    const container = document.querySelector('.projects');
    const inputBox = createElement('div', '', { class: 'project-input' });
    const inputField = createElement('input', '', { class: 'input-field' });
    inputField.type = 'text';
    inputField.placeholder = 'Enter project name';

    inputBox.appendChild(inputField);
    container.appendChild(inputBox);

    let project;
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const projectName = inputField.value.trim();
            if (projectName) {
                addButton.style.visibility = 'visible';
                inputBox.remove();
                project = createProject(projectName);
                if (project) {
                    appendProject(project);
                    setCurrentList(project);
                    listRenderer(project.name);
                }
            } else {
                alert('Please enter a valid project name');
            }
        }
    });

    inputField.focus();
    // return (project);
}