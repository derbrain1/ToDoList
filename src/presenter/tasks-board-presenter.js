import BoardComponent from '../view/board-component.js';
import ListTaskComponent from '../view/list-task.js';
import TaskComponent from '../view/task-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import NoTaskComponent from '../view/no-task-component.js';
import {render} from '../framework/render.js';
import {status, statusLabel} from "../constants/status.js";
import { UserAction, UpdateType  } from '../constants/const.js';
import LoadingViewComponent from '../view/LoadingViewComponent.js';

export default class TaskBoardPresenter {
    #tasksBoardComponent=new BoardComponent();

    #boardContainer=null;
    #tasksModel=null;
    #boardTasks=[]

    constructor (boardContainer, tasksModel) {
        this.#boardContainer=boardContainer;
        this.#tasksModel=tasksModel;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
        
    }

async init() {
  const loadingComponent = new LoadingViewComponent();
  loadingComponent.removeElement();
  render(loadingComponent, this.#boardContainer);
  await this.#tasksModel.init();
  this.#boardContainer.innerHTML = '';
  this.#clearBoard();
  this.#renderBoard();
 }

#renderBoard() {

    this.#boardTasks=[...this.tasks];
    render(this.#tasksBoardComponent, this.#boardContainer);
    this.#renderTaskList();}

    #renderClearButton(container) {
        const clearButtonComponent = new ClearButtonComponent({
            onClick: async () => {
        
            if (this.tasks.every(t => t.status !== 'trash')) return;
            try{
              await this.#tasksModel.clearTrash();
            }catch (err) {
              console.error('Ошибка при очистке корзины:', err);
            }
            
            }
        });

        render(clearButtonComponent, container);
        const trashCount = this.tasks.filter(t => t.status === 'trash').length;
        clearButtonComponent.disableButton(trashCount === 0);
    }

    #renderTask(task, container){

        render(task, container);
    }
   #renderInColumn(listTaskComponent, container){
  render(listTaskComponent, container);
}

#renderTaskList(){
  status.forEach((st) => {
    const taskListComponent = new ListTaskComponent({
      status: st,
      name: statusLabel[st],
      onTaskDrop: this.#handleTaskDrop.bind(this)
    });
    this.#renderInColumn(taskListComponent, this.#tasksBoardComponent.element);

    const ul = taskListComponent.element.querySelector('ul');
    const filterTaskList = this.#boardTasks.filter(task => task.status === st);

    if (filterTaskList.length === 0) {
      this.#renderNoTask(new NoTaskComponent(), ul);
    } else {
      filterTaskList.forEach((t) => {
        const taskComponent = new TaskComponent(t); 
        this.#renderTask(taskComponent, ul);
      });
    }

    if (st === 'trash') {
      this.#renderClearButton(taskListComponent.element);
    }
  });
}
  
  async #handleTaskDrop(taskId, newStatus, insertionIndex) {
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus, insertionIndex);
    } catch (err) {
      console.error('Ошибка при обновлении статуса задачи:', err);
    }
  }
  
    #renderNoTask(component, container){
        render(component, container);
    }

    async createTask() {
    const taskTitle = document.querySelector('input[name="title"]').value.trim();
    if (!taskTitle) {
      return;
    }
    try {
      await this.#tasksModel.addTask(taskTitle);
      document.querySelector('input[name="title"]').value = '';
    } catch (err) {
      console.error('Ощибка при создании задачи:', err)
    }
  }


    get tasks() {
        return this.#tasksModel.tasks;
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
  }


    #handleModelChange(event, payload) {
    switch (event) {
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  }
}


