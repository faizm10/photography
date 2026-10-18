export function initGallery() {
  const tiles = [...document.querySelectorAll<HTMLElement>(".tile")];
  const frames = [...document.querySelectorAll<HTMLButtonElement>(".frame")];

  // Fade tiles up as they scroll into view.
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  tiles.forEach((t) => io.observe(t));

  // Soften the reveal of each image once it has actually decoded.
  for (const img of document.querySelectorAll<HTMLImageElement>(".frame img")) {
    if (img.complete) img.classList.add("loaded");
    else img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
  }

  const box = document.getElementById("lightbox") as HTMLDialogElement;
  const lbImg = document.getElementById("lbImg") as HTMLImageElement;
  const lbCaption = document.getElementById("lbCaption")!;
  let current = 0;

  const show = (i: number) => {
    current = (i + frames.length) % frames.length;
    const src = frames[current].querySelector("img")!;
    lbImg.classList.remove("ready");
    lbImg.srcset = src.srcset;
    lbImg.sizes = "100vw";
    lbImg.src = src.currentSrc || src.src;
    lbImg.alt = src.alt;
    lbCaption.textContent = src.alt;
    const reveal = () => requestAnimationFrame(() => lbImg.classList.add("ready"));
    lbImg.decode().then(reveal, reveal);
  };

  const open = (i: number) => {
    show(i);
    box.showModal();
    document.documentElement.classList.add("locked");
  };
  const close = () => {
    box.classList.add("closing");
    setTimeout(() => {
      box.classList.remove("closing");
      box.close();
    }, 260);
  };

  box.addEventListener("close", () => {
    document.documentElement.classList.remove("locked");
    frames[current]?.focus({ preventScroll: true });
  });
  box.addEventListener("cancel", (e) => {
    e.preventDefault();
    close();
  });

  frames.forEach((f, i) => f.addEventListener("click", () => open(i)));
  document.getElementById("lbClose")!.addEventListener("click", close);
  document.getElementById("lbPrev")!.addEventListener("click", () => show(current - 1));
  document.getElementById("lbNext")!.addEventListener("click", () => show(current + 1));
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target === lbCaption) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!box.open) return;
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // Swipe between photos on touch screens.
  let startX = 0;
  box.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
  box.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });
}
