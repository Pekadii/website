
(() => {

  const slides = [
    { before: "Image (5).jpg", after: "Image (1).jpg" },
    { before: "Image (6).jpg", after: "Image (2).jpg" },
  ];

  const stage = document.getElementById("baStage");
  const count = document.getElementById("baCount");
  const prevBtn = document.querySelector(".ba-prev");
  const nextBtn = document.querySelector(".ba-next");

  if (!stage || !count || !prevBtn || !nextBtn) return;

  
  stage.innerHTML = slides
    .map(
      (s, i) => `
      <div class="ba-slide ${i === 0 ? "is-active" : ""}" data-index="${i}" style="--split:50%;">
        <div class="ba-before"><img src="${s.before}" alt="Before ${i + 1}"></div>
        <div class="ba-after"><img src="${s.after}" alt="After ${i + 1}"></div>

        <div class="ba-divider" aria-hidden="true"></div>
        <div class="ba-handle" aria-hidden="true">↔</div>

        <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="Before/After slider ${i + 1}">
      </div>
    `
    )
    .join("");

  let index = 0;

  const updateCount = () => {
    count.textContent = `${index + 1} / ${slides.length}`;
  };

  const setActive = (newIndex) => {
    const all = [...stage.querySelectorAll(".ba-slide")];
    all[index].classList.remove("is-active");
    index = (newIndex + all.length) % all.length;
    all[index].classList.add("is-active");
    updateCount();
  };

  
  stage.querySelectorAll(".ba-slide").forEach((slide) => {
    const range = slide.querySelector(".ba-range");
    const setSplit = (val) => slide.style.setProperty("--split", `${val}%`);
    range.addEventListener("input", (e) => setSplit(e.target.value));
    
    slide.addEventListener("pointerdown", (e) => {
    
      const rect = slide.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      range.value = pct.toFixed(0);
      setSplit(range.value);
    });
  });

  prevBtn.addEventListener("click", () => setActive(index - 1));
  nextBtn.addEventListener("click", () => setActive(index + 1));

 
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") setActive(index - 1);
    if (e.key === "ArrowRight") setActive(index + 1);
  });

  updateCount();
})();
