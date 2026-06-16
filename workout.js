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


// ── NOTES ──────────────────────────────────────────────────────────────────

let notes = JSON.parse(localStorage.getItem("workout-notes") || "[]");

function saveNotes() {
  localStorage.setItem("workout-notes", JSON.stringify(notes));
}

function renderNotes() {
  const list = document.getElementById("note-list");
  list.innerHTML = "";
  notes.forEach((note, i) => {
    const row = document.createElement("div");
    row.className = "note-item";
    row.innerHTML = `
      <span>${note}</span>
      <span style="color:#333;cursor:pointer;font-size:11px;flex-shrink:0;">✕</span>
    `;
    row.querySelector("span:last-child").addEventListener("click", () => {
      notes.splice(i, 1);
      saveNotes();
      renderNotes();
    });
    list.appendChild(row);
  });
}

function addNote() {
  const input = document.getElementById("note-input");
  const note = input.value.trim();
  if (!note) return;
  notes.push(note);
  saveNotes();
  renderNotes();
  input.value = "";
}

document.getElementById("note-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNote();
});

renderNotes();


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
