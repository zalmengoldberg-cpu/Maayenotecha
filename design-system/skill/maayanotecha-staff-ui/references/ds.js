/* מעיינותיך · ds.js — אייקונים, סרגל צד, טאבים, לוח שנה עברי, גרפים קטנים */
(function () {
  "use strict";

  /* ---------------- אייקונים: קו 1.6, פינות מעוגלות, 24×24 ---------------- */
  const P = {
    home: '<path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z"/>',
    book: '<path d="M12 6.5C10.4 5.3 8.2 4.8 5 5v13c3.2-.2 5.4.3 7 1.5 1.6-1.2 3.8-1.7 7-1.5V5c-3.2-.2-5.4.3-7 1.5z"/><path d="M12 6.5v13"/>',
    library: '<rect x="4" y="4" width="4" height="16" rx="1"/><rect x="10" y="4" width="4" height="16" rx="1"/><path d="m16.5 5.2 3.4-.9 3 14.6-3.4.9z" transform="translate(-2.2 .2)"/>',
    bag: '<path d="M5.5 8h13l-1 11.2a1 1 0 0 1-1 .8h-9a1 1 0 0 1-1-.8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="14.5" rx="3"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
    users: '<circle cx="9.5" cy="9" r="3.2"/><path d="M3.8 19c.6-3 2.9-4.6 5.7-4.6s5.1 1.6 5.7 4.6"/><path d="M15.5 6a3 3 0 0 1 0 6M17.6 14.6c1.5.6 2.4 2 2.7 4.4"/>',
    truck: '<path d="M3.5 6.5h10v9h-10zM13.5 10h3.8l3.2 3.3v2.2h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    box: '<path d="m12 3.8 7.5 4v8.4L12 20.2l-7.5-4V7.8z"/><path d="M4.8 8 12 12l7.2-4M12 12v8"/>',
    chart: '<path d="M4 19.5h16"/><rect x="5.5" y="11" width="3" height="6" rx="1"/><rect x="10.5" y="7" width="3" height="10" rx="1"/><rect x="15.5" y="4.5" width="3" height="12.5" rx="1"/>',
    sparkle: '<path d="M12 4c.6 3.9 2.1 5.4 6 6-3.9.6-5.4 2.1-6 6-.6-3.9-2.1-5.4-6-6 3.9-.6 5.4-2.1 6-6z"/><path d="M18.5 15.5c.2 1.3.7 1.8 2 2-1.3.2-1.8.7-2 2-.2-1.3-.7-1.8-2-2 1.3-.2 1.8-.7 2-2z"/>',
    quote: '<path d="M9.5 7C7 7.6 5.5 9.6 5.5 12.4V17H10v-4.5H7.5M18.5 7c-2.5.6-4 2.6-4 5.4V17H19v-4.5h-2.5"/>',
    image: '<rect x="4" y="5" width="16" height="14" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m4.5 17 4.5-4 3.5 3 2.5-2 4.5 3.5"/>',
    settings: '<circle cx="12" cy="12" r="2.8"/><path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6"/>',
    logout: '<path d="M10 4.5H6a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 19.5h4"/><path d="M14.5 8 18.5 12l-4 4M18.5 12H9"/>',
    bell: '<path d="M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5H5z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    search: '<circle cx="11" cy="11" r="6.2"/><path d="m20 20-4.4-4.4"/>',
    searchAi: '<circle cx="10" cy="13" r="5.6"/><path d="m14.2 17.2 5.3 5.3"/><path d="M17.6 2.2c.35 2.3 1.1 3.05 3.4 3.4-2.3.35-3.05 1.1-3.4 3.4-.35-2.3-1.1-3.05-3.4-3.4 2.3-.35 3.05-1.1 3.4-3.4z" fill="currentColor" stroke="none"/>',
    chevL: '<path d="m14.5 6-6 6 6 6"/>',
    chevR: '<path d="m9.5 6 6 6-6 6"/>',
    chevD: '<path d="m6 9.5 6 6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/><path d="M4 12h3M11 12h9"/><circle cx="9" cy="12" r="0"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>',
    more: '<circle cx="12" cy="5.5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="18.5" r="1.2" fill="currentColor"/>',
    arrowUpLeft: '<path d="M17 17 7.5 7.5M7 15V7h8"/>',
    mic: '<rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5"/>',
    send: '<path d="M19.5 4.5 4 11l6.5 2.5L13 20z"/><path d="m10.5 13.5 4-4"/>',
    swap: '<path d="M7 7.5h11l-3-3M17 16.5H6l3 3"/>',
    panel: '<rect x="4" y="4.5" width="16" height="15" rx="3"/><path d="M14.5 4.5v15M10 10l-2 2 2 2"/>',
    attach: '<path d="m19 11.5-6.8 6.8a4.5 4.5 0 0 1-6.4-6.4l7.4-7.4a3 3 0 0 1 4.2 4.2l-7.2 7.2a1.5 1.5 0 0 1-2.1-2.1l6.5-6.5"/>',
    check: '<path d="m5.5 12.5 4 4 9-9"/>',
    mail: '<rect x="4" y="5.5" width="16" height="13" rx="3"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5"/>',
    flame: '<path d="M12 20.5c3.6 0 6-2.4 6-5.8 0-3.5-2.6-5.6-3.6-8.7-.4 2-1.4 3.2-2.6 3.8C12 7.3 10.6 5 8.8 3.5 9 7.6 6 10 6 14.7c0 3.4 2.4 5.8 6 5.8z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.1-2.4 3.6"/><circle cx="12" cy="16.9" r=".9" fill="currentColor" stroke="none"/>'
  };
  const sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">' +
    Object.entries(P).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join("") + "</svg>";
  const icon = (n, cls = "") => `<svg class="ico ${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  window.DS = { icon, icons: Object.keys(P) };

  /* חלקי DOM: רצים מיד אם ה-body קיים, אחרת ב-DOMContentLoaded (כך אפשר לטעון את הקובץ גם ב-head) */
  function domInit() {
  document.body.insertAdjacentHTML("afterbegin", sprite);
    document.querySelectorAll("[data-icon]").forEach(el => { el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon, el.dataset.iconClass || "")); });

    /* ---------------- סרגל צד ---------------- */
    document.querySelectorAll(".sidebar").forEach(sb => {
      /* לחיצה על הלוגו מכווצת/פותחת את הסרגל. עמוד שמציג את הסרגל כמגירה
         (מובייל) יכול לבטל את האירוע ds:logo ולסגור את המגירה במקום. */
      sb.querySelectorAll(".sb-logo, .sb-collapse").forEach(btn => btn.addEventListener("click", () => {
        const ev = new CustomEvent("ds:logo", { cancelable: true });
        if (!sb.dispatchEvent(ev)) return;
        const c = sb.classList.toggle("is-collapsed");
        btn.setAttribute("aria-expanded", String(!c));
        btn.setAttribute("aria-label", c ? "פתיחת הסרגל" : "כיווץ הסרגל");
      }));
      sb.querySelectorAll(".sb-item[data-nav]").forEach(it => it.addEventListener("click", () => {
        sb.querySelectorAll(".sb-item[aria-current]").forEach(x => x.removeAttribute("aria-current"));
        it.setAttribute("aria-current", "page");
      }));
    });

    /* ---------------- טאבים מפולחים ---------------- */
    document.querySelectorAll(".seg").forEach(seg => seg.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      seg.querySelectorAll("button").forEach(x => x.setAttribute("aria-selected", String(x === b)));
    }));

    /* ---------------- ברכה לפי שעה ---------------- */
    document.querySelectorAll("[data-greeting]").forEach(el => {
      const h = new Date().getHours();
      el.textContent = h < 5 ? "לילה טוב" : h < 12 ? "בוקר טוב" : h < 17 ? "צהריים טובים" : h < 21 ? "ערב טוב" : "לילה טוב";
    });

  }
  if (document.body) domInit(); else document.addEventListener("DOMContentLoaded", domInit);

  /* ---------------- גימטריה ---------------- */
  function gematria(n, punct) {
    const H = ["", "ק", "ר", "ש", "ת"], T = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"], U = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
    let s = ""; n = n % 1000;
    while (n >= 400) { s += "ת"; n -= 400; }
    if (n >= 100) { s += H[Math.floor(n / 100)]; n %= 100; }
    if (n === 15) s += "טו"; else if (n === 16) s += "טז"; else { s += T[Math.floor(n / 10)] + U[n % 10]; }
    if (!punct) return s;
    return s.length === 1 ? s + "׳" : s.slice(0, -1) + "״" + s.slice(-1);
  }
  window.DS.gematria = gematria;

  /* ---------------- תאריך עברי (Intl, לוח עברי) ---------------- */
  const MONTHS = { Tishri: "תשרי", Heshvan: "חשון", Kislev: "כסלו", Tevet: "טבת", Shevat: "שבט", "Adar I": "אדר א׳", "Adar II": "אדר ב׳", Adar: "אדר", Nisan: "ניסן", Iyar: "אייר", Sivan: "סיון", Tamuz: "תמוז", Av: "אב", Elul: "אלול" };
  const hfmt = new Intl.DateTimeFormat("en-u-ca-hebrew", { day: "numeric", month: "long", year: "numeric" });
  function heb(d) {
    const p = {}; hfmt.formatToParts(d).forEach(x => p[x.type] = x.value);
    return { day: +p.day, month: p.month, monthHe: MONTHS[p.month] || p.month, year: +String(p.year).replace(/\D/g, "") };
  }
  const DOW = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const gLong = new Intl.DateTimeFormat("he-IL", { day: "numeric", month: "long", year: "numeric" });
  const gMonthYear = new Intl.DateTimeFormat("he-IL", { month: "short" });

  /* ---------------- רכיב לוח שנה ---------------- */
  window.DS.calendar = function (root, opts) {
    const events = (opts && opts.events) || {};
    const today = new Date(); today.setHours(12, 0, 0, 0);
    let selected = new Date(today);
    let anchor = new Date(today); // יום כלשהו בחודש המוצג

    function monthDays(a) {
      let s = new Date(a); while (heb(s).day !== 1) s = addDays(s, -1);
      const name = heb(s).month, out = [];
      for (let d = new Date(s); heb(d).month === name; d = addDays(d, 1)) out.push(new Date(d));
      return out;
    }
    function render() {
      const days = monthDays(anchor), h0 = heb(days[0]);
      const gFrom = gMonthYear.format(days[0]), gTo = gMonthYear.format(days[days.length - 1]);
      const gSpan = gFrom === gTo ? gFrom : `${gFrom}–${gTo}`;
      let cells = "";
      for (let i = 0; i < days[0].getDay(); i++) cells += "<span></span>";
      days.forEach(d => {
        const k = iso(d), ev = events[k] || [], h = heb(d);
        const cls = ["hcal-day", d.getDay() === 6 ? "is-shabbat" : "", k === iso(today) ? "is-today" : ""].join(" ");
        const dot = ev.length ? `<i class="dot ${ev.some(e => e.gold) ? "gold" : ""}"></i>` : "";
        cells += `<button class="${cls}" data-k="${k}" aria-pressed="${k === iso(selected)}" aria-label="${gematria(h.day, true)} ${h.monthHe}, ${gLong.format(d)}${ev.length ? `, ${ev.length} אירועים` : ""}"><span class="h">${gematria(h.day)}</span><span class="g">${d.getDate()}</span>${dot}</button>`;
      });
      const sh = heb(selected), sev = events[iso(selected)] || [];
      const list = sev.length ? sev.map(e => `<div class="row-tile"><i class="bullet ${e.gold ? "gold" : ""}"></i><div class="meta"><b>${e.t}</b><span>${e.s || ""}</span></div><span class="time">${e.time || ""}</span></div>`).join("")
        : `<p class="hcal-empty">אין אירועים ביום הזה. אפשר להוסיף אירוע מהכפתור למעלה.</p>`;
      root.innerHTML = `
        <div class="hcal-sheet">
          <div class="hcal-top">
            <div class="hcal-title"><span class="hcal-month">${h0.monthHe}</span><span class="hcal-year">${gematria(h0.year, true)} · ${gSpan} ${days[0].getFullYear()}</span></div>
            <div class="hcal-actions">
              <button class="btn btn-brand btn-sm" type="button">${icon("plus", "ico-sm")}הוסף אירוע</button>
              <button class="btn btn-secondary btn-icon btn-sm" type="button" aria-label="סינון">${icon("sliders", "ico-sm")}</button>
            </div>
          </div>
          <div class="hcal-grid" role="group" aria-label="ימי החודש">
            ${["א", "ב", "ג", "ד", "ה", "ו", "ש"].map((l, i) => `<span class="hcal-dow ${i === 6 ? "shabbat" : ""}">${l}</span>`).join("")}
            ${cells}
          </div>
        </div>
        <div class="hcal-detail">
          <div class="big"><b>${gematria(sh.day)}</b><span>${DOW[selected.getDay()]}</span></div>
          <span class="date">${gLong.format(selected)}</span>
          <span class="count">${sev.length} אירועים · ${gematria(sh.day, true)} ב${sh.monthHe}</span>
          <button class="btn btn-gold" type="button">${icon("clock")}זמני היום</button>
        </div>
        <div class="hcal-events">${list}</div>
        <div class="hcal-nav">
          <button class="btn btn-fab" type="button" data-step="-1" aria-label="החודש הקודם">${icon("chevR", "ico-lg")}</button>
          <button class="btn btn-fab" type="button" data-step="1" aria-label="החודש הבא">${icon("chevL", "ico-lg")}</button>
        </div>`;
    }
    root.addEventListener("click", e => {
      const day = e.target.closest(".hcal-day");
      if (day) { const [y, m, d] = day.dataset.k.split("-").map(Number); selected = new Date(y, m - 1, d, 12); render(); return; }
      const st = e.target.closest("[data-step]");
      if (st) {
        const days = monthDays(anchor);
        anchor = +st.dataset.step > 0 ? addDays(days[days.length - 1], 1) : addDays(days[0], -1);
        selected = monthDays(anchor)[0]; if (monthDays(anchor).some(d => iso(d) === iso(today))) selected = new Date(today);
        render();
      }
    });
    render();
    return { today, iso, addDays };
  };
  window.DS.iso = iso; window.DS.addDays = addDays;

  /* ---------------- ספארקליין מדורג (KPI) ---------------- */
  window.DS.spark = function (svg, values, color) {
    const w = 130, h = 40, n = values.length, max = Math.max(...values), min = Math.min(...values) * .8;
    const step = w / n, y = v => h - 4 - ((v - min) / (max - min || 1)) * (h - 10);
    let d = `M0 ${h}`; values.forEach((v, i) => { d += ` L${i * step} ${y(v)} L${(i + 1) * step} ${y(v)}`; }); d += ` L${w} ${h} Z`;
    let line = ""; values.forEach((v, i) => { line += `${i ? "L" : "M"}${i * step} ${y(v)} L${(i + 1) * step} ${y(v)} `; });
    const id = "g" + Math.random().toString(36).slice(2, 7);
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`); svg.setAttribute("preserveAspectRatio", "none");
    svg.innerHTML = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".38"/><stop offset="1" stop-color="${color}" stop-opacity=".02"/></linearGradient></defs>
      <path d="${d}" fill="url(#${id})"/><path d="${line}" fill="none" stroke="${color}" stroke-width="1.5" vector-effect="non-scaling-stroke"/>`;
  };


  /* ---------------- מדריך מודרך (Tour) ----------------
     DS.tour(steps, { key, onEnd }) → { start(), stop() }
     צעד: { target: "[data-tour=x]" | null, title, text, tap: true, action: "click",
            place: "auto|left|right|top|bottom", before(), only: () => bool }
     tap   – נקודה מהבהבת שמראה איפה ללחוץ (tapTarget – אלמנט אחר לנקודה בתוך האזור המודגש).
     action:"click" – המדריך מחכה שהמשתמש ילחץ על האלמנט בעצמו, ואז ממשיך.  */
  window.DS.tour = function (steps, opts = {}) {
    const key = opts.key || "mt-tour-done";
    let i = 0, live = [], els = null, raf = 0, cleanup = [];
    const store = { get() { try { return localStorage.getItem(key) === "1"; } catch (e) { return false; } },
                    set() { try { localStorage.setItem(key, "1"); } catch (e) {} } };
    const q = s => (typeof s === "string" ? document.querySelector(s) : s);
    function build() {
      document.body.insertAdjacentHTML("beforeend", `
        <div class="tour" role="dialog" aria-modal="true" aria-labelledby="tour-t">
          <div class="tour-dim"></div><div class="tour-spot"></div><div class="tour-tap"><i></i></div>
          <div class="tour-card">
            <div class="tour-meta"><span class="tour-count"></span><button class="tour-skip" type="button">דילוג</button></div>
            <h3 id="tour-t"></h3><p class="tour-text"></p>
            <p class="tour-hint">${icon("arrowUpLeft", "ico-sm")}<span></span></p>
            <div class="tour-progress"><i></i></div>
            <div class="tour-actions"><button class="btn btn-ghost btn-sm tour-prev" type="button">הקודם</button><button class="btn btn-primary btn-sm tour-next" type="button">הבא</button></div>
          </div>
        </div>`);
      const r = document.body.lastElementChild;
      els = { r, spot: r.querySelector(".tour-spot"), dim: r.querySelector(".tour-dim"), tap: r.querySelector(".tour-tap"), card: r.querySelector(".tour-card"),
        count: r.querySelector(".tour-count"), t: r.querySelector("h3"), x: r.querySelector(".tour-text"), hint: r.querySelector(".tour-hint"),
        bar: r.querySelector(".tour-progress i"), prev: r.querySelector(".tour-prev"), next: r.querySelector(".tour-next") };
      els.next.onclick = () => go(i + 1); els.prev.onclick = () => go(i - 1);
      r.querySelector(".tour-skip").onclick = () => stop(true);
      const key_ = e => { if (e.key === "Escape") stop(true); else if (e.key === "ArrowLeft") go(i + 1); else if (e.key === "ArrowRight") go(i - 1); };
      const re = () => place();
      document.addEventListener("keydown", key_); addEventListener("resize", re); addEventListener("scroll", re, true);
      cleanup.push(() => { document.removeEventListener("keydown", key_); removeEventListener("resize", re); removeEventListener("scroll", re, true); });
    }
    function place() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const st = live[i]; if (!st || !els) return;
        const el = q(st.target), vw = innerWidth, vh = innerHeight, m = 12, card = els.card;
        if (!el) { // צעד מרכזי בלי יעד
          els.r.classList.add("is-center"); els.spot.style.cssText = ""; els.tap.hidden = true;
          card.style.left = Math.max(m, (vw - card.offsetWidth) / 2) + "px"; card.style.top = Math.max(m, (vh - card.offsetHeight) / 2) + "px"; return;
        }
        els.r.classList.remove("is-center");
        const b = el.getBoundingClientRect(), pad = st.pad ?? 6, rad = getComputedStyle(el).borderRadius;
        Object.assign(els.spot.style, { left: b.left - pad + "px", top: b.top - pad + "px", width: b.width + pad * 2 + "px", height: b.height + pad * 2 + "px",
          borderRadius: (parseFloat(rad) || 12) + pad + "px" });
        els.tap.hidden = !st.tap && st.action !== "click";
        const tb = (q(st.tapTarget) || el).getBoundingClientRect(), rtl = getComputedStyle(el).direction === "rtl";
        const tx = tb.width > 70 ? (rtl ? tb.right - 20 : tb.left + 20) : tb.left + tb.width / 2; // באלמנט רחב: בצד ההתחלה, לא על הטקסט
        Object.assign(els.tap.style, { left: tx + "px", top: tb.top + tb.height / 2 + "px" });
        const cw = card.offsetWidth, ch = card.offsetHeight, g = 14;
        const opt = { bottom: [b.left + b.width / 2 - cw / 2, b.bottom + g], top: [b.left + b.width / 2 - cw / 2, b.top - g - ch],
          left: [b.left - g - cw, b.top + b.height / 2 - ch / 2], right: [b.right + g, b.top + b.height / 2 - ch / 2] };
        const fits = { bottom: b.bottom + g + ch < vh - m, top: b.top - g - ch > m, left: b.left - g - cw > m, right: b.right + g + cw < vw - m };
        let side = st.place && st.place !== "auto" && fits[st.place] ? st.place : ["left", "bottom", "top", "right"].find(s => fits[s]);
        let [x, y] = side ? opt[side] : [(vw - cw) / 2, vh - ch - m];
        card.style.left = Math.min(Math.max(m, x), vw - cw - m) + "px"; card.style.top = Math.min(Math.max(m, y), vh - ch - m) + "px";
      });
    }
    function go(n) {
      if (n < 0) return; if (n >= live.length) return stop(true);
      cleanup.filter(f => f.step).forEach(f => f()); cleanup = cleanup.filter(f => !f.step);
      i = n; const st = live[i];
      if (st.before) st.before();
      els.count.textContent = `שלב ${i + 1} מתוך ${live.length}`;
      els.t.textContent = st.title; els.x.textContent = st.text;
      els.hint.hidden = !st.action && !st.tap; els.hint.querySelector("span").textContent = st.action === "click" ? (st.hint || "לחצו על המקום המסומן כדי להמשיך") : (st.hint || "כאן לוחצים");
      els.bar.style.width = ((i + 1) / live.length) * 100 + "%";
      els.prev.hidden = i === 0; els.next.textContent = i === live.length - 1 ? "סיום" : st.action === "click" ? "דלג על השלב" : "הבא";
      els.next.classList.toggle("btn-primary", st.action !== "click"); els.next.classList.toggle("btn-secondary", st.action === "click");
      els.r.classList.toggle("is-action", st.action === "click");
      const el = q(st.target);
      if (st.action === "click" && el) {
        const h = e => { if (el.contains(e.target)) setTimeout(() => go(i + 1), st.delay ?? 450); };
        el.addEventListener("click", h); const off = () => el.removeEventListener("click", h); off.step = true; cleanup.push(off);
      }
      if (el) el.scrollIntoView({ block: "center", inline: "nearest", behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth" });
      setTimeout(place, 60); setTimeout(place, 420);
      (st.action === "click" ? els.card : els.next).focus?.();
    }
    function start() {
      live = steps.filter(s => !s.only || s.only()); if (!live.length) return;
      if (!els) build(); els.r.hidden = false; document.documentElement.classList.add("tour-on"); go(0);
    }
    function stop(done) {
      if (!els) return; els.r.hidden = true; document.documentElement.classList.remove("tour-on");
      cleanup.filter(f => f.step).forEach(f => f()); cleanup = cleanup.filter(f => !f.step);
      if (done) store.set(); opts.onEnd && opts.onEnd();
    }
    return { start, stop, seen: store.get, autostart(delay = 700) { if (!store.get()) setTimeout(start, delay); } };
  };

  /* ---------------- גאוג' טבעת עם רווחים ---------------- */
  window.DS.gauge = function (svg, parts) {
    const r = 70, c = 2 * Math.PI * r, gap = 10, total = parts.reduce((a, p) => a + p.v, 0);
    let off = 0, out = `<circle cx="90" cy="90" r="${r}" fill="none" stroke="rgba(20,26,51,.05)" stroke-width="12"/>`;
    parts.forEach(p => {
      const len = (p.v / total) * c - gap;
      out += `<circle cx="90" cy="90" r="${r}" fill="none" stroke="${p.c}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${len} ${c}" stroke-dashoffset="${-off}" transform="rotate(-90 90 90)"/>`;
      off += len + gap;
    });
    svg.setAttribute("viewBox", "0 0 180 180"); svg.innerHTML = out;
  };
})();
