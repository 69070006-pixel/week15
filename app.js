/* =========================================================
   FOODPICKER ITF — สุ่มอาหาร
   รายการอาหาร (อย่างน้อย 5 รายการ) พร้อมรูป ชื่อ คำอธิบาย ราคา
   ========================================================= */

const MENUS = [
  {
    name: "ผัดไทยกุ้งสด",
    tag: "อาหารจานเดียว",
    desc: "เส้นจันท์ผัดซอสมะขามเปียก หอมกลิ่นกระเทียมเจียว เสิร์ฟพร้อมกุ้งสดตัวโต ถั่วงอก ถั่วลิสงป่น และมะนาวให้บีบเพิ่มความเปรี้ยว",
    price: 65,
    image: "images/padthai.jpg",
    alt: "ผัดไทยกุ้งสดใส่จาน เสิร์ฟพร้อมถั่วงอก ใบกุยช่าย และมะนาว"
  },
  {
    name: "ข้าวมันไก่",
    tag: "อาหารจานเดียว",
    desc: "ไก่ต้มนุ่มหอมขิงสับเป็นชิ้นพอดีคำ ราดน้ำมันไก่บนข้าวหอมมะลิหุงสุก เสิร์ฟคู่ซุปใสและน้ำจิ้มเต้าเจี้ยวรสกลมกล่อม",
    price: 55,
    image: "images/khaomankai.jpg",
    alt: "ข้าวมันไก่พร้อมน้ำจิ้มและซุปใส"
  },
  {
    name: "ส้มตำไทย",
    tag: "ยำและสลัด",
    desc: "มะละกอสับเส้นกรอบคลุกน้ำปลา น้ำตาลปี๊บ และน้ำมะนาวสด เติมรสเค็มมันจากถั่วลิสงคั่วและกุ้งแห้ง กินคู่กับไก่ย่างยิ่งเข้ากัน",
    price: 45,
    image: "images/sontam.jpg",
    alt: "ส้มตำไทยมะละกอสับผสมมะเขือเทศและถั่วลิสง"
  },
  {
    name: "ต้มยำกุ้ง",
    tag: "ต้มและแกง",
    desc: "น้ำซุปเปรี้ยวเผ็ดหอมตะไคร้ ใบมะกรูด และข่า ต้มกับกุ้งสดเนื้อเด้ง ใส่เห็ดฟางและมะเขือเทศ cherry ให้รสจัดจ้านแบบไทยแท้",
    price: 120,
    image: "images/tomyum.jpg",
    alt: "ต้มยำกุ้งน้ำข้นในชาม เสิร์ฟพร้อมผักชีและพริก"
  },
  {
    name: "ข้าวผัดกะเพราหมูสับไข่ดาว",
    tag: "อาหารจานเดียว",
    desc: "หมูสับผัดใบกะเพราด้วยไฟแรง ปรุงรสเผ็ดเค็มกำลังดี ราดบนข้าวสวยร้อน ๆ พร้อมไข่ดาวขอบกรอบและไข่แดงเยิ้ม",
    price: 60,
    image: "images/krapao.jpg",
    alt: "ข้าวผัดกะเพราหมูสับเสิร์ฟพร้อมไข่ดาวในจาน"
  },
  {
    name: "ข้าวเหนียวมะม่วง",
    tag: "ของหวาน",
    desc: "ข้าวเหนียวมูนกะทิหอมมัน เสิร์ฟคู่มะม่วงน้ำดอกไม้สุกหวานฉ่ำ โรยถั่วทองกรอบ ๆ ปิดท้ายมื้อด้วยของหวานไทยคลาสสิก",
    price: 80,
    image: "images/mango.jpg",
    alt: "ข้าวเหนียวมะม่วงจัดเสิร์ฟบนใบตอง"
  }
];

/* ---------- DOM ---------- */
const els = {
  card: document.getElementById("resultCard"),
  image: document.getElementById("foodImage"),
  name: document.getElementById("foodName"),
  desc: document.getElementById("foodDesc"),
  price: document.getElementById("foodPrice"),
  tag: document.getElementById("foodTag"),
  rollBtn: document.getElementById("rollBtn"),
  rollBtnText: document.getElementById("rollBtnText"),
  rollCount: document.getElementById("rollCount"),
  grid: document.getElementById("menuGrid"),
  menuCount: document.getElementById("menuCount")
};

/* ---------- State ---------- */
let currentIndex = 0;
let rolling = false;
let rollTotal = 0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const formatPrice = (value) => `฿${value.toLocaleString("th-TH")}`;

