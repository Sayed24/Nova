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

// SAMPLE DATA
let tasks = JSON.parse(localStorage.getItem("nova-tasks") || "[]");

// DATE FILTER
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const applyFilter = document.getElementById("applyFilter");

applyFilter.addEventListener("click", () => {
  alert("Date filter applied (mocked)");
});

// DRAW LINE CHART
function drawLineChart() {
  const canvas = document.getElementById("lineChart");
  const ctx = canvas.getContext("2d");

  const data = [5,10,7,15,12,20,18]; // example values
  const labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  // clear
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.beginPath();
  ctx.moveTo(50, 300 - data[0]*10);
  data.forEach((val, i) => {
    ctx.lineTo(50 + i*80, 300 - val*10);
  });
  ctx.strokeStyle = "#22f5c3";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Labels
  ctx.fillStyle = "#fff";
  ctx.font = "14px sans-serif";
  labels.forEach((label,i) => {
    ctx.fillText(label, 45 + i*80, 310);
  });
}

// DRAW BAR CHART
function drawBarChart() {
  const canvas = document.getElementById("barChart");
  const ctx = canvas.getContext("2d");

  const data = [5,10,7,15,12,20,18];

  ctx.clearRect(0,0,canvas.width,canvas.height);
  data.forEach((val,i) => {
    ctx.fillStyle = "#7c7cff";
    ctx.fillRect(50 + i*80, 300 - val*10, 40, val*10);
  });
}

// DRAW PIE CHART
function drawPieChart() {
  const canvas = document.getElementById("pieChart");
  const ctx = canvas.getContext("2d");

  const data = [10,20,30];
  const colors = ["#22f5c3","#7c7cff","#facc15"];
  const total = data.reduce((a,b)=>a+b,0);

  let startAngle = 0;
  data.forEach((val,i) => {
    const angle = (val/total)*2*Math.PI;
    ctx.beginPath();
    ctx.moveTo(200,200);
    ctx.arc(200,200,150,startAngle,startAngle+angle);
    ctx.fillStyle = colors[i];
    ctx.fill();
    startAngle += angle;
  });
}

// INIT
drawLineChart();
drawBarChart();
drawPieChart();
