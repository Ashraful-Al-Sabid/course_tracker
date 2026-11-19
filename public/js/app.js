import { COURSES } from "./courses.js";

const KEY = "course-tracker:v1";
const courses = Array.isArray(COURSES) ? COURSES : [];
const $ = (id) => document.getElementById(id);
const CHEVRON = '<svg class="chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CHECK = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

let store = {};
try { store = JSON.parse(localStorage.getItem(KEY)) || {}; } catch {}
let course, rows;

const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch {} };
const state = () => (store[course.id] ??= { checked: {}, signed: {}, completedAt: null });
const fmt = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const itemOf = (it) => (typeof it === "string" ? { text: it } : it);

function el(tag, props, ...kids) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...kids);
  return node;
}

function getRequestedCourseId() {
  const hashId = location.hash.slice(1).trim();
  if (hashId) return decodeURIComponent(hashId);
  const pathId = location.pathname.replace(/^\/+|\/+$/g, "");
  return pathId ? decodeURIComponent(pathId) : null;
}

function navigateToCourse(id) {
  const target = "/" + encodeURIComponent(id);
  if (location.pathname !== target || location.hash) {
    history.pushState(null, "", target);
  }
  pick();
}

function renderNav() {
  $("courses").hidden = courses.length < 2;
  const select = $("course-select");
  select.replaceChildren(...courses.map((c) => el("option", { value: c.id, textContent: c.title + " (" + c.code + ")" })));
  select.value = course.id;
}

function showPicker(show) {
  $("course-picker").hidden = !show;
  $("course-change").hidden = show;
}

$("course-change").addEventListener("click", () => { showPicker(true); $("course-select").focus(); });
$("course-select").addEventListener("change", (e) => { navigateToCourse(e.target.value); showPicker(false); });
$("course-select").addEventListener("blur", () => showPicker(false));
$("course-select").addEventListener("keydown", (e) => {
  if (e.key === "Escape") { showPicker(false); $("course-change").focus(); }
});

function renderCourse() {
  const st = state();
  document.title = course.code + " · Course tracker";
  $("course-title").textContent = course.title;
  $("course-meta").textContent = [course.code, course.term, course.section, course.instructor].filter(Boolean).join(" · ");
  resetConfirm(false);

  let no = 0;
  rows = course.classes.map((cls, ci) => {
    const id = "c" + (ci + 1);
    const label = cls.label || course.unit + " " + ++no;
    const items = cls.items.map(itemOf);
    const count = el("span", { className: "lab-count num" });
    const sign = el("span", { className: "lab-sign" });
    const toggle = el("button", { type: "button", className: "lab-toggle" },
      el("span", { className: "lab-no", textContent: label }),
      el("span", { className: "lab-title" }, el("span", { textContent: cls.title })),
      count, sign);
    toggle.querySelector(".lab-title").insertAdjacentHTML("afterbegin", CHEVRON);
    toggle.setAttribute("aria-controls", id + "-panel");

    const boxes = items.map((it, ii) => {
      const key = id + "." + ii;
      const box = el("input", { type: "checkbox", checked: !!st.checked[key] });
      box.addEventListener("change", () => {
        if (box.checked) st.checked[key] = true; else delete st.checked[key];
        update(true);
      });
      return box;
    });
    const list = el("ul", { className: "topics" }, ...items.map((it, ii) =>
      el("li", {}, el("label", { className: "topic" }, boxes[ii],
        el("span", { className: "topic-text", textContent: it.text }),
        ...(it.kind ? [el("span", { className: "tag", textContent: it.kind })] : [])))));
    const panel = el("div", { className: "lab-panel", id: id + "-panel" }, list);
    const li = el("li", { className: "lab" }, el("h2", {}, toggle), panel);
    const row = { id, li, toggle, panel, boxes, count, sign };
    toggle.addEventListener("click", () => setOpen(row, panel.hidden));
    return row;
  });

  $("index").replaceChildren(...rows.map((r) => r.li));
  const next = rows.find((r) => r.boxes.some((b) => !b.checked));
  rows.forEach((r) => setOpen(r, r === next));
  update(false);
}

function setOpen(row, open) {
  row.panel.hidden = !open;
  row.toggle.setAttribute("aria-expanded", String(open));
  row.li.classList.toggle("is-open", open);
}

function update(animate) {
  const st = state();
  let done = 0, total = 0;
  rows.forEach((r) => {
    const n = r.boxes.filter((b) => b.checked).length;
    done += n; total += r.boxes.length;
    r.count.textContent = n + " / " + r.boxes.length;
    const full = n === r.boxes.length;
    r.li.classList.toggle("is-done", full);
    if (full && !st.signed[r.id]) {
      st.signed[r.id] = new Date().toISOString();
      r.sign.classList.toggle("is-new", animate);
    } else if (!full) {
      delete st.signed[r.id];
      r.sign.classList.remove("is-new");
    }
    if (st.signed[r.id]) {
      r.sign.innerHTML = CHECK;
      r.sign.append(el("span", { className: "sr-only", textContent: "Signed off" }));
    } else r.sign.replaceChildren();
  });

  const complete = total > 0 && done === total;
  if (complete && !st.completedAt) st.completedAt = new Date().toISOString();
  if (!complete) st.completedAt = null;
  save();

  const pct = total ? Math.round((done / total) * 100) : 0;
  $("fill").style.width = pct + "%";
  const bar = $("bar");
  bar.setAttribute("aria-valuemax", total);
  bar.setAttribute("aria-valuenow", done);
  bar.setAttribute("aria-valuetext", done + " of " + total + " topics done");
  $("count").textContent = done + " of " + total + " topics and tests done";
  $("pct").textContent = pct + "%";
  $("complete").hidden = !complete;
  $("complete").classList.toggle("is-new", complete && animate);
  $("complete-date").textContent = complete ? "Signed off " + fmt(st.completedAt) : "";
  document.body.classList.toggle("is-complete", complete);
  $("reset-ask").disabled = done === 0;
}

function resetConfirm(show) {
  $("reset-ask").hidden = show;
  $("reset-confirm").hidden = !show;
}

$("reset-ask").addEventListener("click", () => { resetConfirm(true); $("reset-no").focus(); });
$("reset-no").addEventListener("click", () => { resetConfirm(false); $("reset-ask").focus(); });
$("reset-yes").addEventListener("click", () => {
  delete store[course.id];
  save();
  renderCourse();
  window.scrollTo({ top: 0 });
});

function pick() {
  const requestedId = getRequestedCourseId();
  const matched = requestedId ? courses.find((c) => c.id === requestedId) : null;
  course = matched || courses[0];

  if (!course) {
    $("course-title").textContent = "No courses yet";
    $("course-meta").textContent = "Add a course to public/js/courses.js to start tracking.";
    document.querySelector(".progress").hidden = true;
    document.querySelector(".index-head").hidden = true;
    document.querySelector(".foot").hidden = true;
    return;
  }

  // Upgrade legacy hash URLs (/#cse3522) and normalize unknown paths cleanly
  if (location.hash) {
    history.replaceState(null, "", "/" + encodeURIComponent(course.id));
  } else if (requestedId && !matched) {
    history.replaceState(null, "", "/");
  }

  renderNav();
  renderCourse();
}

window.addEventListener("popstate", pick);
window.addEventListener("hashchange", pick);
pick();
