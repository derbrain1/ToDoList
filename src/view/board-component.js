import { AbstractComponent } from '../framework/view/abstract-component.js';


function createBoardComponentTemplate() {
    return (
    `<div class="board-inner"></div>`
    );
}

export default class BoardComponent extends AbstractComponent{
    get template() {
    return createBoardComponentTemplate();
    }
    
}