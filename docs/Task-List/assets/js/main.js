const newTask = document.querySelector(".new-task");
const btnTask = document.querySelector(".btn-task");
const tasks = document.querySelector(".tasks");

function createLi() {
  const li = document.createElement("li");
  return li;
}

newTask.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (!newTask.value) return;
    createTask(newTask.value);
  }
});

function clearInput() {
  newTask.value = "";
  newTask.focus();
}

function btnDelete(li) {
  li.innerText += " ";
  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Delete";
  btnDelete.setAttribute("class", "delete");
  btnDelete.setAttribute("title", "Delete this task");
  li.appendChild(btnDelete);
}

function createTask(text) {
  const li = createLi();
  li.innerHTML = text;
  tasks.appendChild(li);
  clearInput();
  btnDelete(li);
  saveTasks();
}

btnTask.addEventListener("click", function () {
  if (!newTask.value) return;
  createTask(newTask.value);
});

document.addEventListener("click", (e) => {
  const el = e.target;

  if (el.classList.contains("delete")) {
    el.parentElement.remove();
  }
});

function saveTasks() {
  const liTasks = tasks.querySelectorAll("li");
  const taskList = [];

  for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace("Delete", "").trim();
    taskList.push(taskText);
  }

  const taskJSON = JSON.stringify(taskList);
  localStorage.setItem("Tasks", taskJSON);
}

function addSaveTask() {
  const tasks = localStorage.getItem("Tasks");
  const taskList = JSON.parse(tasks);

  for(let task of taskList) {
    createTask(task);
  }
}

addSaveTask();
