import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import {render, RenderPosition} from './framework/render.js';
import TaskModel from '../src/model/task-model.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://690c637f6ad3beba00f86356.mockapi.io';
const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-section');
const boardContainer = document.querySelector('.board');
const taskModel = new TaskModel({
  tasksApiService: new TasksApiService(END_POINT)
});
const taskBoardPresenter = new TaskBoardPresenter(
  boardContainer,
  taskModel,);


const formAddTaskComponent = new FormAddTaskComponent({
  onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
  taskBoardPresenter.createTask();
}

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer);
taskBoardPresenter.init();




