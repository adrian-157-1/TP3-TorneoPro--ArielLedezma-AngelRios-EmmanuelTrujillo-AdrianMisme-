/* =========================================================
   DATOS  –  👉 donde dice img: "" pegá tu enlace
   ========================================================= */
 
const categories = [
  { name: "Botines",  img: "", link: "#" },
  { name: "Pelotas",  img: "", link: "#" },
  { name: "Camisetas", img: "", link: "#" },
  { name: "Grandes trofeos", img: "", link: "#" },
];
 
const productSections = [
  {
    title: "Trofeos mas destacados",
    products: [
      { name: "Botines negros con detalles burgunda", price: 115000, rating: 4.5, reviews: 54, img: "" },
      { name: "Botines negros con franjas oscuras",   price: 98000,  rating: 4.5, reviews: 54, img: "" },
      { name: "Botines grises con detalles negros",   price: 98000,  rating: 4.5, reviews: 54, img: "" },
      { name: "Botines negros con detalles amarillos", price: 83000, rating: 4.5, reviews: 54, img: "" },
      { name: "Trofeo extra",                          price: 70000, rating: 4,   reviews: 12, img: "" },
    ],
  },
  {
    title: "Camisetas mas destacadas",
    products: [
      { name: "Adidas Camiseta Titular de Argentina 2026/26", price: 99000,  rating: 4.5, reviews: 54, img: "" },
      { name: "Alexis Camiseta de Selección Argentina 2026",  price: 109000, rating: 4.5, reviews: 54, img: "" },
      { name: "Puma Camiseta Titular de Manchester City",     price: 102000, rating: 4.5, reviews: 54, img: "" },
      { name: "Nike Camiseta Titular de Países Bajos",        price: 93000,  rating: 4.5, reviews: 54, img: "" },
    ],
  },
  {
    title: "Pelotas mas destacados",
    products: [
      { name: "Botines turquesa con detalles burgunda", price: 19000,  rating: 4.5, reviews: 54, img: "" },
      { name: "Botines rosa intenso con blanco",        price: 105000, rating: 4.5, reviews: 54, img: "" },
      { name: "Botines blancos con detalles rosas",     price: 82000,  rating: 4.5, reviews: 54, img: "" },
      { name: "Botines verde con franjas blancas",      price: 94000,  rating: 4.5, reviews: 54, img: "" },
    ],
  },
  {
    title: "Botines mas destacados",
    products: [
      { name: "Botines blancos con detalles dorados",         price: 104000, rating: 4.5, reviews: 54, img: "" },
      { name: "Botines negros de caña alta",                  price: 130000, rating: 4.5, reviews: 54, img: "" },
      { name: "Botines blancos con detalles negros y rojos",  price: 85000,  rating: 4.5, reviews: 54, img: "" },
      { name: "Botines blancos con detalles negros",          price: 95000,  rating: 4.5, reviews: 54, img: "" },
    ],
  },
];
 
const paymentMethods = [ // 👉 logos de pago
  { name: "Mercado Pago", img: "" },
  { name: "Visa",         img: "" },
  { name: "Mastercard",   img: "" },
  { name: "Amex",         img: "" },
  { name: "Naranja X",    img: "" },
  { name: "Rapipago",     img: "" },
];
 
const socials = [ // 👉 iconos de redes
  { name: "Instagram", img: "", link: "#" },
  { name: "Facebook",  img: "", link: "#" },
  { name: "X",         img: "", link: "#" },
];
 
/* =========================================================
   HELPERS
   ========================================================= */
 
const formatPrice = (n) => "$ " + n.toLocaleString("es-AR");
 
function stars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}
 
/* =========================================================
   CATEGORÍAS
   ========================================================= */
 
document.getElementById("categories").innerHTML = categories
  .map(
    (c) => `
    <a class="cat" href="${c.link}">
      <img src="${c.img}" alt="${c.name}">
      <span>${c.name}</span>
    </a>`
  )
  .join("");
 
/* =========================================================
   TARJETAS + FILAS CON FLECHAS
   ========================================================= */
 
function cardHTML(p) {
  return `
    <article class="card">
      <img class="card__img" src="${p.img}" alt="${p.name}">
      <div class="card__body">
        <h3 class="card__name">${p.name}</h3>
        <div class="card__price">${formatPrice(p.price)}</div>
        <div class="card__rating">${stars(p.rating)}<small>${p.rating}</small></div>
      </div>
    </article>`;
}
 
const sectionsContainer = document.getElementById("productSections");
 
productSections.forEach((sec) => {
  const section = document.createElement("section");
  section.className = "section";
  section.innerHTML = `
    <h2 class="section__title">${sec.title}</h2>
    <div class="row">
      <button class="row__arrow row__arrow--prev" aria-label="Anterior">&#10094;</button>
      <div class="row__viewport">
        <div class="row__track">${sec.products.map(cardHTML).join("")}</div>
      </div>
      <button class="row__arrow row__arrow--next" aria-label="Siguiente">&#10095;</button>
    </div>`;
  sectionsContainer.appendChild(section);
 
  // lógica de desplazamiento de la fila
  const track = section.querySelector(".row__track");
  const prev = section.querySelector(".row__arrow--prev");
  const next = section.querySelector(".row__arrow--next");
  let index = 0;
 
  const visible = () => (window.innerWidth <= 800 ? 2 : 4);
 
  function update() {
    const cards = track.children;
    const max = Math.max(0, cards.length - visible());
    index = Math.min(index, max);
    const cardW = cards[0].getBoundingClientRect().width + 10; // 10 = gap
    track.style.transform = `translateX(${-index * cardW}px)`;
    prev.disabled = index === 0;
    next.disabled = index >= max;
  }
 
  prev.addEventListener("click", () => { index--; update(); });
  next.addEventListener("click", () => { index++; update(); });
  window.addEventListener("resize", update);
  update();
});
 
/* =========================================================
   CARRUSEL (4 slides, autoplay, flechas y puntos)
   ========================================================= */
 
(function initCarousel() {
  const track = document.getElementById("carouselTrack");
  const dotsBox = document.getElementById("dots");
  const total = track.children.length;
  let current = 0;
  let timer;
 
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => { goTo(i); restart(); });
    dotsBox.appendChild(dot);
  }
 
  function goTo(i) {
    current = (i + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    [...dotsBox.children].forEach((d, k) => d.classList.toggle("active", k === current));
  }
 
  const restart = () => { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 5000); };
 
  document.getElementById("prev").addEventListener("click", () => { goTo(current - 1); restart(); });
  document.getElementById("next").addEventListener("click", () => { goTo(current + 1); restart(); });
 
  goTo(0);
  restart();
})();
 
/* =========================================================
   FOOTER
   ========================================================= */
 
document.getElementById("payMethods").innerHTML = paymentMethods
  .map((m) => `<img src="${m.img}" alt="${m.name}">`)
  .join("");
 
document.getElementById("socials").innerHTML = socials
  .map((s) => `<a href="${s.link}"><img src="${s.img}" alt="${s.name}"></a>`)
  .join("");