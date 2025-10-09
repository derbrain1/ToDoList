import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import {render, RenderPosition} from './framework/render.js';
import TaskModel from '../src/model/task-model.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-section');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
const boardContainer = document.querySelector('.board');
const taskModel = new TaskModel();
const taskBoardPresenter = new TaskBoardPresenter(
  boardContainer,
  taskModel,);

taskBoardPresenter.init();




