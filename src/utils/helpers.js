import catImage from '../assets/images/cat.svg';

export function createElement(tag, text, attributes = {}) {
    const element = document.createElement(tag);
    if (text) {
        element.textContent = text;
    }
    Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key]);
    });
    return element;
}

export function renderPlaceholderImage() {
    const infoContainer = createElement('div', '', { class: 'cat-container' });
    const infoBody = document.querySelector('.todo');
    if (infoBody.innerHTML === '') {
        const image = createElement('img', '', { src: catImage, alt: 'Cat Illustration', class: 'cat-image' });
        const infoBodyText = createElement('p', 'Click on a task to view details', { class: 'info-body-text' });

        infoContainer.appendChild(image);
        infoContainer.appendChild(infoBodyText);
        infoBody.appendChild(infoContainer);
    }
}

// date function?