/* จออ่านหน้าจอ: ประกาศผลการสุ่ม */
const liveRegion = document.createElement("p");
liveRegion.className = "sr-only";
liveRegion.setAttribute("role", "status");
liveRegion.setAttribute("aria-live", "polite");
document.body.appendChild(liveRegion);

/* ---------- สร้างรายการอาหาร ---------- */
function buildMenuGrid() {
  const fragment = document.createDocumentFragment();

  MENUS.forEach((menu, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "menu-card";
    card.dataset.index = String(index);
    card.setAttribute("aria-pressed", "false");
    card.setAttribute(
      "aria-label",
      `${menu.name} ราคา ${formatPrice(menu.price)} — กดเพื่อแสดงเมนูนี้`
    );

    card.innerHTML = `
      <span class="menu-card__media">
        <img src="${menu.image}" alt="${menu.alt}" loading="lazy" width="900" height="675" decoding="async">
        <span class="menu-card__price">${formatPrice(menu.price)}</span>
      </span>
      <span class="menu-card__body">
        <span class="menu-card__tag">${menu.tag}</span>
        <strong class="menu-card__name">${menu.name}</strong>
        <span class="menu-card__desc">${menu.desc}</span>
      </span>
    `;

    fragment.appendChild(card);
  });

  els.grid.appendChild(fragment);
  els.menuCount.textContent = `${MENUS.length} รายการ`;
}

/* ---------- แสดงอาหารที่เลือก ---------- */
function showFood(index, { announce = true, scroll = false } = {}) {
  const menu = MENUS[index];
  currentIndex = index;

  els.image.src = menu.image;
  els.image.alt = menu.alt;
  els.name.textContent = menu.name;
  els.desc.textContent = menu.desc;
  els.price.textContent = formatPrice(menu.price);
  els.tag.textContent = menu.tag;

  document.querySelectorAll(".menu-card").forEach((card) => {
    const isActive = Number(card.dataset.index) === index;
    card.classList.toggle("is-active", isActive);
    card.setAttribute("aria-pressed", String(isActive));
  });

  if (announce) {
    liveRegion.textContent = `เมนูที่ได้คือ ${menu.name} ราคา ${formatPrice(menu.price)}`;
  }

  if (scroll) {
    els.card.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/* ---------- สุ่ม ---------- */
function randomIndex() {
  return Math.floor(Math.random() * MENUS.length);
}

/* สุ่มให้ไม่ซ้ำกับเมนูที่แสดงอยู่ */
function nextIndex() {
  if (MENUS.length < 2) return 0;
  let index = randomIndex();
  while (index === currentIndex) index = randomIndex();
  return index;
}

async function roll() {
  if (rolling) return;

  rolling = true;
  rollTotal += 1;
  els.card.classList.add("is-rolling");
  els.rollBtn.classList.add("is-rolling");
  els.rollBtn.disabled = true;
  els.rollBtnText.textContent = "กำลังสุ่ม...";

  const finalIndex = nextIndex();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    /* หมุนรูป/ชื่อเมนูสลับกันประมาณ 0.8 วินาที ก่อนหยุดที่ผลลัพธ์จริง */
    const steps = 9;
    for (let i = 0; i < steps; i += 1) {
      showFood(randomIndex(), { announce: false });
      await sleep(55 + i * 12);
    }
    await sleep(100);
  }

  showFood(finalIndex);
  els.rollCount.textContent = `สุ่มแล้ว ${rollTotal} ครั้ง`;

  els.card.classList.remove("is-rolling");
  els.rollBtn.classList.remove("is-rolling");
  els.rollBtn.disabled = false;
  els.rollBtnText.textContent = "สุ่มอาหารอีกครั้ง";
  rolling = false;

  els.rollBtn.focus({ preventScroll: true });
}

/* ---------- Events ---------- */
els.rollBtn.addEventListener("click", roll);

els.grid.addEventListener("click", (event) => {
  const card = event.target.closest(".menu-card");
  if (!card) return;
  showFood(Number(card.dataset.index), { scroll: true });
});

document.addEventListener("keydown", (event) => {
  if (event.code !== "Space" && event.key !== " ") return;
  if (event.target.closest("button, a, input, textarea, select")) return;
  event.preventDefault();
  roll();
});

/* ---------- Init ---------- */
buildMenuGrid();
showFood(0, { announce: false });

/* โหลดรูปทั้งหมดล่วงหน้า เพื่อให้ตอนสุ่มไม่กระพริบ */
MENUS.forEach((menu) => {
  const img = new Image();
  img.src = menu.image;
});
