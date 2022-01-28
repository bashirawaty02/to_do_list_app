'use Strict';

const createTaskHTML = (name, description, assignedTo, dueDate,status) => {
  const html = `
    <li class="list-group-item">
    <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
        <h5>${name}</h5>
        <span class="badge ${status === "toDo" ? 'badge-danger' : 'badge-success'}" >${status}</span>
    </div>
    <div class="d-flex w-100 mb-3 justify-content-between">
        <small>Assigned To: ${assignedTo}</small>
        <small>Due: ${dueDate}</small>
    </div>
    <p>${description}</p>
    <div class="d-flex w-100 justify-content-end">
        <button class="btn btn-outline-success done-button ${status === "TODO" ? "visible" : "invisible"
  }">Mark As Done</button>
        <button class="btn btn-outline-success edit-button"          
          id="edit-task-modal"
          type="submit"
          class="btn btn-block"
          data-toggle="modal"
          data-target="#edit-task-modal">EDIT</button>
        <button class="btn btn-outline-danger delete-button">DELETE</button>
    </div>
  </li>`;
return html;
}

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

  render(){
  const taskHtmlList = [];
  for(let i = 0; i < this.tasks.length; i++){
    const task = this.tasks[i];
    const date = new Date(task.dueDate);
    const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const taskHTML = createTaskHTML(task.name, task.description, task.assignedTo, formattedDate, task.status);
    taskHtmlList.push(taskHTML);
  }
  const tasksHtml = taskHtmlList.join("\n");
  document.querySelector("#tasksList").innerHTML = tasksHtml;
  }
}
