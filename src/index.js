import './styles.css';
import inboxIcon from './assets/icons/inbox.svg';
import todayIcon from './assets/icons/today.svg';
import tomorrowIcon from './assets/icons/tomorrow.svg';

import {loadDefaultProjects, loadProjects} from './model/storage.js';
import { listRenderer } from './view/listRenderer.js';
import {renderPlaceholderImage} from "./utils/helpers";

function initApp() {
    listRenderer('Inbox');

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
    renderPlaceholderImage()

}

document.addEventListener('DOMContentLoaded', () => {
    loadDefaultProjects()
    loadProjects();
    initApp();
});