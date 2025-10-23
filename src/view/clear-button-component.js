import { AbstractComponent } from '../framework/view/abstract-component.js';


function createClearButtonComponentTemplate() {
    return (
    `<button class="btn-clear">Очистить</button>`
    );
}

export default class ClearButtonComponent extends AbstractComponent{
    get template() {
    return createClearButtonComponentTemplate();
    }
}