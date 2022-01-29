"use Strict";

const formatStatus = (status) => {
  switch (status) {
    case "toDo":
      status = "TO DO";
      break;
    case "inProgress":
      status = "IN PROGRESS";
      break;
    default:
      status = status.toUpperCase();
  }
  return status;
};

const createTaskHTML = (id, name, description, assignedTo, dueDate, status) => {
  formattedStatus = formatStatus(status);
  const html = `
    <li data-task-id=${id} class="list-group-item">
      <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
          <h5>${name}</h5>
          <span class="badge ${
            status === "toDo" ? "badge-danger" : "badge-success"
          }" >${formattedStatus}</span>
      </div>
      <div class="d-flex w-100 mb-3 justify-content-between">
          <small>Assigned To: ${assignedTo}</small>
          <small>Due: ${dueDate}</small>
      </div>
      <p>${description}</p>
      <div class="d-flex w-100 justify-content-end">
          <button class="btn btn-outline-success done-button ${
            status != "done" ? "visible" : "invisible"
          }">Done
          </button>
          <button class="btn btn-outline-success edit-button"          
            id="edit-task-modal"
            type="submit"
            class="btn btn-block"
            data-toggle="modal"
            data-target="#edit-task-modal">EDIT</button>
          <button class="btn btn-outline-danger delete-button">DELETE</button>
      </div>
    </li> <br>`;
  return html;
};

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }
  addTask(name, description, assignedTo, dueDate, status) {
    const task = {
      id: ++this.currentId,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };
    //Push the task into tasks array[]
    this.tasks.push(task);
  }
  render() {
    const taskHtmlList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      const taskHTML = createTaskHTML(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );
      taskHtmlList.push(taskHTML);
    }
    const tasksHtml = taskHtmlList.join("\n");
    document.querySelector("#tasksList").innerHTML = tasksHtml;
  }
  // create method to retrieve task by ID
  getTaskById(taskId) {
    let foundTask;
    for (let i = 0; i < this.tasks.length; i++) {
      if (taskId === this.tasks[i].id) {
        foundTask = this.tasks[i];
      }
    }
    return foundTask;
  }

  //Task 9: Persisting Tasks to LocalStorage
  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksJson);
    const currentId = new String(this.currentId);
    localStorage.setItem("currentId", currentId);
  }

  load() {
    if (localStorage.getItem("tasks")) {
      const tasksJson = localStorage.getItem("tasks");
      this.tasks = JSON.parse(tasksJson);
    }
    if (localStorage.getItem("currentId")) {
      const currentId = localStorage.getItem("currentId");
      this.currentId = parseInt(currentId);
    }
  }
}
