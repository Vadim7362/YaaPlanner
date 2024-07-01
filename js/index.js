const todoForm = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");
const tasksHeader = document.querySelector("#tasksHeader");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

counterTasks();

form.addEventListener("submit", addTask);

tasksList.addEventListener("click", deleteTask);

tasksList.addEventListener("click", doneTask);

function addTask(e) {
  e.preventDefault();

  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);

  saveToLocalStorage();

  renderTask(newTask);

  taskInput.value = "";

  taskInput.focus();

  checkEmptyList();

  counterTasks();
}

function deleteTask(e) {
  if (e.target.dataset.type !== "remove") return;

  const parenNode = e.target.closest(".tasks__task");

  const taskId = Number(parenNode.id);

  const index = tasks.findIndex((task) => task.id === taskId);

  tasks.splice(index, 1);

  saveToLocalStorage();

  parenNode.remove();

  checkEmptyList();

  counterTasks();
}

function doneTask(e) {
  if (e.target.dataset.type !== "toggle") return;

  const parenNode = e.target.closest(".tasks__task");

  const taskId = Number(parenNode.id);

  const task = tasks.find((task) => task.id === taskId);

  task.done = !task.done;

  saveToLocalStorage();

  const taskTitle = parenNode.querySelector("p");

  const taskButton = parenNode.querySelector(".task__checkbox-not-done");

  taskTitle.classList.toggle("task__complete");

  taskButton.classList.toggle("completed");

  counterTasks();
}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `
      <div class="tasks__add-task" id="emptyList">
        <img src="assets/Clipboard.png" alt="Board" />
        <p>Add a task list</p>
      </div>
      `;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const textCompleted = task.done ? "task__complete" : "";

  const btnCompleted = task.done
    ? "task__checkbox-not-done completed"
    : "task__checkbox-not-done";

  const taskHTML = `
      <li id="${task.id}" class="tasks__task">
        <span class="${btnCompleted}" data-type="toggle"></span>
        <p class="${textCompleted}">${task.text}</p>
        <span class="task__btn" data-type="remove"></span>
      </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}

function counterTasks() {
  const delCount = document.getElementById("tasksHeader");

  delCount.innerHTML = "";

  let accessCount = Object.values(tasks).filter(function (el) {
    return el.done === true;
  }).length;

  const counterHTML = `
    <div class="all__tasks-container">
      <p class="tasks__all">All tasks</p>
      <span class="tasks__count" id="tasks__total">${tasks.length}</span>
    </div>
    <div class="completed__tasks-container">
      <p class="tasks__completed">Completed tasks</p>
      <span class="tasks__count" id="tasksCompleted">${accessCount}</span>
    </div>
  `;
  tasksHeader.insertAdjacentHTML("beforeend", counterHTML);
}
