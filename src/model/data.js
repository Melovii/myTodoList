import {loadProjects, saveDefaultProjects, saveProjects} from "./storage";

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
        // saveProjects();
    }

    deleteTask(task) {
        const index = this.tasks.indexOf(task);
        if(index !== -1) {
            this.tasks.splice(index, 1);
            this.taskCount--;
        }
        saveProjects();
        saveDefaultProjects();
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

export { todoList, todoItem };