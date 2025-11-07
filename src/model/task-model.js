import Observable from '../framework/observable.js';
import { generateID } from '../utils.js';
import { UserAction, UpdateType } from '../constants/const.js';

export default class TaskModel extends Observable{

  
  #tasksApiService = null;
  #boardTasks = [];


 constructor({tasksApiService}) {
  super();
  this.#tasksApiService = tasksApiService;


  this.#tasksApiService.tasks.then((tasks) => {
    
   });
 }
  

  async init() {
   try {
     const tasks = await this.#tasksApiService.tasks;
     this.#boardTasks = tasks;
   } catch(err) {
     this.#boardTasks = [];
   }
   this._notify(UpdateType.INIT);
  }

  get tasks() {
    return this.#boardTasks;
  }

  getTasksByStatus(status) {
    return this.#boardTasks.filter(task => task.status === status);
  }

  async addTask(title) {
   const newTask = {
     title,
     status: 'backlog',
     id: generateID(),
   };
   try {
     const createdTask = await this.#tasksApiService.addTask(newTask);
     this.#boardTasks.push(createdTask);
     this._notify(UserAction.ADD_TASK, createdTask);
     return createdTask;
   } catch (err) {
     console.error('Ошибка при добавлении задачи на сервер:', err);
     throw err;
   }
 }

  deleteTask(taskId){
    this.#boardTasks = this.#boardTasks.filter(task => task.id !== taskId);
    this._notify(UserAction.DELETE_TASK, {id: taskId});
  }

  async clearTrash() {
    const trashTasks = this.#boardTasks.filter(task => task.status === 'trash');

    try {
      await Promise.all(trashTasks.map(task => this.#tasksApiService.deleteTask(task.id)));

      this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash');
      this._notify(UserAction.DELETE_TASK, { status: 'trash' });
    } catch (err) {
      console.error('Ошибка при удалении задач из корзины на сервере:', err);
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus, targetIndex) {
    const oldIndex = this.#boardTasks.findIndex(t => String(t.id) === String(taskId));
    if (oldIndex === -1) return;

    const task = this.#boardTasks[oldIndex];
    const prevStatus = task.status;
    this.#boardTasks.splice(oldIndex, 1);

    const indices = [];
    for (let i = 0; i < this.#boardTasks.length; i++) {
      const t = this.#boardTasks[i];
      if (t.status === newStatus) indices.push(i);
    }

    let pos = 0;
    if (typeof targetIndex !== 'number') {
      pos = indices.length; 
    } else {
      if (targetIndex < 0) pos = 0;
      else if (targetIndex > indices.length) pos = indices.length;
      else pos = targetIndex;
    }

    let insertAt;
    if (indices.length === 0) {
      insertAt = this.#boardTasks.length;
    } else {
      if (pos === indices.length) insertAt = indices[indices.length - 1] + 1;
      else insertAt = indices[pos];
    }

    task.status = newStatus;
    this.#boardTasks.splice(insertAt, 0, task);
    this._notify(UserAction.UPDATE_TASK, { id: task.id, status: newStatus, index: insertAt });

    try {
      const updated = await this.#tasksApiService.updateTask(task);
      Object.assign(task, updated);
    } catch (err) {
      console.error('Ошибка при обновлении статуса задачи на сервере:', err);
      const nowIndex = this.#boardTasks.findIndex(t => String(t.id) === String(task.id));
      if (nowIndex !== -1) this.#boardTasks.splice(nowIndex, 1);
      task.status = prevStatus;
      this.#boardTasks.splice(oldIndex, 0, task);
      this._notify(UserAction.UPDATE_TASK, { id: task.id, status: prevStatus, index: oldIndex });
      throw err;
    }
  }

}
