const todoForm = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

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

  const textCompleted = newTask.done ? "task__complete" : "";

  const btnCompleted = newTask.done
    ? "task__checkbox-not-done completed"
    : "task__checkbox-not-done";

  const taskHTML = `
      <li id="${newTask.id}" class="tasks__task">
        <span class="${btnCompleted}" data-type="toggle"></span>
        <p class="${textCompleted}">${newTask.text}</p>
        <span class="task__btn" data-type="remove"></span>
      </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  taskInput.value = "";

  taskInput.focus();

  if (tasksList.children.length !== 0) {
    emptyList.classList.add("none");
  }
}

function deleteTask(e) {
  if (e.target.dataset.type !== "remove") return;

  const parenNode = e.target.closest(".tasks__task");

  const taskId = Number(parenNode.id);

  const index = tasks.findIndex((task) => task.id === taskId);

  tasks.splice(index, 1);

  parenNode.remove();

  if (tasksList.children.length === 0) {
    emptyList.classList.remove("none");
  }
}

function doneTask(e) {
  if (e.target.dataset.type !== "toggle") return;
  const parenNode = e.target.closest(".tasks__task");
  const taskTitle = parenNode.querySelector("p");
  const taskButton = parenNode.querySelector(".task__checkbox-not-done");
  taskTitle.classList.toggle("task__complete");
  taskButton.classList.toggle("completed");
}

// ГОВНОКОД

// const inputElement = document.getElementById("title");
// const createBtn = document.getElementById("create");
// const listElement = document.getElementById("list");

// const notes = [
//   {
//     title: "Learn HTML",
//     completed: true,
//   },
//   {
//     title: "Learn CSS",
//     completed: true,
//   },
//   {
//     title: "Learn JS",
//     completed: false,
//   },
// ];

// function render() {
//   listElement.innerHTML = "";
//   if (notes.length === 0) {
//     listElement.innerHTML = `<div class="tasks__add-task">
//         <img src="pages/Clipboard.png" alt="Board" />
//         <p>Add a task list</p>
//       </div>`
//   }
//   for (let i = 0; i < notes.length; i++) {
//     listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i], i));
//   }
// }
// render();

// createBtn.onclick = function () {
//   if (inputElement.value.length === 0) {
//     return;
//   }
//   const newNote = {
//     title: inputElement.value,
//     completed: false,
//   };
//   notes.push(newNote);
//   render();
//   inputElement.value = "";
// };

// listElement.onclick = function (event) {
//   if (event.target.dataset.index) {
//     const index = parseInt(event.target.dataset.index);
//     const type = event.target.dataset.type;

//     if (type === "toggle") {
//       notes[index].completed = !notes[index].completed;
//     } else if (type === "remove") {
//       notes.splice("remove", 1);
//     }
//     render();
//   }
// };

// function getNoteTemplate(note, index) {
//   return `
//       <li class="tasks__task">
//         <span class="${
//           note.completed ? "task__checkbox-done" : "task__checkbox-not-done"
//         }" data-index="${index}" data-type="toggle"></span>
//         <p class="${note.completed ? "task__complete" : ""}">${note.title}</p>
//         <span class="task__btn" data-type="remove" data-index="${index}"></span>
//       </li>
//   `;
// }
