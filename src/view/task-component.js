import {createElement} from '../framework/render.js';

function createTaskComponentTemplate(title, status) {
    return (
    `
    <li class="task ${status}-task">${title}</li>
    `   
    );
}

export default class TaskComponent {

constructor (task, status) {
    this.task = task;
    this.status = status;
}

    getTemplate() {
    return createTaskComponentTemplate(this.task, this.status);
    }
    getElement() {
    if (!this.element) {
    this.element = createElement(this.getTemplate());
    }
    return this.element;
    }
    removeElement() {
    this.element = null;
    }
}