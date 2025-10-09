import {createElement} from '../framework/render.js';

function createListTaskComponentTemplate(status, name) {
    return (
    ` <div class="${status} ${status}-column">
          <div class="title ${status}">${name}</div>
            <ul class="list ${status}-list">
            </ul>
        </div>
        `
    );
}

export default class ListTaskComponent {
    constructor(status,name) {
        this.status = status;
        this.name = name;
    }
    getTemplate() {
    return createListTaskComponentTemplate(this.status, this.name);
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