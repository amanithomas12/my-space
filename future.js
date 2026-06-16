// ── UNIVERSITIES ───────────────────────────────────────────────────────────

let unis = JSON.parse(localStorage.getItem("future-unis") || "[]");

const statuses = ["researching", "applying", "applied", "watchlist"];

function saveUnis() {
  localStorage.setItem("future-unis", JSON.stringify(unis));
}

function renderUnis() {
  const list = document.getElementById("uni-list");
  list.innerHTML = "";
  unis.forEach((u, i) => {
    const row = document.createElement("div");
    row.className = "tracker-row";
    row.innerHTML = `
      <div>
        <div class="tracker-name">${u.name}</div>
        <div class="tracker-deadline">${u.deadline || "No deadline set"}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="status-tag tag-${u.status}" style="cursor:pointer;" title="Click to update status">${u.status}</span>
        <span style="color:#333;cursor:pointer;font-size:11px;">✕</span>
      </div>
    `;

    row.querySelector(".status-tag").addEventListener("click", () => {
      const idx = statuses.indexOf(unis[i].status);
      unis[i].status = statuses[(idx + 1) % statuses.length];
      saveUnis();
      renderUnis();
    });

    row.querySelectorAll("span")[1].addEventListener("click", () => {
      unis.splice(i, 1);
      saveUnis();
      renderUnis();
    });

    list.appendChild(row);
  });
}

function addUni() {
  const nameInput = document.getElementById("uni-input");
  const deadlineInput = document.getElementById("uni-deadline");
  const name = nameInput.value.trim();
  if (!name) return;
  unis.push({ name, deadline: deadlineInput.value.trim(), status: "researching" });
  saveUnis();
  renderUnis();
  nameInput.value = "";
  deadlineInput.value = "";
}

document.getElementById("uni-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addUni();
});

renderUnis();


// ── INTERNSHIPS ────────────────────────────────────────────────────────────

let interns = JSON.parse(localStorage.getItem("future-interns") || "[]");

function saveInterns() {
  localStorage.setItem("future-interns", JSON.stringify(interns));
}

function renderInterns() {
  const list = document.getElementById("intern-list");
  list.innerHTML = "";
  interns.forEach((intern, i) => {
    const row = document.createElement("div");
    row.className = "tracker-row";
    row.innerHTML = `
      <div>
        <div class="tracker-name">${intern.name}</div>
        <div class="tracker-deadline">${intern.deadline || "No deadline set"}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="status-tag tag-${intern.status}" style="cursor:pointer;" title="Click to update status">${intern.status}</span>
        <span style="color:#333;cursor:pointer;font-size:11px;">✕</span>
      </div>
    `;

    row.querySelector(".status-tag").addEventListener("click", () => {
      const idx = statuses.indexOf(interns[i].status);
      interns[i].status = statuses[(idx + 1) % statuses.length];
      saveInterns();
      renderInterns();
    });

    row.querySelectorAll("span")[1].addEventListener("click", () => {
      interns.splice(i, 1);
      saveInterns();
      renderInterns();
    });

    list.appendChild(row);
  });
}

function addIntern() {
  const nameInput = document.getElementById("intern-input");
  const deadlineInput = document.getElementById("intern-deadline");
  const name = nameInput.value.trim();
  if (!name) return;
  interns.push({ name, deadline: deadlineInput.value.trim(), status: "researching" });
  saveInterns();
  renderInterns();
  nameInput.value = "";
  deadlineInput.value = "";
}

document.getElementById("intern-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addIntern();
});

renderInterns();


// ── NOTES ──────────────────────────────────────────────────────────────────

let notes = JSON.parse(localStorage.getItem("future-notes") || "[]");

function saveNotes() {
  localStorage.setItem("future-notes", JSON.stringify(notes));
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


// ── PROJECTS ───────────────────────────────────────────────────────────────

let projects = JSON.parse(localStorage.getItem("future-projects") || "[]");

function saveProjects() {
  localStorage.setItem("future-projects", JSON.stringify(projects));
}

function renderProjects() {
  const list = document.getElementById("project-list");
  list.innerHTML = "";
  projects.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <div>
        <div class="project-title">${p.name}</div>
        ${p.desc ? `<div class="project-desc">${p.desc}</div>` : ""}
      </div>
      <span style="color:#333;cursor:pointer;font-size:11px;flex-shrink:0;">✕</span>
    `;
    card.querySelector("span").addEventListener("click", () => {
      projects.splice(i, 1);
      saveProjects();
      renderProjects();
    });
    list.appendChild(card);
  });
}

function addProject() {
  const nameInput = document.getElementById("project-input");
  const descInput = document.getElementById("project-desc");
  const name = nameInput.value.trim();
  if (!name) return;
  projects.push({ name, desc: descInput.value.trim() });
  saveProjects();
  renderProjects();
  nameInput.value = "";
  descInput.value = "";
}

document.getElementById("project-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addProject();
});

renderProjects();
