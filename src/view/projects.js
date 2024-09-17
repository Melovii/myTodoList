import { createElement } from '../utils/helpers';
import { createProject } from '../model/data';
import {checkEvent, deleteEvent, setCurrentList} from '../controller/events';
import { listRenderer, renderTaskInfo, renderTasks } from './listRenderer';
import trashIcon from '../assets/icons/trashcan.svg';

export function appendTask(task) {
    const taskList = document.querySelector('.task-list');

    const taskContainer = createElement('div', '', { class: 'task-container' });
    const taskTitle = createElement('p', task.title);
    const checkMark = createElement('div', '', { class: 'checkmark' });
    const divider = createElement('div', '', { class: 'divider' });
    const trashContainer = createElement('div', '', { class: 'trash-container' });
    const trashCan = createElement('img', '', { class: 'trash-icon' });

    divider.style.margin = '6px';

    taskTitle.style.cursor = 'pointer';
    taskTitle.addEventListener('click', () => renderTaskInfo(task));

    checkMark.addEventListener('click', () => checkEvent(task));
    trashCan.src = trashIcon;
    trashCan.addEventListener('click', () => deleteEvent(task));

    trashContainer.appendChild(checkMark);
    trashContainer.appendChild(trashCan);

    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(trashContainer);
    taskList.appendChild(taskContainer);
    taskList.appendChild(divider);
}

export function appendProject(project) {
    const container = document.querySelector('.sidebar');
    const projectContainer = createElement('div', '', { class: 'projects sidebar-option' });
    const projectTitle = createElement('p', project.name, { class: `project-title ${project.name}` });
    const projectCount = createElement('p', project.getTaskCount(), { class: 'project-count' });

    projectContainer.addEventListener('click', () => {
        setCurrentList(project);
        listRenderer(project.name);
        renderTasks(project.tasks);
    });

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(projectCount);
    container.appendChild(projectContainer);

    const updateProjectTaskCount = () => {
        projectCount.textContent = project.getTaskCount();
    };

    project.addTask = (task) => {
        project.tasks.push(task);
        project.taskCount++;
        updateProjectTaskCount();
    };

    project.deleteTask = (task) => {
        const index = project.tasks.indexOf(task);
        if (index !== -1) {
            project.tasks.splice(index, 1);
            project.taskCount--;
            updateProjectTaskCount();
        }
    };

    updateProjectTaskCount();
}

export function getProjectInput() {
    const addButton = document.querySelector('.plus-icon');
    addButton.style.visibility = 'hidden';

    const container = document.querySelector('.projects');
    const inputBox = createElement('div', '', { class: 'project-input' });
    const inputField = createElement('input', '', { class: 'input-field' });
    inputField.type = 'text';
    inputField.style.padding = '4px';
    inputField.style.height = '10%';
    inputField.style.width = '100%';
    inputField.placeholder = 'Enter project name';

    inputBox.appendChild(inputField);
    container.appendChild(inputBox);

    const handleBlur = () => {
        addButton.style.visibility = 'visible';
        if (inputBox) inputBox.remove();
    };

    inputField.addEventListener('blur', handleBlur);

    let project;
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const projectName = inputField.value.trim();
            if (projectName) {
                inputField.removeEventListener('blur', handleBlur);

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
}
