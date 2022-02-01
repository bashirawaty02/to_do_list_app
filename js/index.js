"use Strict";
const taskManager = new TaskManager(0);
// For Additional Feature - Edit button
let editTask;

// *****************************************************
// Whenever the page loads,
// it will only load what is in the local storage
// *****************************************************
loadPage = () => {
  taskManager.load();
  taskManager.render();
};

window.onload = loadPage();

// taskManager.load();
// taskManager.render();

const newTaskForm = document.querySelector("#newTaskForm");
// Reset modal and clear both error and success messages
const resetModal = document.querySelector("#open-task-modal");
const dateElement = document.querySelector("#currentDate");
/************************************************************
 * TASK 4 :
 ************************************************************/
// event listener
resetModal.addEventListener("click", () => {
  let messages = document.querySelectorAll(".validation-message");
  for (let i = 0; i < messages.length; i++) {
    messages[i].innerText = "";
  }
  let icons = document.querySelectorAll(".fas");
  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.remove("fa-check-circle");
    icons[i].classList.remove("fa-exclamation-circle");
    icons[i].parentElement.classList.remove("success");
    icons[i].parentElement.classList.remove("error");
  }
});
$(".modal").on("hidden.bs.modal", function () {
  $(this).find("form")[0].reset();
});
newTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTaskNameInput = document.querySelector("#newTaskNameInput");
  const newTaskDescription = document.querySelector("#newTaskDescription");
  const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
  const newTaskDueDate = document.querySelector("#newTaskDueDate");
  const validationStatus = document.querySelector("#validationStatus");

  const name = newTaskNameInput.value.trim();
  const taskDescription = newTaskDescription.value.trim();
  const assignedTo = newTaskAssignedTo.value.trim();
  const dueDate = newTaskDueDate.value.trim();
  const status = validationStatus.value.trim();

  clearErrorMessage(newTaskNameInput);
  clearErrorMessage(newTaskDescription);
  clearErrorMessage(newTaskAssignedTo);
  clearErrorMessage(newTaskDueDate);
  clearErrorMessage(validationStatus);
  let isValid = validFormFieldInput(
    name,
    taskDescription,
    assignedTo,
    dueDate,
    status
  );
  if (isValid) {
    taskManager.addTask(name, taskDescription, assignedTo, dueDate, status);
    //Clear the text content within each tag
    newTaskNameInput.value = "";
    newTaskDescription.value = "";
    newTaskAssignedTo.value = "";
    newTaskDueDate.value = "";
    validationStatus.value = "";
  }
  taskManager.save();
  taskManager.render();
});
// validate the form
const validFormFieldInput = (
  name,
  taskDescription,
  assignedTo,
  dueDate,
  status
) => {
  // Setting boolean values
  let isNameValid = false;
  let isDescriptionValid = false;
  let isAssignedToValid = false;
  let isDueDateValid = false;
  let isStatusValid = false;

  //Clear error messages for new form input
  clearErrorMessage(newTaskNameInput);
  clearErrorMessage(newTaskDescription);
  clearErrorMessage(newTaskAssignedTo);
  clearErrorMessage(newTaskDueDate);
  clearErrorMessage(validationStatus);

  // Clear error messages for edit form input
  clearErrorMessage(editTaskNameInput);
  clearErrorMessage(editTaskDescription);
  clearErrorMessage(editTaskAssignedTo);
  clearErrorMessage(editTaskDueDate);
  clearErrorMessage(editValidationStatus);

  // Name Validation
  if (name === "" || name === null) {
    //Show error and Add error class
    setErrorFor(newTaskNameInput, "Name cannot be blank.");
    setErrorFor(editTaskNameInput, "Name cannot be blank.");
  } else if (name.length <= 5) {
    setErrorFor(newTaskNameInput, "Must be greater than 5.");
    setErrorFor(editTaskNameInput, "Must be greater than 5.");
  } else {
    setSuccessFor(newTaskNameInput, "Correct input!");
    setSuccessFor(editTaskNameInput, "Correct input!");
    isNameValid = true;
  }
  // for task description
  if (taskDescription === "" || taskDescription === null) {
    setErrorFor(newTaskDescription, "Description cannot be blank.");
    setErrorFor(editTaskDescription, "Description cannot be blank.");
  } else if (taskDescription.length <= 5) {
    setErrorFor(newTaskDescription, "Must be greater than 5.");
    setErrorFor(editTaskDescription, "Must be greater than 5.");
  } else {
    setSuccessFor(newTaskDescription, "Correct input!");
    setSuccessFor(editTaskDescription, "Correct input!");
    isDescriptionValid = true;
  }
  // for assigned to
  if (assignedTo === "" || assignedTo === null) {
    setErrorFor(newTaskAssignedTo, "Description cannot be blank.");
    setErrorFor(editTaskAssignedTo, "Description cannot be blank.");
  } else if (assignedTo.length <= 5) {
    setErrorFor(newTaskAssignedTo, "Must be greater than 5.");
    setErrorFor(editTaskAssignedTo, "Must be greater than 5.");
  } else {
    setSuccessFor(newTaskAssignedTo, "Correct input!");
    setSuccessFor(editTaskAssignedTo, "Correct input!");
    isAssignedToValid = true;
  }
  // for due date
  const today = formatDate(new Date());
  if (dueDate === "") {
    setErrorFor(newTaskDueDate, "Due date cannot be blank.");
    setErrorFor(editTaskDueDate, "Due date cannot be blank.");
  } else if (dueDate < today) {
    setErrorFor(newTaskDueDate, "Due date cannot be in the past");
    setErrorFor(editTaskDueDate, "Due date cannot be in the past");
  } else {
    setSuccessFor(newTaskDueDate, "Correct input!");
    setSuccessFor(editTaskDueDate, "Correct input!");
    isDueDateValid = true;
  }
  // for status
  if (status === "" || status === null) {
    setErrorFor(validationStatus, "Please select an option.");
    setErrorFor(editValidationStatus, "Please select an option.");
  } else {
    setSuccessFor(validationStatus, "Correct input!");
    setSuccessFor(editValidationStatus, "Correct input!");
    isStatusValid = true;
  }
  return (
    isNameValid &&
    isDescriptionValid &&
    isAssignedToValid &&
    isDueDateValid &&
    isStatusValid
  );
};
// format date
const formatDate = (date) => {
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let year = date.getFullYear();
  return `${year}-${month}-${day}`;
  // december dueDate > april currentDate = true is good
  // dueDate < today cannot be allowed
};
/**
 * Set error message for each invalid input
 */
