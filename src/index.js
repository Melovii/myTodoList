console.log('index.js is being executed');

import './styles.css';
import inboxIcon from './assets/icons/inbox.svg';
import todayIcon from './assets/icons/today.svg';
import tomorrowIcon from './assets/icons/tomorrow.svg';

import { listRenderer } from './view/listRenderer.js';

function initApp() {
    listRenderer('Inbox'); // TODO: add inboxTasks parameter

    const setupEventListeners = require('./controller/events.js').default;
    setupEventListeners();

    const inbox = document.querySelector('.inbox-icon');
    inbox.src = inboxIcon;
    inbox.alt = 'inbox icon';

    const today = document.querySelector('.today-icon');
    today.src = todayIcon;
    today.alt = 'today icon';

    const tomorrow = document.querySelector('.tomorrow-icon');
    tomorrow.src = tomorrowIcon;
    tomorrow.alt = 'tomorrow icon';
}

document.addEventListener('DOMContentLoaded', initApp);



// import githubIcon from './assets/icons/github.png';

// import { TodoListController } from './controller,js';
// import { TodoListView } from './view.js';
// import { TodoListModel } from './model.js';
// import { helpers } from '../utils/helpers.js';

// const todoListController = new TodoListController();
// const todoListView = new TodoListView();
// const todoListModel = new TodoListModel();

// todoListController.init(todoListModel, todoListView);

// const github = document.querySelector('footer img');
// github.src = githubIcon;
// github.alt = 'github logo';