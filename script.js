(() => {
  // ===== LINKS FIJOS (NO DEPENDEN DE NADA MÁS) =====
  const PHONE = "50660906359"; // sin +, sin espacios
  const IG = "justabedcr";

  const WA_TEXT =
    "Hola, quisiera consultar disponibilidad en JAB (hospedaje/parqueo/cuido de mascota/transporte al aeropuerto). " +
    "Fecha: ____ Hora aproximada: ____ Gracias.";

  const waLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_TEXT)}`;
  const igLink = `https://instagram.com/${IG}`;

  const setLink = (id, url) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener";
  };

  // Botones WhatsApp
  setLink("waTop", waLink);
  setLink("waHero", waLink);
  setLink("waContact", waLink);
  setLink("waFloat", waLink);

  // Botones Instagram
  setLink("igTop", igLink);
  setLink("igContact", igLink);
  setLink("igFloat", igLink);

  // ===== AÑO =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== SLIDER =====
  const slidesWrap = document.getElementById("slides");
  const prevBtn = document.querySelector(".sliderBtn.prev");
  const nextBtn = document.querySelector(".sliderBtn.next");
  const dotsWrap = document.getElementById("dots");

  if (!slidesWrap) return;

  const slides = Array.from(slidesWrap.querySelectorAll("img"));
  let index = 0;
  let timer = null;

  // Dots
  if (dotsWrap && slides.length) {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.type = "button";
      d.className = "dot" + (i === 0 ? " isActive" : "");
      d.setAttribute("aria-label", `Ir a imagen ${i + 1}`);
      d.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(d);
    });
  }

  const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll(".dot")) : [];

  function update() {
    slidesWrap.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("isActive", i === index));
  }

  function goTo(i, reset) {
    if (!slides.length) return;
    index = (i + slides.length) % slides.length;
    update();
    if (reset) restart();
  }

  function next() { goTo(index + 1, true); }
  function prev() { goTo(index - 1, true); }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  function start() {
    timer = setInterval(() => goTo(index + 1, false), 3500);
  }

  function restart() {
    clearInterval(timer);
    start();
  }

  update();
  if (slides.length > 1) start();

  // ===== COPIAR NÚMERO =====
  const copyNumber = document.getElementById("copyNumber");
  const copyHint = document.getElementById("copyHint");
  if (copyNumber) {
    copyNumber.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("+506 6090 6359");
        if (copyHint) copyHint.textContent = "Número copiado.";
      } catch {
        if (copyHint) copyHint.textContent = "No se pudo copiar. Copiá manualmente: +506 6090 6359";
      }
    });
  }

  // ===== COPIAR MENSAJE =====
  const copyMsg = document.getElementById("copyMsg");
  const copyMsgHint = document.getElementById("copyMsgHint");
  const msgBox = document.getElementById("msgBox");
  if (copyMsg && msgBox) {
    copyMsg.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(msgBox.textContent.trim());
        if (copyMsgHint) copyMsgHint.textContent = "Mensaje copiado.";
      } catch {
        if (copyMsgHint) copyMsgHint.textContent = "No se pudo copiar. Seleccioná el texto y copiá manualmente.";
      }
    });
  }
})();
