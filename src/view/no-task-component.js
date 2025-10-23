import { AbstractComponent } from '../framework/view/abstract-component.js';


function createNoTaskComponentTemplate() {
    return (
    `
    <li class="no-task">Перетащите карточку</li>
    `   
    );
}

export default class NoTaskComponent extends AbstractComponent{
    get template() {
    return createNoTaskComponentTemplate();
    }
}