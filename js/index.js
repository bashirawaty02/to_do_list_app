"use Strict";
const newTaskForm = document.querySelector("#newTaskForm");
// Reset modal and clear both error and success messages
const resetModal = document.querySelector("#open-task-modal");
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
  // refreshFormModal();
});
function refreshFormModal() {
  newTaskForm.reload(true);
}
// $(".modal").on("hidden.bs.modal", function () {
//   $(".new-task-modal").html("");
// });
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
});
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