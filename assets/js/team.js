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

// SAMPLE TEAM DATA
let teamMembers = [
  { name:"Alice", role:"Developer", status:"online" },
  { name:"Bob", role:"Designer", status:"offline" },
  { name:"Charlie", role:"Manager", status:"online" },
  { name:"Dana", role:"QA", status:"away" },
];

// RENDER TEAM CARDS
const teamContainer = document.getElementById("teamContainer");

function renderTeam() {
  teamContainer.innerHTML = "";
  teamMembers.forEach((member,index)=>{
    const div = document.createElement("div");
    div.className = "card user-card";
    div.innerHTML = `
      <div class="flex space-between">
        <strong>${member.name}</strong>
        <span class="status ${member.status}"></span>
      </div>
      <p>${member.role}</p>
      <div class="details" style="display:none;">
        <p>Email: ${member.name.toLowerCase()}@nova.com</p>
        <p>Last active: ${member.status === 'online' ? 'Now' : '1h ago'}</p>
      </div>
    `;
    // Tap to toggle details
    div.addEventListener("click", ()=>{
      const details = div.querySelector(".details");
      details.style.display = details.style.display === "none" ? "block" : "none";
    });
    teamContainer.appendChild(div);
  });
}

// SAMPLE ACTIVITY TIMELINE
const activityTimeline = document.getElementById("activityTimeline");
let activities = [
  "Alice completed task 'UI Design'",
  "Bob uploaded assets",
  "Charlie updated project plan",
  "Dana tested new features",
];

function renderTimeline() {
  activityTimeline.innerHTML = "";
  activities.forEach(act=>{
    const li = document.createElement("li");
    li.innerText = act;
    activityTimeline.appendChild(li);
  });
}

// INIT
renderTeam();
renderTimeline();
