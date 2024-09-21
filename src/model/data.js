import {loadProjects, saveProjects} from "./storage";

export const defaultProjects = [];
export const projects = [];

class todoList {
    constructor(name = '') {
        this.name = name;
        this.tasks = [];
        this.taskCount = 0;
    }

    createTask(title, dueDate, priority, description, checklistItems) {
        const task = new todoItem(title, dueDate, priority, description, checklistItems);
        task.checked = false;
        this.tasks.push(task);
        this.taskCount++;
        return task;
    }

    addTask(task) {
        this.tasks.push(task);
        this.taskCount++;
        saveProjects();
    }

    deleteTask(task) {
        const index = this.tasks.indexOf(task);
        if(index !== -1) {
            this.tasks.splice(index, 1);
            this.taskCount--;
        }
        saveProjects();
    }

    getTaskCount() {
        return this.taskCount;
    }

    setName(name) {
        this.name = name;
        // ! saveProjects();
    }
}

class todoItem {
    constructor(title, dueDate, priority, description) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.checked = false;
    }
}

export function createProject(projectName) {
    const existingProject = projects.find(project => project.name === projectName);
    if (existingProject) {
        alert(`Project ${projectName} already exists.`);
        return 0;
    }

    const newProject = new todoList(projectName);
    projects.push(newProject);
    // ! saveProjects();
    return newProject;
}

export function initLists() {
    const inboxTasks = new todoList('inbox');
    const todayTasks = new todoList('today');
    const tomorrowTasks = new todoList('tomorrow');

    // inboxTasks.createTask('Task 1', '2024-08-20', 'high', 'sexy and I know it');
    // inboxTasks.createTask('Task 2', '2024-01-02', 'medium', 'This is task 2');
    // inboxTasks.createTask('Task 3', '2024-01-03', 'low', 'This is task 3');
    //
    // todayTasks.createTask('Task 4', '2024-08-11', 'high', 'This is task 4');
    // todayTasks.createTask('Task 5', '2024-08-11', 'medium', 'This is task 5');
    //
    // tomorrowTasks.createTask('Task 6', '2024-08-12', 'high', 'go to 42istanbul at 9.42am aha');

    defaultProjects.push(inboxTasks);
    defaultProjects.push(todayTasks);
    defaultProjects.push(tomorrowTasks);
}

export { todoList, todoItem };