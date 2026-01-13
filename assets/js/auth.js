const usersKey = "nova_users";
const sessionKey = "nova_session";

/* UTIL */
function getUsers() {
  return JSON.parse(localStorage.getItem(usersKey)) || [];
}

function saveUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

/* SIGN UP */
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = getUsers();
    if (users.find(u => u.email === email)) {
      alert("User already exists");
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);

    localStorage.setItem(sessionKey, email);
    window.location.href = "dashboard.html";
  });
}

/* LOGIN */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = getUsers();
    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem(sessionKey, email);
    window.location.href = "dashboard.html";
  });
}

/* PASSWORD STRENGTH */
const pwd = document.getElementById("password");
const strength = document.getElementById("strength");

if (pwd && strength) {
  pwd.addEventListener("input", () => {
    const val = pwd.value;
    let score = 0;
    if (val.length > 6) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    strength.textContent =
      score < 2 ? "Weak" : score < 4 ? "Medium" : "Strong";

    strength.style.color =
      score < 2 ? "red" : score < 4 ? "orange" : "lightgreen";
  });
}
