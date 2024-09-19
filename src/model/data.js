import {loadLocal} from "./storage";

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
    }

    deleteTask(task) {
        const index = this.tasks.indexOf(task);
        if(index !== -1) {
            this.tasks.splice(index, 1);
            this.taskCount--;
        }
    }

    getTaskCount() {
        return this.taskCount;
    }

    setName(name) {
        this.name = name;
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
    // Check if the project already exists
    const existingProject = projects.find(project => project.name === projectName);
    if (existingProject) {
        alert(`Project ${projectName} already exists.`);
        return 0;
    }

    // Create a new project and add it to the array
    const newProject = new todoList(projectName);
    projects.push(newProject);
    return newProject;
}

export function initLists() {
    // const loadedProjects = loadLocal();
    // if (loadedProjects) {
    //     // Iterate over the projects and populate your data structures
    //     loadedProjects.forEach((project) => {
    //         // Create a new project object and add it to your projects array
    //         const newProject = new todoList(project.name);
    //         newProject.tasks = project.tasks.map((task) => new todoItem(task.title, task.dueDate, task.priority, task.description));
    //         projects.push(newProject);
    //     });
    // }
    const inboxTasks = new todoList('inbox');
    const todayTasks = new todoList('today');
    const tomorrowTasks = new todoList('tomorrow');

    inboxTasks.createTask('Task 1', '2024-08-20', 'high', 'sexy and I know it');
    inboxTasks.createTask('Task 2', '2024-01-02', 'medium', 'This is task 2');
    inboxTasks.createTask('Task 3', '2024-01-03', 'low', 'This is task 3');

    todayTasks.createTask('Task 4', '2024-08-11', 'high', 'This is task 4');
    todayTasks.createTask('Task 5', '2024-08-11', 'medium', 'This is task 5');

    tomorrowTasks.createTask('Task 6', '2024-08-12', 'high', 'go to 42istanbul at 9.42am aha');

    projects.push(inboxTasks);
    projects.push(todayTasks);
    projects.push(tomorrowTasks);

    return {
        inboxTasks,
        todayTasks,
        tomorrowTasks
    };
}

export { todoList, todoItem };