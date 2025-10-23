import { AbstractComponent } from '../framework/view/abstract-component.js';


function createClearButtonComponentTemplate() {
    return (
    `<button class="btn-clear">Очистить</button>`
    );
}

export default class ClearButtonComponent extends AbstractComponent{
    #handleClick = null;

    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }
    get template() {
    return createClearButtonComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    };
    disableButton(value) {
        const btn = this.element;
        if (btn) {
        btn.disabled = !!value;}
  }
}