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

// date function?