function setErrorFor(element, message) {
  const small = element.parentElement.lastElementChild;
  small.innerText = message;
  small.style.visibility = "visible";
  element.parentElement.classList.add("error");
}
/**
 * Set success message for each valid input
 */
function setSuccessFor(element, message) {
  const small = element.parentElement.lastElementChild;
  small.innerText = message;
  small.style.visibility = "visible";
  element.parentElement.classList.add("success");
}
// clear error messages
function clearErrorMessage(element) {
  const small = element.parentElement.lastElementChild;
  small.innerText = "";
  small.style.visibility = "hidden";
  element.parentElement.classList.remove("error");
}
//===========================================================
// Task 5: Adding Tasks
//===========================================================
// display Current date format
const formatCurrentDate = (date) => {
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const todayDate = formatCurrentDate(new Date());
function displayCurrentDate(dateElement) {
  dateElement.innerText = todayDate;
}
displayCurrentDate(dateElement);
//===============================================================
// Sprint - 3 - Task 8 - Update A Task
//===============================================================
const tasksList = document.querySelectorAll("#todo, #inprogress, #done");
tasksList.forEach((element) => {
  element.addEventListener("click", (event) => {
    // select the li
    const parentTask = event.target.parentElement.parentElement;
    const taskId = Number(parentTask.dataset.taskId);

    if (event.target.classList.contains("done-button")) {
      let task = taskManager.getTaskById(taskId);
      task.status = "done";
      taskManager.save();
      taskManager.render();
    }

    //======================================
    // Sprint - 3 :  Task 10: Deleting Tasks
    //======================================
    if (event.target.classList.contains("delete-button")) {
      taskManager.deleteTask(taskId);
      taskManager.save();
      taskManager.render();
    }

    //======================================
    // Sprint - 3 :  Additional Feature - Edit button
    //======================================
    if (event.target.classList.contains("edit-button")) {
      const index = taskManager.tasks.findIndex((item) => {
        if (item.id === taskId) return taskId;
      });

      editTask = taskManager.tasks[index];
      preloadModal();
    }
  });
});

//=================================================
// Light and Dark Theme
//=================================================
const checkbox = document.querySelector("#checkbox");
checkbox.addEventListener("change", () => {
  //Change the theme of website
  document.body.classList.toggle("dark");
});

//=================================================
// Drag and Drop Feature - Method - 1
//=================================================

// Drop targets are all three cols and have 4 events attached to each of the col
// const todos = document.querySelectorAll(".list-group");
const todos = document.querySelectorAll(".list-group-item");
const dropBoxes = document.querySelectorAll(".drop-box");

for (const dropBox of dropBoxes) {
  // dropBox.addEventListener("dragenter", dragEnter);
  dropBox.addEventListener("dragover", dragOver);
  // dropBox.addEventListener("dragleave", dragLeave);
  dropBox.addEventListener("drop", dragDrop);
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  // console.log(e.target.id);
  // draggableToDo = e.target;
  // draggableToDo = this; // this points to the element the event occurs
  // console.log('dragStart....')
}

function dragOver(e) {
  // default behaviour does not allow tha dropped target area to grab the draggable elements. Therefore, you need to prevent this behaviour
  e.preventDefault();
  // console.log('drg over');
}
function dragEnter(e) {
  this.style.border = "3px #F4B400 dotted";
  // console.log('drg enter');
}
function dragLeave(e) {
  this.style.border = "var(--green) 1px solid";
  // console.log('drg leave');
}
function dragDrop(e) {
  this.style.border = "var(--green) 1px solid";
  const id = e.dataTransfer.getData("text");
  // console.log(id);
  // console.log(id);
  const draggableElement = document.getElementById(id);
  // console.log(draggableElement);
  this.lastElementChild.appendChild(draggableElement);
  if (e.target.lastElementChild.id === "todo") {
    const taskId = Number(id);
    let task = taskManager.getTaskById(taskId);
    task.status = "toDo";
    taskManager.save();
    taskManager.render();
  } else if (e.target.lastElementChild.id === "inprogress") {
    const taskId = Number(id);
    let task = taskManager.getTaskById(taskId);
    task.status = "inProgress";
    taskManager.save();
    taskManager.render();
  } else {
    const taskId = Number(id);
    let task = taskManager.getTaskById(taskId);
    task.status = "done";
    taskManager.save();
    taskManager.render();
  }
}

//===============================================================
// Sprint-3 Stretch Goal : Edit Modal Popup
//===============================================================
const editTaskForm = document.querySelector("#editTaskForm");
if (editTaskForm) {
  editTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    //Select inputs
    const editTaskNameInput = document.querySelector("#editTaskNameInput");
    const editTaskDescription = document.querySelector("#editTaskDescription");
    const editTaskAssignedTo = document.querySelector("#editTaskAssignedTo");
    const editTaskDueDate = document.querySelector("#editTaskDueDate");
    const editValidationStatus = document.querySelector(
      "#editValidationStatus"
    );

    // Get all inputs values and remove white spaces with trim()
    const name = editTaskNameInput.value.trim();
    const description = editTaskDescription.value.trim();
    const assignedTo = editTaskAssignedTo.value.trim();
    const dueDate = editTaskDueDate.value.trim();
    const status = editValidationStatus.value.trim();

    clearErrorMessage(editTaskNameInput);
    clearErrorMessage(editTaskDescription);
    clearErrorMessage(editTaskAssignedTo);
    clearErrorMessage(editTaskDueDate);
    clearErrorMessage(editValidationStatus);

    let isValid = validFormFieldInput(
      name,
      description,
      assignedTo,
      dueDate,
      status
    );
    if (isValid) {
      taskManager.editTask(
        editTask.id,
        name,
        description,
        assignedTo,
        dueDate,
        status
      );
      //Clear the text content within each tag
      newTaskNameInput.value = "";
      newTaskDescription.value = "";
      newTaskAssignedTo.value = "";
      newTaskDueDate.value = "";
      validationStatus.value = "";
    }
    taskManager.save();
    taskManager.render();
  });
}

function preloadModal() {
  document.querySelector("#editTaskNameInput").value = editTask.name;
  document.querySelector("#editTaskAssignedTo").value = editTask.assignedTo;
  document.querySelector("#editTaskDueDate").value = editTask.dueDate;
  document.querySelector("#editValidationStatus").value = editTask.status;
  document.querySelector("#editTaskDescription").value = editTask.description;

  clearErrorMessage(editTaskNameInput);
  clearErrorMessage(editTaskDescription);
  clearErrorMessage(editTaskAssignedTo);
  clearErrorMessage(editTaskDueDate);
  clearErrorMessage(editValidationStatus);
}
