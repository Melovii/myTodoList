import {createProject, defaultProjects, projects, todoItem} from './data';
import {appendProject} from "../view/projects";
import {listRenderer, renderTasks} from "../view/listRenderer";
import {setCurrentList} from "../controller/events";

export function saveLocal() { // ! YO: TODO: make it ONLY save the changes made...
    try {
        console.log("Saving projects...");
        saveDefaultProjects(); // ! YO: TODO: use this function ONLY for default projects
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
        // console.log("Projects saved:", projects);
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
}

export function loadLocal() {
    console.log("Loading projects...");
    loadDefaultProjects();
    // try {
    //     const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    //     if (savedProjects.length) {
    //         console.log("Loaded projects from localStorage:", savedProjects);
    //         savedProjects.forEach((savedProject) => {
    //             const project = createProject(savedProject.name);
    //             savedProject.tasks.forEach((savedTask) => {
    //                 const task = new todoItem(
    //                     savedTask.title,
    //                     savedTask.dueDate,
    //                     savedTask.priority,
    //                     savedTask.description
    //                 );
    //                 task.checked = savedTask.checked;
    //                 project.addTask(task);
    //             });
    //             appendProject(project);
    //         });
    //     } else {
    //         console.log("No data found in localStorage.");
    //         return null;
    //     }
    // }
    // catch (error) {
    //     console.error("Error loading from localStorage:", error);
    //     return null;
    // }
}

export function saveDefaultProjects() {
        try {
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
            // console.log("Default projects saved:", defaultProjects);
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
}

function loadDefaultProjects() {
    try {
        const savedDefaultProjects = JSON.parse(localStorage.getItem('defaultProjects')) || [];
        if (savedDefaultProjects.length) {
            console.log("Loaded default projects from localStorage:", savedDefaultProjects);
            savedDefaultProjects.forEach((savedDefaultProject) => {
                console.log("Attempting to load project: ", savedDefaultProject.name);
                const project = createProject(savedDefaultProject.name);
                savedDefaultProject.tasks.forEach((savedTask) => {
                    const task = new todoItem(
                        savedTask.title,
                        savedTask.dueDate,
                        savedTask.priority,
                        savedTask.description
                    );
                    task.checked = savedTask.checked;
                    project.addTask(task);
                });
                const projectButton = document.querySelector(`.${project.name}`);
                projectButton.addEventListener('click', () => {
                    setCurrentList(project);
                    listRenderer(project.name);
                    renderTasks(project.tasks);
                    console.log('projectButton WORKS!');
                });
            });
        } else {
            console.log("No data found in localStorage.");
            return null;
        }
    }
    catch (error) {
        console.error("Error loading from localStorage:", error);
        return null;
    }
}