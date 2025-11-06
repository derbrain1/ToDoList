import { tasks } from '../mock/task.js';
import { generateID } from '../utils.js';

export default class TaskModel {
  #boardTasks = tasks;
  #observers = [];

  get tasks() {
    return this.#boardTasks;
  }

  getTasksByStatus(status) {
    return this.#boardTasks.filter(task => task.status === status);
  }

  addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateID(),
    };
    this.#boardTasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  clearTrash() {
    this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash');
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  updateTaskStatus(taskId, newStatus, insertionIndex) {
  const id = String(taskId);
  const fromIdx = this.#boardTasks.findIndex(t => String(t.id) === id);
  if (fromIdx < 0) return;

  const [task] = this.#boardTasks.splice(fromIdx, 1);
  task.status = newStatus;

  const positions = [];
  for (let i = 0; i < this.#boardTasks.length; i++) {
    if (this.#boardTasks[i].status === newStatus) positions.push(i);
  }

  let absolute = this.#boardTasks.length;
  if (positions.length > 0) {
    const first = positions[0];
    const rel = Math.max(0, Math.min(insertionIndex, positions.length));
    absolute = first + rel;
  }

  this.#boardTasks.splice(absolute, 0, task);
  this._notifyObservers?.();
}

  _notifyObservers() {
      this.#observers.forEach((observer) => observer());
    }
  }