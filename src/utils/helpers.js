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

export async function getIcons() {
    for (let icon of document.querySelectorAll('.icon'))
    {
        let url = 'https://www.melovi.dev/images/' + icon.getAttribute('data-icon');
        let response = await fetch(url);
        icon.innerHTML = await response.text();
    }
}

// date function?

export default createElement;