import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
 return (
    `<form class="add-task__form" >
        <h2>Новая задача</h2>
        <div class="input-row">
        <label>
            <input type="text" name="title" class="input-field" placeholder="Название задачи..." />
        </label>
        <button class="btn-add">Добавить</button>
        </div>
    </form>`
 );
}

export default class FormAddTaskComponent extends AbstractComponent{
    #handleClick = null;

    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler);
    }
    get template() {
    return createFormAddTaskComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    };
   
}
