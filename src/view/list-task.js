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
    constructor({status,name, onTaskDrop}) {
        super();
        this.status = status;
        this.name = name;
        this.#setDropHandler(onTaskDrop);
    }
    get template() {
    return createListTaskComponentTemplate(this.status, this.name);
    }

  #setDropHandler(onTaskDrop) {
    const host = this.element;
    const list = host.querySelector(`ul.${this.status}-list`) || host.querySelector('ul.list');

    const getInsertIndex = (y) => {
      const items = Array.from(list.querySelectorAll('li.task:not(.dragging)'));
      let idx = items.length;
      for (let i = 0; i < items.length; i++) {
        const r = items[i].getBoundingClientRect();
        const mid = r.top + r.height / 2;
        if (y < mid) { idx = i; break; }
      }
      return idx;
    };

    host.addEventListener('dragover', (e) => e.preventDefault());
    host.addEventListener('drop', (e) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData('text/plain');
      const insertIndex = getInsertIndex(e.clientY);
      onTaskDrop(taskId, this.status, insertIndex);
    });
}

    
}