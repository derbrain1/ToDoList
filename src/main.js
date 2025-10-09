import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import BoardComponent from './view/board-component.js';
import ListTaskComponent from './view/list-task.js';
import TaskComponent from './view/task-component.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const formContainer = document.querySelector('.add-section');
render(new FormAddTaskComponent(), formContainer);

const boardContainer = document.querySelector('.board');
const boardComponent = new BoardComponent();
render(boardComponent, boardContainer);

const boardInner = boardContainer.querySelector('.board-inner');

for (let i = 0; i < 4; i++) {
  
  const listTaskComponent = new ListTaskComponent(); 
  render(listTaskComponent, boardInner);
  const lastBacklogDiv = boardInner.children[i].children[boardInner.children[0].children.length-1];

  for (let j = 0; j < 3; j++) {
    const taskComponent = new TaskComponent(); 
    render(taskComponent, lastBacklogDiv);
  }
}


