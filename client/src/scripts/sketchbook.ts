import type { Plate } from "../data/plates";

type Page = Plate & { url: string };

type Turn = { dir: "next" | "prev"; from: number; to: number; t: number };

type Init = {
  plates: Plate[];
  landingIndex: number;
  assetDir: string;
};

export function initSketchbook({ plates, landingIndex, assetDir }: Init) {
  const Q = new URLSearchParams(location.search);
  const PAGES: Page[] = plates.map((p) => ({ ...p, url: assetDir + p.file }));
  const M = PAGES.length;
  const LAND = Math.max(0, Math.min(M - 1, landingIndex));

  const wrap = document.getElementById("sbWrap");
  const stage = document.getElementById("sbStage");
  const sb3d = document.getElementById("sb3d");
  const book = document.getElementById("sbBook");
  const capBox = document.getElementById("sbCaptions");
  const hint = document.getElementById("sbHint");
  if (!wrap || !stage || !sb3d || !book || !capBox || !hint) return;

  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const N = 18;
  const SPAN = 0.449;
  const BETA = 0.6;
  let idx = 0;
  let turn: Turn | null = null;
  let strips: HTMLElement[] = [];

  function el(t: string, c?: string) {
    const e = document.createElement(t);
    if (c) e.className = c;
    return e;
  }

  function imgEl(i: number, side: string) {
    const im = new Image();
    im.className = "sb-half-img " + side;
    im.draggable = false;
    im.alt = "";
    im.src = PAGES[i].url;
    return im;
  }

  function halfEl(pos: string, i: number) {
    const d = el("div", "sb-half " + pos);
    d.appendChild(imgEl(i, pos));
    d.appendChild(el("div", "gutter-shade " + pos));
    return d;
  }

  function buildCurl(dir: "next" | "prev", from: number, to: number) {
    strips = [];
    const c = el("div", "curl " + dir);
    c.style.setProperty("--n", String(N));
    c.style.setProperty("--span", String(SPAN));
    let host: HTMLElement = c;
    for (let i = 0; i < N; i++) {
      const s = el("div", "strip");
      s.style.setProperty("--i", String(i));
      const gut = "calc(var(--bw) * 0.5)";
      const sw = "calc(var(--bw) * " + SPAN + " / " + N + ")";
      const A = "calc(-1 * (" + gut + " + " + i + " * " + sw + "))";
      const B = "calc(" + (i + 1) + " * " + sw + " - " + gut + ")";
      const f = el("div", "face front");
      const b = el("div", "face back");
      const dress = (e: HTMLElement, url: string, px: string) => {
        e.style.backgroundImage = "url(" + url + ")";
        e.style.backgroundPositionX = px;
      };
      dress(f, PAGES[from].url, dir === "next" ? A : B);
      dress(b, PAGES[to].url, dir === "next" ? B : A);
      f.appendChild(el("div", "sh"));
      f.appendChild(el("div", "gl"));
      b.appendChild(el("div", "sh"));
      b.appendChild(el("div", "gl"));
      s.appendChild(f);
      s.appendChild(b);
      if (i === N - 1) s.classList.add("edge");
      host.appendChild(s);
      host = s;
      strips.push(s);
    }
    return c;
  }

  function applyTurn(t: number) {
    const th = Math.PI * t;
    const beta = BETA * Math.sin(Math.PI * t);
    const D = 180 / Math.PI;
    const tt = th + beta;
    const td = (2 * beta) / N;
    sb3d.style.setProperty("--tt", (tt * D).toFixed(2) + "deg");
    sb3d.style.setProperty("--td", (td * D).toFixed(3) + "deg");
    sb3d.style.setProperty("--shade", Math.sin(Math.PI * t).toFixed(3));
    fadeCaption(t);
    for (let i = 0; i < strips.length; i++) {
      const l1 = Math.abs(Math.cos(tt - i * td));
      const l2 = Math.abs(Math.cos(tt - (i + 1) * td));
      const st = strips[i].style;
      st.setProperty("--lit", l1.toFixed(3));
      st.setProperty("--a1", ((1 - l1) * 0.62).toFixed(3));
      st.setProperty("--a2", ((1 - l2) * 0.62).toFixed(3));
    }
  }

  function paint() {
    book.textContent = "";
    if (!turn) {
      const f = el("div", "sb-full");
      const im = new Image();
      im.src = PAGES[idx].url;
      im.alt = PAGES[idx].title;
      im.draggable = false;
      f.appendChild(im);
      book.appendChild(f);
      sb3d.style.setProperty("--shade", "0");
    } else {
      const next = turn.dir === "next";
      book.appendChild(halfEl("left", next ? turn.from : turn.to));
      book.appendChild(halfEl("right", next ? turn.to : turn.from));
      book.appendChild(buildCurl(turn.dir, turn.from, turn.to));
      applyTurn(turn.t);
    }
    const a = el("button", "sb-zone sb-prev");
    const b = el("button", "sb-zone sb-next");
    a.setAttribute("aria-label", "previous page");
    b.setAttribute("aria-label", "next page");
    book.appendChild(a);
    book.appendChild(b);
    layout();
    caption();
    syncZoomLayer();
    placeLoupe();
  }

  let capOut: HTMLElement | null = null;
  let capIn: HTMLElement | null = null;

  function caption() {
    capBox.textContent = "";
    capOut = capIn = null;
    if (turn) {
      capOut = el("p", "sb-caption live");
      capOut.textContent = PAGES[turn.from].title;
      capBox.appendChild(capOut);
      capIn = el("p", "sb-caption live");
      capIn.textContent = PAGES[turn.to].title;
      capBox.appendChild(capIn);
      fadeCaption(turn.t);
    } else {
      const p = el("p", "sb-caption");
      p.textContent = PAGES[idx].title;
      capBox.appendChild(p);
    }
  }

  function fadeCaption(t: number) {
    if (!capOut || !capIn) return;
    const out = 1 - Math.max(0, Math.min(1, (t - 0.1) / 0.28));
    const inn = Math.max(0, Math.min(1, (t - 0.56) / 0.3));
    capOut.style.opacity = out.toFixed(3);
    capIn.style.opacity = inn.toFixed(3);
  }

  function layout() {
    sb3d.style.setProperty("--bw", book.clientWidth + "px");
  }
  addEventListener("resize", layout);

  type Spring =
    | { kind: "spring"; v: number; target: number; done?: () => void; k: number; c: number }
    | { kind: "tween"; from: number; target: number; dur: number; e: number; done?: () => void };

  let spring: Spring | null = null;
  function animateTo(target: number, onDone?: () => void, stiff?: number, damp?: number) {
    spring = { kind: "spring", v: 0, target, done: onDone, k: stiff || 150, c: damp || 22 };
    kick();
  }
  function tweenTo(target: number, dur: number, onDone?: () => void) {
    spring = { kind: "tween", from: turn ? turn.t : 0, target, dur, e: 0, done: onDone };
    kick();
  }

  let raf: number | null = null;
  let last = 0;
  function tick(now: number) {
    raf = null;
    const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
    last = now;
    if (spring && turn) {
      const s = spring;
      if (s.kind === "tween") {
        s.e += dt;
        const k = Math.min(1, s.e / s.dur);
        turn.t = s.from + (s.target - s.from) * k;
        applyTurn(turn.t);
        if (k >= 1) {
          spring = null;
          s.done?.();
        }
      } else {
        const x = turn.t - s.target;
        s.v += (-s.k * x - s.c * s.v) * dt;
        turn.t += s.v * dt;
        if (Math.abs(turn.t - s.target) < 0.002 && Math.abs(s.v) < 0.02) {
          turn.t = s.target;
          spring = null;
          applyTurn(turn.t);
          s.done?.();
        } else applyTurn(turn.t);
      }
    }
    viewSpring();
    const lmoved = loupeEase();
    if ((spring || viewActive || lmoved) && raf === null) raf = requestAnimationFrame(tick);
  }
  function kick() {
    if (raf === null) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
  }

  const TILT_X = 4.5;
  const TILT_Y = 7;
  const ZOOM_MIN = 0.9;
  const ZOOM_MAX = 1.5;
  const view = { rx: 0, ry: 0, z: 1, trx: 0, try_: 0, tz: 1 };
  let viewActive = false;
  let lastZ = 1;

  function applyView() {
    sb3d.style.setProperty("--rx", view.rx.toFixed(2) + "deg");
    sb3d.style.setProperty("--ry", view.ry.toFixed(2) + "deg");
    sb3d.style.setProperty("--zoom", view.z.toFixed(3));
    if (view.z !== lastZ) {
      lastZ = view.z;
      placeLoupe();
    }
  }

  function viewSpring() {
    const e = 0.14;
    let moved = false;
    for (const [k, t] of [
      ["rx", "trx"],
      ["ry", "try_"],
      ["z", "tz"],
    ] as const) {
      const d = view[t] - view[k];
      if (Math.abs(d) > 0.0006) {
        view[k] += d * e;
        moved = true;
      } else view[k] = view[t];
    }
    if (moved) applyView();
    viewActive = moved;
    return moved;
  }

  function setView(rx: number, ry: number, z: number) {
    view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
    view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
    view.tz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
    viewActive = true;
    kick();
    syncZoom();
  }

  function tiltTo(cx: number, cy: number) {
    if (drag) return;
    const r = book.getBoundingClientRect();
    if (!r.width) return;
    const nx = Math.max(-1, Math.min(1, (cx - (r.left + r.width / 2)) / (r.width * 0.62)));
    const ny = Math.max(-1, Math.min(1, (cy - (r.top + r.height / 2)) / (r.height * 0.9)));
    setView(-ny * TILT_X, nx * TILT_Y, view.tz);
  }

  addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType === "touch") return;
      tiltTo(e.clientX, e.clientY);
    },
    { passive: true },
  );
  addEventListener("pointerout", (e) => {
    if (!e.relatedTarget) setView(0, 0, view.tz);
  });
  addEventListener("blur", () => setView(0, 0, view.tz));
  stage.addEventListener("dblclick", () => setView(view.trx, view.try_, 1));

  let drag: { dir: "next" | "prev"; x0: number; w: number; moved: number; vel: number; tPrev: number } | null =
    null;
  function bookRect() {
    return book.getBoundingClientRect();
  }
  function hideHint() {
    hint?.classList.add("gone");
  }

  stage.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const onBook = (e.target as HTMLElement).closest(".sb-zone");
    stage.setPointerCapture(e.pointerId);
    hideHint();
    if (!onBook || introOn) return;
    const r = bookRect();
    const dir = (e.clientX - r.left) / r.width > 0.5 ? "next" : "prev";
    startTurn(dir, 0);
    drag = { dir, x0: e.clientX, w: r.width, moved: 0, vel: 0, tPrev: performance.now() };
  });

  stage.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x0;
    drag.moved = Math.max(drag.moved, Math.abs(dx));
    const raw = (drag.dir === "next" ? -dx : dx) / (drag.w * 0.62);
    const t = Math.max(0, Math.min(1, raw));
    const now = performance.now();
    drag.vel = (t - (turn ? turn.t : 0)) / Math.max(0.001, (now - drag.tPrev) / 1000);
    drag.tPrev = now;
    if (turn) {
      turn.t = t;
      applyTurn(t);
    }
  });

  function endDrag() {
    if (!drag) return;
    const d = drag;
    drag = null;
    if (!turn) return;
    if (d.moved < 6) {
      commit();
      return;
    }
    const go = turn.t > 0.42 || d.vel > 1.1;
    if (go) commit();
    else cancel();
  }

  stage.addEventListener("dragstart", (e) => e.preventDefault());
  stage.addEventListener("selectstart", (e) => e.preventDefault());
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  function startTurn(dir: "next" | "prev", t: number) {
    spring = null;
    if (turn) {
      idx = turn.to;
      turn = null;
    }
    shoveLoupe(dir);
    const from = idx;
    turn = { dir, from, to: dir === "next" ? (from + 1) % M : (from - 1 + M) % M, t: t || 0 };
    paint();
  }

  function commit() {
    if (!turn) return;
    if (REDUCED) {
      idx = turn.to;
      turn = null;
      paint();
      return;
    }
    animateTo(
      1,
      () => {
        if (!turn) return;
        idx = turn.to;
        turn = null;
        paint();
      },
      170,
      26,
    );
    kick();
  }

  function cancel() {
    if (!turn) return;
    animateTo(
      0,
      () => {
        turn = null;
        paint();
      },
      150,
      24,
    );
    kick();
  }

  function step(dir: "next" | "prev") {
    if (introOn) endIntro();
    if (turn) {
      idx = turn.to;
      turn = null;
    }
    startTurn(dir, 0);
    commit();
  }

  document.getElementById("sbLeft")?.addEventListener("click", () => step("prev"));
  document.getElementById("sbRight")?.addEventListener("click", () => step("next"));
  addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target as HTMLElement | null;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    e.preventDefault();
    hideHint();
    step(e.key === "ArrowRight" ? "next" : "prev");
  });
  document.getElementById("heroDown")?.addEventListener("click", () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const loupe = document.getElementById("loupe")!;
  const zRead = document.getElementById("zRead")!;
  const loupeBtn = document.getElementById("loupeBtn")!;
  const zInBtn = document.getElementById("zIn") as HTMLButtonElement;
  const zOutBtn = document.getElementById("zOut") as HTMLButtonElement;
  const MAG = 2.3;
  let loupeOn = true;
  let lx: number | null = null;
  let ly: number | null = null;
  let lgrab: { cx: number; cy: number; lx0: number; ly0: number } | null = null;
  let lTarget: { x: number; y: number } | null = null;

  function loupeSize() {
    return Math.round(Math.max(165, Math.min(262, book.clientWidth * 0.235)));
  }
  function bookBox() {
    return { x: 0, y: 0, w: book.clientWidth, h: book.clientHeight };
  }
  function restLoupe() {
    const b = bookBox();
    lx = b.x + b.w * 0.88;
    ly = b.y + b.h * 0.855;
    placeLoupe();
  }

  const zoomWrap = document.getElementById("zoomWrap")!;
  const zoomInner = document.getElementById("zoomInner")!;

  function syncZoomLayer() {
    zoomInner.textContent = "";
    for (const c of book.children) {
      if ((c as HTMLElement).classList.contains("sb-zone")) continue;
      zoomInner.appendChild(c.cloneNode(true));
    }
  }

  function placeLoupe() {
    if (lx === null) return;
    const B = bookBox();
    const bw = B.w;
    const bh = B.h;
    if (!bw) return;
    const R = loupeSize() / 2;
    const bez = R * 2 * 0.058;
    loupe.style.setProperty("--lr", R * 2 + "px");
    loupe.style.transform = "translate3d(" + (lx - R).toFixed(1) + "px," + (ly - R).toFixed(1) + "px,0)";
    if (loupeOn) loupe.classList.add("on");

    const z = view.z;
    const cx = bw / 2;
    const cy = bh / 2;
    const x0 = cx + (bw * 0.051 - cx) * z;
    const x1 = cx + (bw * 0.949 - cx) * z;
    const y0 = cy + (bh * 0.218 - cy) * z;
    const y1 = cy + (bh * 0.782 - cy) * z;
    const nx = Math.max(x0, Math.min(lx, x1));
    const ny = Math.max(y0, Math.min(ly, y1));
    const inside =
      lx > x0 && lx < x1 && ly > y0 && ly < y1
        ? Math.min(lx - x0, x1 - lx, ly - y0, y1 - ly)
        : -Math.hypot(lx - nx, ly - ny);
    const k = Math.max(0, Math.min(1, (inside + R * 0.3) / (R * 0.55)));

    zoomWrap.style.opacity = (loupeOn ? k : 0).toFixed(3);
    if (k <= 0.002) return;
    const r = (R - bez).toFixed(1);
    const mask =
      "radial-gradient(circle " +
      r +
      "px at " +
      lx.toFixed(1) +
      "px " +
      ly.toFixed(1) +
      "px,#000 calc(100% - 1px),transparent 100%)";
    zoomWrap.style.webkitMaskImage = mask;
    zoomWrap.style.maskImage = mask;
    const px = cx + (lx - cx) / z;
    const py = cy + (ly - cy) / z;
    const s = MAG * z;
    zoomInner.style.transform =
      "translate(" + (lx - px * s).toFixed(1) + "px," + (ly - py * s).toFixed(1) + "px) scale(" + s.toFixed(4) + ")";
  }

  function shoveLoupe(dir: "next" | "prev") {
    if (!loupeOn || lx === null || lgrab) return;
    const b = bookBox();
    const nx = (b.w / 2 + (lx - b.x - b.w / 2) / view.z) / b.w;
    const ny = (b.h / 2 + (ly - b.y - b.h / 2) / view.z) / b.h;
    if (nx < 0.02 || nx > 0.98 || ny < 0.17 || ny > 0.83) return;
    lTarget = { x: b.x + b.w * (dir === "next" ? 0.12 : 0.88), y: b.y + b.h * 0.855 };
    kick();
  }

  function loupeEase() {
    if (!lTarget) return false;
    if (lgrab) {
      lTarget = null;
      return false;
    }
    const dx = lTarget.x - lx!;
    const dy = lTarget.y - ly!;
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
      lx = lTarget.x;
      ly = lTarget.y;
      lTarget = null;
      placeLoupe();
      return false;
    }
    lx! += dx * 0.17;
    ly! += dy * 0.17;
    placeLoupe();
    return true;
  }

  loupe.addEventListener("pointerdown", (e) => {
    if (!loupeOn || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    lTarget = null;
    lgrab = { cx: e.clientX, cy: e.clientY, lx0: lx!, ly0: ly! };
    loupe.classList.add("held");
    loupe.setPointerCapture(e.pointerId);
    hideHint();
  });
  loupe.addEventListener("pointermove", (e) => {
    if (!lgrab) return;
    const b = bookBox();
    const R = loupeSize() / 2;
    lx = Math.max(b.x - R * 0.7, Math.min(b.x + b.w + R * 0.7, lgrab.lx0 + (e.clientX - lgrab.cx)));
    ly = Math.max(b.y - R * 0.7, Math.min(b.y + b.h + R * 1.0, lgrab.ly0 + (e.clientY - lgrab.cy)));
    placeLoupe();
  });
  function dropLoupe() {
    lgrab = null;
    loupe.classList.remove("held");
  }
  loupe.addEventListener("pointerup", dropLoupe);
  loupe.addEventListener("pointercancel", dropLoupe);
  loupeBtn.addEventListener("click", () => {
    loupeOn = !loupeOn;
    loupeBtn.setAttribute("aria-pressed", String(loupeOn));
    loupe.classList.toggle("on", loupeOn);
    if (loupeOn && lx === null) restLoupe();
  });
  addEventListener("resize", () => {
    lx = null;
    restLoupe();
  });

  function syncZoom() {
    zRead.textContent = Math.round(view.tz * 100) + "%";
    zOutBtn.disabled = view.tz <= ZOOM_MIN + 0.001;
    zInBtn.disabled = view.tz >= ZOOM_MAX - 0.001;
  }
  zInBtn.addEventListener("click", () => {
    setView(view.trx, view.try_, view.tz * 1.16);
    hideHint();
  });
  zOutBtn.addEventListener("click", () => {
    setView(view.trx, view.try_, view.tz / 1.16);
    hideHint();
  });

  let riffle: { bell: number; dur: number }[] | null = null;
  let riffleAt = 0;
  let introOn = false;
  function endIntro() {
    introOn = false;
    wrap.classList.remove("intro", "b2");
  }
  function riffleStep() {
    if (!riffle) return;
    const s = riffle[riffleAt];
    wrap.classList.toggle("b2", s.bell > 0.55);
    startTurn("next", 0);
    tweenTo(1, s.dur, () => {
      if (!turn) return;
      idx = turn.to;
      turn = null;
      riffleAt++;
      if (introOn && riffle && riffleAt < riffle.length) {
        paint();
        riffleStep();
      } else {
        endIntro();
        paint();
      }
    });
  }
  function startIntro() {
    const coarse = matchMedia("(max-width: 640px), (pointer: coarse)").matches;
    if (coarse || REDUCED || Q.has("nointro")) {
      idx = LAND;
      paint();
      return;
    }
    const steps = M + LAND;
    riffle = [];
    for (let r = 0; r < steps; r++) {
      const bell = Math.sin(Math.PI * (r / Math.max(1, steps - 1)));
      riffle.push({ bell, dur: 0.26 - 0.19 * bell });
    }
    riffleAt = 0;
    introOn = true;
    wrap.classList.add("intro");
    riffleStep();
  }

  async function boot() {
    idx = Q.has("shot") ? (parseInt(Q.get("shot") || "0", 10) || 0) % M : 0;
    paint();
    applyView();
    await Promise.all(
      PAGES.map((p) => {
        const im = new Image();
        im.src = p.url;
        return im.decode
          ? im.decode().catch(() => {})
          : new Promise((r) => {
              im.onload = im.onerror = () => r(undefined);
            });
      }),
    );
    if (document.fonts?.ready) await document.fonts.ready.catch(() => {});
    syncZoom();
    restLoupe();
    document.body.dataset.ready = "1";
    if (Q.has("shot")) {
      if (Q.has("t")) startTurn((Q.get("dir") as "next" | "prev") || "next", parseFloat(Q.get("t") || "0"));
      return;
    }
    setTimeout(startIntro, 220);
  }

  boot();
}

