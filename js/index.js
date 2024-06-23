const inputElement = document.getElementById("title");
const createBtn = document.getElementById("create");
const listElement = document.getElementById("list");

createBtn.onclick = function () {
  if (inputElement.value.length === 0) {
    return;
  }
  listElement.insertAdjacentHTML(
    "beforeend",
    `
      <li class="tasks__task">
        <input type="checkbox" />
        <p></p>
        <button><img src="pages/Vector (1).png" alt="trash" /></button>
      </li>
    `
  );
  inputElement.value = "";
};
