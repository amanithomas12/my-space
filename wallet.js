// ── SHOPPING LIST ──────────────────────────────────────────────────────────

let shopItems = JSON.parse(localStorage.getItem("wallet-shop") || "[]");

function saveShop() {
  localStorage.setItem("wallet-shop", JSON.stringify(shopItems));
}

function renderShop() {
  const list = document.getElementById("shop-list");
  list.innerHTML = "";
  shopItems.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "shop-item";
    row.innerHTML = `
      <div class="shop-check ${item.done ? "done" : ""}"></div>
      <span class="shop-text ${item.done ? "done" : ""}">${item.text}</span>
      <span style="color:#333;cursor:pointer;font-size:11px;">✕</span>
    `;
    row.querySelector(".shop-check").addEventListener("click", () => {
      shopItems[i].done = !shopItems[i].done;
      saveShop(); renderShop();
    });
    row.querySelector(".shop-text").addEventListener("click", () => {
      shopItems[i].done = !shopItems[i].done;
      saveShop(); renderShop();
    });
    row.querySelector("span:last-child").addEventListener("click", () => {
      shopItems.splice(i, 1);
      saveShop(); renderShop();
    });
    list.appendChild(row);
  });
}

function addShopItem() {
  const input = document.getElementById("shop-input");
  const text = input.value.trim();
  if (!text) return;
  shopItems.push({ text, done: false });
  saveShop(); renderShop();
  input.value = "";
}

document.getElementById("shop-input").addEventListener("keydown", e => {
  if (e.key === "Enter") addShopItem();
});

renderShop();


// ── SPENDING LOG ───────────────────────────────────────────────────────────

let spends = JSON.parse(localStorage.getItem("wallet-spends") || "[]");

function saveSpends() {
  localStorage.setItem("wallet-spends", JSON.stringify(spends));
}

function renderSpends() {
  const list = document.getElementById("spend-list");
  list.innerHTML = "";
  let total = 0;

  spends.forEach((s, i) => {
    total += s.amount;
    const row = document.createElement("div");
    row.className = "spend-row";
    row.innerHTML = `
      <div class="spend-info">
        <div class="spend-desc-text">${s.desc}</div>
        <div class="spend-cat-tag">${s.category}</div>
      </div>
      <span class="spend-amt">RM ${s.amount.toFixed(2)}</span>
      <span style="color:#333;cursor:pointer;font-size:11px;">✕</span>
    `;
    row.querySelector("span:last-child").addEventListener("click", () => {
      spends.splice(i, 1);
      saveSpends(); renderSpends(); renderAdvice();
    });
    list.appendChild(row);
  });

  document.getElementById("spend-total-val").textContent = total.toFixed(2);
}

function addSpend() {
  const desc = document.getElementById("spend-desc").value.trim();
  const amount = parseFloat(document.getElementById("spend-amount").value);
  const category = document.getElementById("spend-category").value;
  if (!desc || isNaN(amount) || amount <= 0) return;
  spends.push({ desc, amount, category });
  saveSpends(); renderSpends(); renderAdvice();
  document.getElementById("spend-desc").value = "";
  document.getElementById("spend-amount").value = "";
}

document.getElementById("spend-amount").addEventListener("keydown", e => {
  if (e.key === "Enter") addSpend();
});

renderSpends();
