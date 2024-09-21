import {createProject, defaultProjects, initLists, projects, todoItem, todoList} from './data';
import { appendProject } from "../view/projects";
import { listRenderer, renderTasks } from "../view/listRenderer";
import { setCurrentList } from "../controller/events";

export function saveProjects() {
    try {
        return ; // ! CAUSES BUG: overwrites project content TODO: fix this..?
        console.log("Saving projects...");
        const savedProjects = projects.map(project => ({
            name: project.name,
            taskCount: project.taskCount,
            tasks: project.tasks.map(task => ({
                title: task.title,
                dueDate: task.dueDate,
                priority: task.priority,
                description: task.description,
                checked: task.checked
            }))
        }));
        localStorage.setItem('projects', JSON.stringify(savedProjects));
    } catch (error) {
        console.error("Error saving projects to localStorage:", error);
    }
}

export function loadProjects() {
    console.log("Loading projects...");
    try {
        const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        if (savedProjects.length) {
            console.log("Loaded projects from localStorage:", savedProjects);
            savedProjects.forEach(savedProject => {
                const project = createProject(savedProject.name);
                savedProject.tasks.forEach(savedTask => {
                    const task = new todoItem(
                        savedTask.title,
                        savedTask.dueDate,
                        savedTask.priority,
                        savedTask.description
                    );
                    task.checked = savedTask.checked;
                    project.addTask(task);
                });
                appendProject(project);
            });
        } else {
            console.log("No data found in localStorage for normal projects.");
        }
    } catch (error) {
        console.error("Error loading projects from localStorage:", error);
    }
}

export function saveDefaultProjects() {
    try { // ! DOES NOT SAVE FOR SOME REASON TODO: fix this.. :(
        console.log('Saving default projects...');
        const savedDefaultProjects = defaultProjects.map(project => ({
            name: project.name,
            taskCount: project.taskCount,
            tasks: project.tasks.map(task => ({
                title: task.title,
                dueDate: task.dueDate,
                priority: task.priority,
                description: task.description,
                checked: task.checked
            }))
        }));
        localStorage.setItem('defaultProjects', JSON.stringify(savedDefaultProjects));
        console.log("Saved default projects to localStorage:", savedDefaultProjects);
    } catch (error) {
        console.error("Error saving default projects to localStorage:", error);
    }
}

export function loadDefaultProjects() {
    try {
        initLists();
        const savedDefaultProjects = JSON.parse(localStorage.getItem('defaultProjects')) || [];
        if (savedDefaultProjects.length) {
            console.log("Loaded default projects from localStorage:", savedDefaultProjects);
            savedDefaultProjects.forEach(savedDefaultProject => {
                console.log("Attempting to load project:", savedDefaultProject.name);
                const project = createProject(savedDefaultProject.name);
                savedDefaultProject.tasks.forEach(savedTask => {
                    const task = new todoItem(
                        savedTask.title,
                        savedTask.dueDate,
                        savedTask.priority,
                        savedTask.description
                    );
                    task.checked = savedTask.checked;
                    project.addTask(task);
                });
                // ! appendProject(project);
            });
        } else {
            console.log("No data found in localStorage for default projects.");
        }
    } catch (error) {
        console.error("Error loading default projects from localStorage:", error);
    }
}

export function getDefaultProjects() {
    const defaultProjects = JSON.parse(localStorage.getItem('defaultProjects')) || [];
    const inboxProject = defaultProjects.find(project => project.name === 'inbox') || { name: 'inbox', tasks: [] };
    const todayProject = defaultProjects.find(project => project.name === 'today') || { name: 'today', tasks: [] };
    const tomorrowProject = defaultProjects.find(project => project.name === 'tomorrow') || { name: 'tomorrow', tasks: [] };

    const inboxTasks = new todoList(inboxProject.name);
    inboxProject.tasks.forEach(taskData => {
        const task = new todoItem(
            taskData.title,
            taskData.dueDate,
            taskData.priority,
            taskData.description
        );
        task.checked = taskData.checked;
        inboxTasks.addTask(task);
    });

    const todayTasks = new todoList(todayProject.name);
    todayProject.tasks.forEach(taskData => {
        const task = new todoItem(
            taskData.title,
            taskData.dueDate,
            taskData.priority,
            taskData.description
        );
        task.checked = taskData.checked;
        todayTasks.addTask(task);
    });

    const tomorrowTasks = new todoList(tomorrowProject.name);
    tomorrowProject.tasks.forEach(taskData => {
        const task = new todoItem(
            taskData.title,
            taskData.dueDate,
            taskData.priority,
            taskData.description
        );
        task.checked = taskData.checked;
        tomorrowTasks.addTask(task);
    });

    return { inboxTasks, todayTasks, tomorrowTasks };
}
