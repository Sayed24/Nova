// AUTH PROTECTION
const currentUser = JSON.parse(localStorage.getItem("nova-user"));
if (!currentUser || !currentUser.loggedIn) {
  window.location.href = "login.html";
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn){
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("nova-user");
    window.location.href = "login.html";
  });
}

// TASKS STORAGE
let tasks = JSON.parse(localStorage.getItem("nova-tasks") || "[]");

// DOM Elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const taskStatus = document.getElementById("taskStatus");

function renderTasks() {
  const statuses = ["todo","in-progress","done"];
  statuses.forEach(status => {
    const list = document.getElementById(`${status}-list`);
    list.innerHTML = "";
    tasks.filter(t => t.status === status).forEach((task, index) => {
      const div = document.createElement("div");
      div.className = "card task-card";
      div.draggable = true;
      div.innerHTML = `<strong>${task.title}</strong><p>${task.desc}</p>`;
      // Drag Events
      div.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", index);
      });
      // Edit on click
      div.addEventListener("click", () => openModal(task,index));
      list.appendChild(div);
    });
    // Allow drop
    list.addEventListener("dragover", e => e.preventDefault());
    list.addEventListener("drop", e => {
      const idx = e.dataTransfer.getData("text");
      tasks[idx].status = status;
      saveTasks();
      renderTasks();
    });
  });
}

function openModal(task=null, index=null) {
  taskModal.style.display = "block";
  if (task) {
    taskTitle.value = task.title;
    taskDesc.value = task.desc;
    taskStatus.value = task.status;
    saveTaskBtn.dataset.index = index;
    document.getElementById("modalTitle").innerText = "Edit Task";
  } else {
    taskTitle.value = "";
    taskDesc.value = "";
    taskStatus.value = "todo";
    saveTaskBtn.removeAttribute("data-index");
    document.getElementById("modalTitle").innerText = "Add Task";
  }
}

function closeModal() {
  taskModal.style.display = "none";
}

// SAVE TASK
saveTaskBtn.addEventListener("click", () => {
  const title = taskTitle.value.trim();
  const desc = taskDesc.value.trim();
  const status = taskStatus.value;

  if (!title) return alert("Task title required!");

  const idx = saveTaskBtn.dataset.index;
  if (idx !== undefined) {
    tasks[idx] = { title, desc, status };
  } else {
    tasks.push({ title, desc, status });
  }

  saveTasks();
  renderTasks();
  closeModal();
});

// MODAL CONTROLS
addTaskBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);

// SAVE TO LOCALSTORAGE
function saveTasks() {
  localStorage.setItem("nova-tasks", JSON.stringify(tasks));
}

// INITIAL RENDER
renderTasks();
