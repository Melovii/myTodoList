import { createElement } from '../utils/helpers';
import { createProject } from '../model/data';
import { deleteEvent, setCurrentList, updateTasks } from '../controller/events';
import { listRenderer, renderTaskInfo, renderTasks } from './listRenderer';
import {loadProjects, saveDefaultProjects, saveProjects} from "../model/storage";

// ! DO THIS: TODO: use the setName(name) method to edit project name

export function appendTask(task) {
    const taskList = document.querySelector('.task-list');

    const taskContainer = createElement('div', '', { class: 'task-container' });
    const taskTitle = createElement('p', task.title, { class: task.checked ? 'completed' : '' });
    const divider = createElement('div', '', { class: 'divider' });
    const checkMark = createElement('div', '', { class: `checkmark ${task.checked ? 'checked' : ''}` });
    const trashContainer = createElement('div', '', { class: 'trash-container' });
    const trashCan = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    trashCan.classList.add('trash-svg');
    trashCan.setAttribute('viewBox', '0 0 24 24');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M3 6h18M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M10 11v6M14 11v6M5 6h14v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6z');

    trashCan.appendChild(path);

    divider.style.margin = '6px';

    taskTitle.style.cursor = 'pointer';
    taskTitle.addEventListener('click', () => renderTaskInfo(task));

    checkMark.addEventListener('click', () => {
        task.checked = !task.checked;
        checkMark.classList.toggle('checked', task.checked);
        taskTitle.classList.toggle('completed', task.checked);

        updateTasks();
    });

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

    // saveProjects();
    // saveDefaultProjects();
    updateProjectTaskCount();
    projectOptions(project)
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
                    saveProjects();
                }
            } else {
                alert('Please enter a valid project name');
            }
        }
    });

    inputField.focus();
}

// ! ISSUES WITH THIS FUNCTION:
// TODO: Fix these:
// - Delete button loads the list of the project that was deleted
// - Prevent the user from inserting an already existing project name

export function projectOptions(project) {
    const projectTitle = document.querySelector(`.${project.name}`);
    const projectTaskCount = projectTitle.nextElementSibling;
    const buttonContainer = createElement('div', '', { class: 'project-buttons' });

    // buttonContainer.appendChild(deleteButton);
    projectTitle.parentElement.insertBefore(buttonContainer, projectTaskCount);

    const deleteButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    deleteButton.classList.add('trash-svg');
    deleteButton.setAttribute('viewBox', '0 0 24 24');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M3 6h18M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M10 11v6M14 11v6M5 6h14v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6z');

    const editButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    editButton.classList.add('edit-project');
    editButton.setAttribute('viewBox', '0 0 24 24');

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z');

    deleteButton.appendChild(path1);
    editButton.appendChild(path2);

    deleteButton.addEventListener('click', () => {
        project.deleteProject();
        projectTaskCount.remove();
        projectTitle.remove();
        buttonContainer.remove();
        saveProjects();
    });

    editButton.addEventListener('click', () => {
        const newName = prompt('Enter new project name:', project.name);
        if (newName) {
            project.setName(newName);
            projectTitle.textContent = newName;
            saveProjects();
        }
    });

    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);
}