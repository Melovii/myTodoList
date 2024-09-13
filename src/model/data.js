class todoList {
    constructor() {
        this.tasks = [];
    }

    createTask(title, dueDate, priority, description, checklistItems) {
        const task = new todoItem(title, dueDate, priority, description, checklistItems);
        this.tasks.push(task);
        return task;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(task) {
        const index = this.tasks.indexOf(task);
        if(index !== -1) {
            this.tasks.splice(index, 1);
        }
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

export function initLists() {
    const inboxTasks = new todoList();
    const todayTasks = new todoList();
    const tomorrowTasks = new todoList();

    inboxTasks.createTask('Task 1', '2024 20 8, high, sexy and I know it, array of checklist');
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