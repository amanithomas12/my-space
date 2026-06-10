// ── TASKS ──────────────────────────────────────────────────────────────────

let tasks = JSON.parse(localStorage.getItem("planner-tasks") || "[]");

function saveTasks() {
  localStorage.setItem("planner-tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    const item = document.createElement("div");
    item.className = "task-item";
    item.innerHTML = `
      <div class="task-check ${task.done ? "done" : ""}"></div>
      <span class="task-text ${task.done ? "done" : ""}">${task.text}</span>
      <span class="task-delete" style="margin-left:auto;color:#333;cursor:pointer;font-size:11px;">✕</span>
    `;
    item.querySelector(".task-check").addEventListener("click", () => {
      tasks[i].done = !tasks[i].done;
      saveTasks();
      renderTasks();
    });
    item.querySelector(".task-text").addEventListener("click", () => {
      tasks[i].done = !tasks[i].done;
      saveTasks();
      renderTasks();
    });
    item.querySelector(".task-delete").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(i, 1);
      saveTasks();
      renderTasks();
    });
    list.appendChild(item);
  });
}

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  saveTasks();
  renderTasks();
  input.value = "";
}

document.getElementById("task-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();


// ── ASSIGNMENTS ────────────────────────────────────────────────────────────

let assignments = JSON.parse(localStorage.getItem("planner-assignments") || "[]");

function saveAssignments() {
  localStorage.setItem("planner-assignments", JSON.stringify(assignments));
}

function renderAssignments() {
  const list = document.getElementById("assign-list");
  list.innerHTML = "";
  assignments.forEach((a, i) => {
    const card = document.createElement("div");
    card.className = "assign-card";

    const progressSteps = [0, 25, 50, 75, 100];
    const progress = a.progress ?? 0;

    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div class="assign-title">${a.title}</div>
          <div class="assign-due">Due: ${a.due || "—"}</div>
        </div>
        <span class="task-delete" style="color:#333;cursor:pointer;font-size:11px;padding-left:8px;">✕</span>
      </div>
      <div class="progress-bar" title="Click to update progress" style="cursor:pointer;">
        <div class="progress-fill" style="width:${progress}%"></div>
      </div>
      <div style="font-size:9px;color:#444;margin-top:4px;letter-spacing:1px;">${progress}% COMPLETE</div>
    `;

    card.querySelector(".progress-bar").addEventListener("click", () => {
      const idx = progressSteps.indexOf(assignments[i].progress ?? 0);
      assignments[i].progress = progressSteps[(idx + 1) % progressSteps.length];
      saveAssignments();
      renderAssignments();
    });

    card.querySelector(".task-delete").addEventListener("click", () => {
      assignments.splice(i, 1);
      saveAssignments();
      renderAssignments();
    });

    list.appendChild(card);
  });
}

function addAssignment() {
  const titleInput = document.getElementById("assign-input");
  const dateInput = document.getElementById("assign-date");
  const title = titleInput.value.trim();
  if (!title) return;
  assignments.push({ title, due: dateInput.value || "", progress: 0 });
  saveAssignments();
  renderAssignments();
  titleInput.value = "";
  dateInput.value = "";
}

document.getElementById("assign-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addAssignment();
});

renderAssignments();


// ── CONTENT CALENDAR ───────────────────────────────────────────────────────

let contentItems = JSON.parse(localStorage.getItem("planner-content") || "[]");

function saveContent() {
  localStorage.setItem("planner-content", JSON.stringify(contentItems));
}

function renderContent() {
  const list = document.getElementById("content-list");
  list.innerHTML = "";
  contentItems.forEach((idea, i) => {
    const row = document.createElement("div");
    row.className = "content-card";
    row.innerHTML = `
      <span class="content-idea-text">${idea}</span>
      <span style="color:#333;cursor:pointer;font-size:11px;flex-shrink:0;">✕</span>
    `;
    row.querySelector("span:last-child").addEventListener("click", () => {
      contentItems.splice(i, 1);
      saveContent();
      renderContent();
    });
    list.appendChild(row);
  });
}

function addContent() {
  const input = document.getElementById("content-idea");
  const idea = input.value.trim();
  if (!idea) return;
  contentItems.push(idea);
  saveContent();
  renderContent();
  input.value = "";
}

document.getElementById("content-idea").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addContent();
});

renderContent();
