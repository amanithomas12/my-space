// ── 75 DAYS ────────────────────────────────────────────────────────────────

let ticked = JSON.parse(localStorage.getItem("days75") || "[]");

function renderDays75() {
  const grid = document.getElementById("days75-grid");
  grid.innerHTML = "";
  let count = 0;
  for (let i = 0; i < 75; i++) {
    const box = document.createElement("div");
    box.className = "day75-box" + (ticked[i] ? " ticked" : "");
    box.title = "Day " + (i + 1);
    if (ticked[i]) count++;
    box.addEventListener("click", () => {
      ticked[i] = !ticked[i];
      localStorage.setItem("days75", JSON.stringify(ticked));
      renderDays75();
    });
    grid.appendChild(box);
  }
  document.getElementById("days75-done").textContent = count;
}

renderDays75();


// ── DIET LOG ───────────────────────────────────────────────────────────────

const dietFields = ["diet-breakfast", "diet-lunch", "diet-dinner"];

dietFields.forEach(id => {
  const el = document.getElementById(id);
  el.value = localStorage.getItem(id) || "";
  el.addEventListener("input", () => {
    localStorage.setItem(id, el.value);
  });
});


// ── SELFCARE ESSENTIALS ────────────────────────────────────────────────────

const selfcare = document.getElementById("selfcare-notes");
selfcare.value = localStorage.getItem("selfcare-notes") || "";
selfcare.addEventListener("input", () => {
  localStorage.setItem("selfcare-notes", selfcare.value);
});
