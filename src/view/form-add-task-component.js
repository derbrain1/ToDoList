import { AbstractComponent } from '../framework/view/abstract-component.js';

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

export default class FormAddTaskComponent extends AbstractComponent{
    get template() {
    return createFormAddTaskComponentTemplate();
    }
   
}
