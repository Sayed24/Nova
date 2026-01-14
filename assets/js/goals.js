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

// STREAK TRACKER
const streakContainer = document.getElementById("streakContainer");
let streak = JSON.parse(localStorage.getItem("nova-streak") || "0");

function renderStreak() {
  streakContainer.innerHTML = "";
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  days.forEach((day, i) => {
    const div = document.createElement("div");
    div.className = "card center";
    div.style.background = i < streak ? "#22f5c3" : "#444";
    div.innerText = day;
    streakContainer.appendChild(div);
  });
}

// GOALS MANAGEMENT
const newGoal = document.getElementById("newGoal");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalsList = document.getElementById("goalsList");

let goals = JSON.parse(localStorage.getItem("nova-goals") || "[]");

function renderGoals() {
  goalsList.innerHTML = "";
  goals.forEach((goal, index) => {
    const div = document.createElement("div");
    div.className = "card flex space-between";
    div.innerHTML = `
      <span>${goal.name}</span>
      <input type="checkbox" ${goal.done ? "checked" : ""} data-index="${index}">
    `;
    goalsList.appendChild(div);

    // toggle done
    div.querySelector("input").addEventListener("change", e => {
      goals[index].done = e.target.checked;
      saveGoals();
    });
  });
}

function saveGoals() {
  localStorage.setItem("nova-goals", JSON.stringify(goals));
}

// ADD GOAL
addGoalBtn.addEventListener("click", () => {
  const name = newGoal.value.trim();
  if (!name) return alert("Enter a goal!");
  goals.push({ name, done:false });
  saveGoals();
  renderGoals();
  newGoal.value = "";
});

// INIT
renderStreak();
renderGoals();
