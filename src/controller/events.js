console.log('events.js is being executed');

import { listRenderer } from '../view/listRenderer.js';
    import { todoList } from '../model/data.js';
    const myTodoList = new todoList();


    function setupEventListeners() {

        // TODO: SPLIT FILE INTO MULTIPLE FILES

        // buttons to load lists
        const inboxButton = document.querySelector('.inbox');
        inboxButton.addEventListener('click', () => {
            listRenderer('Inbox');
        });

        const todayButton = document.querySelector('.today');
        todayButton.addEventListener('click', () => {
            listRenderer('Today');
        });

        const tomorrowButton = document.querySelector('.tomorrow');
        tomorrowButton.addEventListener('click', () => {
            listRenderer('Tomorrow');
        });

        function addProject() {
            console.log('potato');
        }

        const plusButton = document.querySelector('.plus-icon');
        plusButton.addEventListener('click', addProject);
    }

    const input = document.querySelector('.new-task');
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && input.value.length > 0) {
            console.log('sex?');
            myTodoList.addTask(input.value);
            input.value = '';
            // updateList(); // TODO: add a parameter => `list` for whichever list is to update
            console.log(myTodoList); // TODO: UPDATE TASK VIEW?
        }
    });

    export default setupEventListeners;