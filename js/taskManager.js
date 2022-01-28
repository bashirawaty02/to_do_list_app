'use Strict';

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, assignedTo, dueDate, status){
    const task = {
      id : this.currentId++,
      name : name,
      description : description,
      assignedTo : assignedTo,
      dueDate : dueDate,
      status : status,
    }
    //Push the task into tasks array[]
    this.tasks.push(task);
  }
}