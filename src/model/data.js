const projects = [];

class todoList {
    constructor(name = '') {
        this.name = name;
        this.tasks = [];
        this.taskCount = 0;
    }

    createTask(title, dueDate, priority, description, checklistItems) {
        const task = new todoItem(title, dueDate, priority, description, checklistItems);
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

    getTaskCount(task) {
        return this.taskCount;
    }

    setName(name) {
        this.name = name;
    }
}

class todoItem {
    constructor(title, description, dueDate, priority, checklistItems) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checklistItems = checklistItems;
    }

    editTask(newTitle, newDescription, newPriority) {
        this.setTitle(newTitle);
        this.setDescription(newDescription);
        this.setPriority(newPriority);
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }

    setPriority(newPriority) {
        this.priority = newPriority
    }

    get checklist() {
        return this.checklistItems;
    }
}

export function createProject(projectName) {
    // Check if the project already exists
    const existingProject = projects.find(project => project.name === projectName);
    if (existingProject) {
        console.log(`Project ${projectName} already exists.`);
        return 0;
    }

    // Create a new project and add it to the array
    const newProject = new todoList(projectName);
    projects.push(newProject);
    console.log(`Project ${projectName} has been created successfully.`);
    return newProject;
}


export function initLists() {
    const inboxTasks = new todoList();
    const todayTasks = new todoList();
    const tomorrowTasks = new todoList();

    inboxTasks.createTask(
        'Task 1',
        '2024 20 8',
        'high',
        'sexy and I know it',
        [1, 2, 3]);
    inboxTasks.createTask('Task 2', '2024-01-02', 'Medium', 'This is task 2', []);
    inboxTasks.createTask('Task 3', '2024-01-03', 'Low', 'This is task 3', []);

    todayTasks.createTask('Task 4', '2024-08-11', 'High', 'This is task 4', []);
    todayTasks.createTask('Task 5', '2024-08-11', 'Medium', 'This is task 5', []);

    tomorrowTasks.createTask('Task 6', '2024-08-12', 'High', 'go to 42istanbul at 9.42am aha', ['sex', 'potato', 'stuff lmfao']);

    return {
        inboxTasks,
        todayTasks,
        tomorrowTasks
    };
}

// TESTING AREA:
const inboxTasks = new todoList();
// const todayTasks = new todoList();
// const tomorrowTasks = new todoList();
// const projectTasks = new todoList();

export { todoList, todoItem };