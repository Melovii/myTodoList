import { createProject, defaultProjects, projects, todoItem } from './data';
import { appendProject } from "../view/projects";
import { listRenderer, renderTasks } from "../view/listRenderer";
import { setCurrentList } from "../controller/events";

// Save all projects (normal projects)
export function saveProjects() {
    try {
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

// Load all projects (normal projects)
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

// Save default projects separately
export function saveDefaultProjects() {
    try {
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
    } catch (error) {
        console.error("Error saving default projects to localStorage:", error);
    }
}

// Load default projects separately
export function loadDefaultProjects() {
    try {
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
                appendProject(project);
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
    const inboxTasks = defaultProjects.find(project => project.name === 'inbox');
    const todayTasks = defaultProjects.find(project => project.name === 'today');
    const tomorrowTasks = defaultProjects.find(project => project.name === 'tomorrow');
    return { inboxTasks, todayTasks, tomorrowTasks };
}
