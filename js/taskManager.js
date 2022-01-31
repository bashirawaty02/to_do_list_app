"use Strict";

const formatStatus = (status) => {
  switch (status) {
    case "toDo":
      status = "TO DO";
      break;
    case "inProgress":
      status = "IN PROGRESS";
      break;
    // case "done":
    //   status = "DONE";
    default:
      status = status.toUpperCase();
  }
  return status;
};

const createTaskHTML = (id, name, description, assignedTo, dueDate, status) => {
  formattedStatus = formatStatus(status);
  const html = `
    <li data-task-id=${id} class="list-group-item"  ondragstart="dragStart(event)"  draggable="true" id="${id}">
      <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
          <h5>${name}</h5>
          <span class="badge ${
            status === "toDo" ? "badge-danger" : status === "inProgress" ? "badge-warning" : "badge-success"
          }" >${formattedStatus}</span>
      </div>
      <div class="d-flex w-100 mb-3 justify-content-between">
          <small>Assigned To: ${assignedTo}</small>
          <small>Due: ${dueDate}</small>
      </div>
      <p>${description}</p>
      <div class="d-flex w-100 justify-content-end">
          <button class="btn done-button ${
            status != "done" ? "visible" : "invisible"
          }">DONE
          </button>
          <button class="btn edit-button"          
            id="edit-task-modal"
            type="submit"
            class="btn btn-block"
            data-toggle="modal"
            data-target="#edit-task-modal">EDIT</button>
          <button class="btn btn-outline-danger delete-button">DELETE</button>
      </div>
    </li><br>`;
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
    const taskHtmlListToDo = [];
    const taskHtmlListInProgress = [];
    const taskHtmlListDone = [];
    let task;
    for (let i = 0; i < this.tasks.length; i++) {
      task = this.tasks[i];
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
      if (task.status === "toDo") {
        taskHtmlListToDo.push(taskHTML);
      } else if (task.status === "inProgress") {
        taskHtmlListInProgress.push(taskHTML);
      } else {
        taskHtmlListDone.push(taskHTML);
      }

      // taskHtmlList.push(taskHTML);
    }
    const tasksHtmlToDo = taskHtmlListToDo.join("\n");
    document.querySelector("#todo").innerHTML = taskHtmlListToDo;
    const tasksHtmlInProgress = taskHtmlListInProgress.join("\n");
    document.querySelector("#inprogress").innerHTML = taskHtmlListInProgress;
    const tasksHtmlDone = taskHtmlListDone.join("\n");
    document.querySelector("#done").innerHTML = taskHtmlListDone;

    // console.log(task.status);
    // if (task.status === "toDo") {
    //   document.querySelector("#todo").innerHTML = tasksHtml;
    // } else if (task.status === "inProgress") {
    //   document.querySelector("#inprogress").innerHTML = tasksHtml;
    // } else {
    //   document.querySelector("#done").innerHTML = tasksHtml;
    // }
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

  //==========================================
  //        Task 10: Deleting Tasks
  //==========================================
  deleteTask(taskId) {
    const newTasks = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;
  }

  //Question : The task must be in the To Do column, Otherwise, the event does not fire.Check..........
  deleteTaskToDo(taskId) {
    const newTasksToDo = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id != taskId && task.status == "toDo") {
        newTasksToDo.push(task);
      }
    }
    this.tasks = newTasksToDo;
  }
  deleteTaskInProgress(taskId) {
    const newTasksInProgress = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id != taskId && task.status == "inProgress") {
        newTasksToDo.push(task);
      }
    }
    this.tasks = newTasksInProgress;
  }

  deleteTaskDone(taskId) {
    const newTasksDone = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id != taskId && task.status === "toDo") {
        newTasksDone.push(task);
      }
    }
    this.tasks = newTasksDone;
  }
  //==========================================
  // Sprint-3 Stretch Goal : Edit Modal Popup
  //==========================================
  editTask(taskId, name, description, assignedTo, dueDate, status){
    const editedTaskObject = {
      id : taskId,
      name,
      description,
      assignedTo,
      dueDate,
      status
    }

    const index = this.tasks.findIndex((item)=>item.id === taskId);
    this.tasks.splice(index, 1, editedTaskObject);
  }
}
