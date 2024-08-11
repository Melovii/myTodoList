console.log('listRenderer.js is being executed');

import createElement from "../utils/helpers.js";

export function listRenderer(title) {
    const container = document.querySelector('.list');
    container.innerHTML = '';

    const mainTitle = createElement('p', title);
    mainTitle.style.fontSize = '38px';
    mainTitle.style.margin = '25px 0';
    container.appendChild(mainTitle);

    const divider = createElement('div', '', { class: 'divider' });
    container.appendChild(divider);

    const placeholder = '+ Add a task. Press Enter to save.'
    const input = createElement('input', '', { class: 'new-task', type: 'text', placeholder: placeholder });

    container.appendChild(input);
}

export default listRenderer;