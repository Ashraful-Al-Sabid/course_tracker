export const CALENDARS = {
  "Fall 2026": {
    preMid: { start: "2026-10-27", end: "2026-12-04" },
    midTerm: { start: "2026-12-05", end: "2026-12-12" },
    postMid: { start: "2026-12-13", end: "2027-01-20" },
    suspended: { start: "2027-01-21", end: "2027-01-24" },
    finalExam: { start: "2027-01-25", end: "2027-02-01" },
    holidays: {
      "2026-11-07": "Holiday: National Revolution and Solidarity Day",
      "2026-12-16": "Holiday: Victory Day",
      "2026-12-25": "Holiday: Christmas Day",
      "2027-01-24": "Holiday: Shab-e-Barat"
    },
    // Thursdays designated as regular online class days for specific weekdays
    makeups: {
      "2026-11-05": { asDay: 6, note: "Regular Saturday Class (online)" },
      "2026-11-12": { asDay: 6, note: "Regular Saturday Class (online)" },
      "2026-11-26": { asDay: 0, note: "Regular Sunday Class (online)" },
      "2026-12-17": { asDay: 3, note: "Regular Wednesday Class (online)" },
      "2026-12-31": { asDay: 6, note: "Regular Saturday Class (online)" }
    }
  }
};

function parseLocalDate(iso, hours = 23, minutes = 59, seconds = 0, ms = 0) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, hours, minutes, seconds, ms);
}

function parseTime(hhmm) {
  if (!hhmm) return [23, 59];
  const [h, m] = hhmm.split(":").map(Number);
  return [h, m];
}

function toIsoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatShortDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function formatShortRange(startIso, endIso) {
  const [sy, sm, sd] = startIso.split("-").map(Number);
  const [ey, em, ed] = endIso.split("-").map(Number);
  const sDate = new Date(sy, sm - 1, sd);
  const eDate = new Date(ey, em - 1, ed);
  const sMonth = sDate.toLocaleDateString("en-GB", { month: "short" });
  const eMonth = eDate.toLocaleDateString("en-GB", { month: "short" });
  if (sy === ey && sm === em) return `${sd}–${ed} ${sMonth}`;
  return `${sd} ${sMonth}–${ed} ${eMonth}`;
}

function formatFullDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function collectTeachingDates(cal, startIso, endIso, targetDays) {
  const dates = [];
  const [sy, sm, sd] = startIso.split("-").map(Number);
  const [ey, em, ed] = endIso.split("-").map(Number);
  const cur = new Date(sy, sm - 1, sd);
  const end = new Date(ey, em - 1, ed);

  while (cur <= end) {
    const iso = toIsoDate(cur);
    const makeup = cal.makeups[iso];
    const effectiveDay = makeup ? makeup.asDay : cur.getDay();
    if (!cal.holidays[iso] && targetDays.includes(effectiveDay)) {
      dates.push({ iso, makeupNote: makeup ? makeup.note : null });
    }
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

/**
 * Computes the scheduled finish date/time for every class in a course
 * based on the academic calendar and the course's weekly class days.
 */
export function computeCourseSchedule(course) {
  const sched = course?.schedule;
  if (!sched) return course.classes.map(() => null);

  const cal = CALENDARS[sched.term || course.term || "Fall 2026"];
  if (!cal || !Array.isArray(sched.days) || sched.days.length === 0) {
    return course.classes.map(() => null);
  }

  const [endH, endM] = parseTime(sched.end);
  const preDates = collectTeachingDates(cal, cal.preMid.start, cal.preMid.end, sched.days);
  const postDates = collectTeachingDates(cal, cal.postMid.start, cal.postMid.end, sched.days);
  const hasExplicitMid = course.classes.some((c) => c.label === "Mid");

  if (!hasExplicitMid) {
    const allDates = [...preDates, ...postDates];
    return course.classes.map((_, idx) => {
      const slot = allDates[Math.min(idx, allDates.length - 1)];
      if (!slot) return null;
      return {
        iso: slot.iso,
        shortLabel: formatShortDate(slot.iso),
        finishAt: parseLocalDate(slot.iso, endH, endM),
        tooltip: formatFullDate(slot.iso) + (slot.makeupNote ? ` · ${slot.makeupNote}` : "")
      };
    });
  }

  let phase = "pre";
  let preIdx = 0;
  let postIdx = 0;

  return course.classes.map((cls) => {
    if (cls.label === "Mid") {
      phase = "post";
      return {
        iso: cal.midTerm.end,
        shortLabel: formatShortRange(cal.midTerm.start, cal.midTerm.end),
        finishAt: parseLocalDate(cal.midTerm.end, 23, 59),
        tooltip: `Mid-Term Exam: ${formatFullDate(cal.midTerm.start)} – ${formatFullDate(cal.midTerm.end)}`
      };
    }
    if (cls.label === "Final") {
      return {
        iso: cal.finalExam.end,
        shortLabel: formatShortRange(cal.finalExam.start, cal.finalExam.end),
        finishAt: parseLocalDate(cal.finalExam.end, 23, 59),
        tooltip: `Final Exam: ${formatFullDate(cal.finalExam.start)} – ${formatFullDate(cal.finalExam.end)}`
      };
    }

    const pool = phase === "pre" ? preDates : postDates;
    const idx = phase === "pre" ? preIdx++ : postIdx++;
    const slot = pool[Math.min(idx, pool.length - 1)];
    if (!slot) return null;

    return {
      iso: slot.iso,
      shortLabel: formatShortDate(slot.iso),
      finishAt: parseLocalDate(slot.iso, endH, endM),
      tooltip: formatFullDate(slot.iso) + (slot.makeupNote ? ` · ${slot.makeupNote}` : "")
    };
  });
}

export function isClassDue(scheduleEntry, now = new Date()) {
  return Boolean(scheduleEntry && scheduleEntry.finishAt && now >= scheduleEntry.finishAt);
}
