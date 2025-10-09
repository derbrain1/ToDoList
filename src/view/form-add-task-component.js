import {createElement} from '../framework/render.js';
function createFormAddTaskComponentTemplate() {
 return (
    `<form class="add-task__form" >
        <h2>Новая задача</h2>
        <div class="input-row">
        <label>
            <input type="text" class="input-field" placeholder="Название задачи..." />
        </label>
        <button class="btn-add">Добавить</button>
        </div>
    </form>`
 );
}

export default class FormAddTaskComponent {
    getTemplate() {
    return createFormAddTaskComponentTemplate();
    }
    getElement() {
    if (!this.element) {this.element = createElement(this.getTemplate());
    }
    return this.element;
    }
    removeElement() {
    this.element = null;
    }
}
