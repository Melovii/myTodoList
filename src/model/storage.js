import {createProject, projects, todoItem} from './data';

export function saveLocal() {
    try {
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
        console.log("Projects saved:", projects);
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
}

export function loadLocal() {
    try {
        const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        if (savedProjects.length) {
            console.log("Loaded projects from localStorage:", savedProjects);
            return savedProjects;
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

// export function loadLocal() {
//     try {
//         const savedProjects = JSON.parse(localStorage.getItem('projects'));
//         if (savedProjects) {
//             savedProjects.forEach(savedProject => {
//                 const project = createProject(savedProject.name);
//                 savedProject.tasks.forEach(savedTask => {
//                     const task = new todoItem(
//                         savedTask.title,
//                         savedTask.dueDate,
//                         savedTask.priority,
//                         savedTask.description,
//                     );
//                     task.checked = savedTask.checked;
//                     project.addTask(task);
//                 });
//             });
//             console.log("Projects loaded:", projects);
//         }
//     } catch (error) {
//         console.error("Error loading from localStorage:", error);
//     }
// }