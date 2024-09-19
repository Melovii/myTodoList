import './styles.css';
import inboxIcon from './assets/icons/inbox.svg';
import todayIcon from './assets/icons/today.svg';
import tomorrowIcon from './assets/icons/tomorrow.svg';

import { loadLocal } from './model/storage.js';
import { listRenderer } from './view/listRenderer.js';

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
}

document.addEventListener('DOMContentLoaded', () => {
    loadLocal();
    initApp();
});