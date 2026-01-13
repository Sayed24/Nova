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

// ANIMATED COUNTERS
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const increment = target / 100;

  const update = () => {
    count += increment;
    if (count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };
  update();
});

// CIRCULAR PROGRESS
document.querySelectorAll("svg circle").forEach(circle => {
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const percent = 70; // example percentage
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference - (percent/100)*circumference;
});
