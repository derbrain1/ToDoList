import BoardComponent from '../view/board-component.js';
import ListTaskComponent from '../view/list-task.js';
import TaskComponent from '../view/task-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import NoTaskComponent from '../view/no-task-component.js';
import {render} from '../framework/render.js';
import {status, statusLabel} from "../constants/status.js";


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


init(){
    this.#renderBoard();
}

#renderBoard() {

    this.#boardTasks=[...this.tasks];
   
    render(this.#tasksBoardComponent, this.#boardContainer);
    for (let i = 0; i < status.length; i++) {
    const listTaskComponent = new ListTaskComponent(status[i], statusLabel[status[i]]); 
    this.#renderTaskList(listTaskComponent, this.#tasksBoardComponent.element);
    let filterTaskList=this.#boardTasks.filter(task => task.status === status[i]);
    if (filterTaskList.length == 0){
        this.#renderNoTask(new NoTaskComponent(), listTaskComponent.element.querySelector("ul"));
    }
    else{
        for (let j = 0; j < filterTaskList.length; j++) {
        const taskComponent = new TaskComponent(filterTaskList[j].title,filterTaskList[j].status); 
        this.#renderTask(taskComponent, listTaskComponent.element.querySelector("ul"));}
    }
    
    if(status[i] === "trash") {
        this.#renderClearButton(listTaskComponent.element);
        }
    }
}

    #renderClearButton(container) {
        const clearButtonComponent = new ClearButtonComponent({
            onClick: () => {
        
            if (this.tasks.every(t => t.status !== 'trash')) return;
            this.#tasksModel.clearTrash();
            }
        });

        render(clearButtonComponent, container);
        const trashCount = this.tasks.filter(t => t.status === 'trash').length;
        clearButtonComponent.disableButton(trashCount === 0);
    }

    #renderTask(task, container){

        render(task, container);
    }
    #renderTaskList(listTaskComponent, container){
        render(listTaskComponent, container);
    }
    
    #renderNoTask(component, container){
        render(component, container);
    }

    createTask() {
    const taskTitle = document.querySelector('input[name="title"]').value.trim();
    if (!taskTitle) {
      return;
    }

    this.#tasksModel.addTask(taskTitle);

    document.querySelector('input[name="title"]').value = '';
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
  }


    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }
  

}


