import BoardComponent from '../view/board-component.js';
import ListTaskComponent from '../view/list-task.js';
import TaskComponent from '../view/task-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
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
        
    }

init() {

    this.#boardTasks=[...this.#tasksModel.getTasks()];

    render(this.#tasksBoardComponent, this.#boardContainer);
    for (let i = 0; i < status.length; i++) {
    
    const listTaskComponent = new ListTaskComponent(status[i], statusLabel[status[i]]); 
    render(listTaskComponent, this.#tasksBoardComponent.getElement());
    let filterTaskList=this.#boardTasks.filter(task => task.status === status[i]);
    for (let j = 0; j < filterTaskList.length; j++) {
        const taskComponent = new TaskComponent(filterTaskList[j].title,filterTaskList[j].status); 
        render(taskComponent, listTaskComponent.getElement().querySelector("ul"));
    }
    if(status[i] === "trash") {
                render(new ClearButtonComponent(),listTaskComponent.getElement());
            }
    }
}
}


