// ── BOOKS ──────────────────────────────────────────────────────────────────

const shelves = ["reading", "read", "want"];
const books = {};

shelves.forEach(shelf => {
  books[shelf] = JSON.parse(localStorage.getItem("library-" + shelf) || "[]");
});

function saveShelf(shelf) {
  localStorage.setItem("library-" + shelf, JSON.stringify(books[shelf]));
}

function renderShelf(shelf) {
  const list = document.getElementById(shelf + "-list");
  list.innerHTML = "";
  books[shelf].forEach((title, i) => {
    const row = document.createElement("div");
    row.style.cssText = "display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:0.5px solid #1a1a1a;";
    row.innerHTML = `<span style="font-size:13px;color:#bbb;">${title}</span><span style="color:#333;cursor:pointer;font-size:11px;">✕</span>`;
    row.querySelector("span:last-child").addEventListener("click", () => {
      books[shelf].splice(i, 1);
      saveShelf(shelf);
      renderShelf(shelf);
    });
    list.appendChild(row);
  });
}

function addBook(shelf) {
  const input = document.getElementById(shelf + "-input");
  const title = input.value.trim();
  if (!title) return;
  books[shelf].push(title);
  saveShelf(shelf);
  renderShelf(shelf);
  input.value = "";
}

shelves.forEach(shelf => {
  renderShelf(shelf);
  document.getElementById(shelf + "-input").addEventListener("keydown", e => {
    if (e.key === "Enter") addBook(shelf);
  });
});



