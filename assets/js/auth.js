// PASSWORD STRENGTH
function checkStrength(password, bar) {
  let strength = 0;
  if (password.length > 5) strength++;
  if (password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[\W]/)) strength++;

  let colors = ["#ef4444","#facc15","#22f5c3","#7c7cff"];
  bar.style.width = (strength*25)+"%";
  bar.style.background = colors[strength-1] || "#ef4444";
}

// LOGIN FORM
const loginForm = document.getElementById("loginForm");
if (loginForm){
  const strengthBar = document.getElementById("strength");
  const passwordInput = document.getElementById("password");

  passwordInput.addEventListener("input", () => {
    checkStrength(passwordInput.value, strengthBar);
  });

  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = passwordInput.value;

    if (!email || !password) return alert("Please fill all fields.");

    // save session
    localStorage.setItem("nova-user", JSON.stringify({ email, loggedIn:true }));
    window.location.href = "dashboard.html";
  });
}

// SIGNUP FORM
const signupForm = document.getElementById("signupForm");
if (signupForm){
  const strengthBar = document.getElementById("strength");
  const passwordInput = document.getElementById("password");

  passwordInput.addEventListener("input", () => {
    checkStrength(passwordInput.value, strengthBar);
  });

  signupForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = passwordInput.value;

    if (!name || !email || !password) return alert("Please fill all fields.");

    // store user in localStorage
    let users = JSON.parse(localStorage.getItem("nova-users") || "[]");
    users.push({ name, email, password });
    localStorage.setItem("nova-users", JSON.stringify(users));
    localStorage.setItem("nova-user", JSON.stringify({ email, loggedIn:true }));

    window.location.href = "dashboard.html";
  });
}
