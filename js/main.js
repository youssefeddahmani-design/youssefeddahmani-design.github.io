// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    if(username) {
      localStorage.setItem("destigoUser", username);
      localStorage.setItem("visitedCountries", JSON.stringify([]));
      window.location.href = "dashboard.html";
    }
  });
}

// DASHBOARD
const userDisplay = document.getElementById("userDisplay");
const visitedList = document.getElementById("visitedCountries");
const countryButtonsContainer = document.getElementById("countryButtons");
const logoutBtn = document.getElementById("logoutBtn");

const countries = ["España","Italia","Francia","Alemania","Japón","México","Brasil"];

if (userDisplay) {
  const user = localStorage.getItem("destigoUser");
  if(!user) {
    window.location.href = "login.html";
  } else {
    userDisplay.textContent = user;
  }

  let visited = JSON.parse(localStorage.getItem("visitedCountries")) || [];

  function renderVisited() {
    visitedList.innerHTML = "";
    visited.forEach(country => {
      const li = document.createElement("li");
      li.textContent = country;
      li.className = "list-group-item";
      visitedList.appendChild(li);
    });
  }

  renderVisited();

  // Botones para marcar nuevos países
  countryButtonsContainer.innerHTML = "";
  countries.forEach(country => {
    const btn = document.createElement("button");
    btn.textContent = country;
    btn.className = "btn btn-outline-primary m-1";
    if (visited.includes(country)) btn.disabled = true;

    btn.addEventListener("click", () => {
      visited.push(country);
      localStorage.setItem("visitedCountries", JSON.stringify(visited));
      renderVisited();
      btn.disabled = true;
    });

    countryButtonsContainer.appendChild(btn);
  });

  // Cerrar sesión
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("destigoUser");
    localStorage.removeItem("visitedCountries");
    window.location.href = "login.html";
  });
}
