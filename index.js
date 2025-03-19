document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Function to add a new task
  function addTask(taskText = null) {
    taskText = taskText || taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${taskText}</span>
      <div>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    // Add event listeners for Edit and Delete buttons
    li.querySelector(".edit").addEventListener("click", () => editTask(li));
    li.querySelector(".delete").addEventListener("click", () => deleteTask(li));

    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks(); // Save tasks after adding
  }

  // Function to edit a task
  function editTask(taskElement) {
    const taskText = taskElement.querySelector("span").textContent;
    const newTaskText = prompt("Edit your task:", taskText);
    if (newTaskText !== null && newTaskText.trim() !== "") {
      taskElement.querySelector("span").textContent = newTaskText;
      saveTasks(); // Save after editing
    }
  }

  // Function to delete a task
  function deleteTask(taskElement) {
    taskElement.remove();
    saveTasks(); // Save after deleting
  }

  // Add event listener to the "Add" button
  addTaskBtn.addEventListener("click", () => addTask());

  // Function to save tasks in local storage
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((taskElement) => {
      tasks.push(taskElement.querySelector("span").textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to load tasks from local storage on page reload
  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => addTask(task));
  }

  // Load tasks when the page is refreshed
  loadTasks();
});
