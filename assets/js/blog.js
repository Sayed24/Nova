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

// SAMPLE ARTICLES (Markdown-like)
let articles = [
  { title:"Getting Started with NOVA", content:"# Welcome\nNOVA is a powerful SaaS platform.\n\n## Features\n- Tasks\n- Analytics\n- Goals\n\nEnjoy using NOVA!" },
  { title:"Boost Productivity", content:"# Productivity Tips\n1. Plan your tasks\n2. Track your goals\n3. Analyze results" },
  { title:"Collaboration Best Practices", content:"# Teamwork\n- Communicate clearly\n- Assign roles\n- Monitor progress" },
];

// RENDER ARTICLES
const articlesContainer = document.getElementById("articlesContainer");

function renderArticles(filter="") {
  articlesContainer.innerHTML = "";
  articles.filter(a => a.title.toLowerCase().includes(filter.toLowerCase())).forEach(article=>{
    const div = document.createElement("div");
    div.className = "card article-card";
    // Simple markdown rendering
    const htmlContent = article.content
      .replace(/^# (.*$)/gim, "<h2>$1</h2>")
      .replace(/^## (.*$)/gim, "<h3>$1</h3>")
      .replace(/^\- (.*$)/gim, "<li>$1</li>")
      .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
      .replace(/\n/g, "<br>");
    div.innerHTML = `<h3>${article.title}</h3><p>${htmlContent}</p>`;
    articlesContainer.appendChild(div);
  });
}

// SEARCH
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e)=>renderArticles(e.target.value));

// FONT SIZE TOGGLE
const increaseFont = document.getElementById("increaseFont");
const decreaseFont = document.getElementById("decreaseFont");

increaseFont.addEventListener("click", ()=> {
  const current = parseInt(window.getComputedStyle(articlesContainer).fontSize);
  articlesContainer.style.fontSize = (current + 2) + "px";
});

decreaseFont.addEventListener("click", ()=> {
  const current = parseInt(window.getComputedStyle(articlesContainer).fontSize);
  articlesContainer.style.fontSize = (current - 2) + "px";
});

// READING PROGRESS BAR
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", ()=>{
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  progressBar.style.width = progress + "%";
});

// INIT
renderArticles();
