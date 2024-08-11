class todoList {
    constructor() {
        this.tasks = [];
    }

    addTask(title, dueDate, priority, description, checklistItems) {
        const task = new todoItem(title, dueDate, priority, description, checklistItems);
        this.tasks.push(task);
        return task;
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

export { todoList, todoItem };