import {createElement} from '../framework/render.js';

function createListTaskComponentTemplate() {
    return (
    ` <div class="backlog backlog-column">
          <div class="title backlog">Название блока</div>
            <ul class="list backlog-list">
            
            </ul>
        </div>
        `
    );
}

export default class ListTaskComponent {
    getTemplate() {
    return createListTaskComponentTemplate();
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