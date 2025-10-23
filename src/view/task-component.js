import { AbstractComponent } from '../framework/view/abstract-component.js';


function createTaskComponentTemplate(title, status) {
    return (
    `
    <li class="task ${status}-task">${title}</li>
    `   
    );
}

export default class TaskComponent extends AbstractComponent{

    constructor (task, status) {
    super();
    this.task = task;
    this.status = status;
}

    get template() {
    return createTaskComponentTemplate(this.task, this.status);
    }
}