import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

// 1. Validate vercel.json
const vercelPath = path.join(ROOT, "vercel.json");
const vercelConfig = JSON.parse(await readFile(vercelPath, "utf8"));
assert(vercelConfig.outputDirectory === "public", 'vercel.json must set outputDirectory to "public".');
assert(vercelConfig.buildCommand === null, "vercel.json should keep buildCommand set to null for zero-build static deploy.");

// 2. Validate courses.js data
const coursesModule = await import(pathToFileURL(path.join(PUBLIC_DIR, "js", "courses.js")).href);
const courses = coursesModule.COURSES;
assert(Array.isArray(courses) && courses.length > 0, "public/js/courses.js must export a non-empty COURSES array.");

const seenIds = new Set();
let totalClasses = 0;
let totalItems = 0;

if (Array.isArray(courses)) {
  for (const [ci, course] of courses.entries()) {
    const label = `Course[${ci}] (${course?.id || "missing id"})`;
    assert(typeof course?.id === "string" && /^[a-zA-Z0-9_-]+$/.test(course.id), `${label}: id must be URL-safe (letters, numbers, _ or -).`);
    assert(!seenIds.has(course?.id), `${label}: duplicate course id "${course?.id}".`);
    seenIds.add(course?.id);
    assert(typeof course?.code === "string" && course.code.trim().length > 0, `${label}: missing code.`);
    assert(typeof course?.title === "string" && course.title.trim().length > 0, `${label}: missing title.`);
    assert(typeof course?.unit === "string" && course.unit.trim().length > 0, `${label}: missing unit.`);
    assert(Array.isArray(course?.classes) && course.classes.length > 0, `${label}: must have at least one class.`);

    for (const [li, cls] of (course?.classes || []).entries()) {
      totalClasses++;
      assert(typeof cls?.title === "string" && cls.title.trim().length > 0, `${label} class[${li}]: missing title.`);
      assert(Array.isArray(cls?.items) && cls.items.length > 0, `${label} class[${li}]: must have at least one item.`);
      for (const [ii, item] of (cls?.items || []).entries()) {
        totalItems++;
        const text = typeof item === "string" ? item : item?.text;
        assert(typeof text === "string" && text.trim().length > 0, `${label} class[${li}] item[${ii}]: missing item text.`);
      }
    }
  }
}

// 3. Validate referenced assets in index.html and main.css
const html = await readFile(path.join(PUBLIC_DIR, "index.html"), "utf8");
const css = await readFile(path.join(PUBLIC_DIR, "styles", "main.css"), "utf8");

const refs = new Set();
for (const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) refs.add(match[1]);
for (const match of css.matchAll(/url\(["']?(\/[^"')]+)["']?\)/g)) refs.add(match[1]);

for (const ref of refs) {
  const target = path.join(PUBLIC_DIR, ref.replace(/^\/+/, ""));
  assert(await fileExists(target), `Missing static asset referenced as "${ref}" (expected at ${path.relative(ROOT, target)}).`);
}

if (errors.length > 0) {
  console.error("Verification failed:");
  for (const err of errors) console.error("  - " + err);
  process.exit(1);
}

console.log(`OK: ${courses.length} courses, ${totalClasses} classes, ${totalItems} items, ${refs.size} static assets verified.`);
