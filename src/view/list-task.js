import { AbstractComponent } from '../framework/view/abstract-component.js';


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

export default class ListTaskComponent extends AbstractComponent{
    constructor(status,name) {
        super();
        this.status = status;
        this.name = name;
    }
    get template() {
        console.log(this.status);
    return createListTaskComponentTemplate(this.status, this.name);
    }
    
}