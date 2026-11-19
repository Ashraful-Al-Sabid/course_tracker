# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Static HTML + CSS + a small vanilla JS file. No build step, no framework; opened directly from disk. Progress is stored in the browser's localStorage.

## Users
One student (CSE, United International University) tracking their own trimester. They open the page before and after each class to tick off what was taught and see how far through each course they are.

## Product Purpose
Turn each course outline into a per-class to-do list of the main topics taught, with a progress indicator at the top that fills as topics are ticked and marks the course complete at 100%.

## Operating Context
- Source material is the official course outline PDF issued by the department.
- New courses are added by handing the outline to Devin, who extracts the topics into the page's course data. The page itself does not parse PDFs.
- First course: CSE 3522 Database Management Systems Laboratory, Fall 2026 (12 lab classes).

## Capabilities and Constraints
- Each class (lab) is a group of tickable sub-topics.
- Assessments (lab tests, mid-term, final, mini project) appear as tickable milestones at the lab they occur in, and count toward progress.
- Progress shown at the top; a distinct completed state when everything is ticked.
- Built for one course now; structure must accept more courses later without redesign.
- Ticks persist across reloads on the same browser. No accounts, no sync.

## Evidence on Hand
- `C:\Users\rahat\Downloads\CSE3522DatabaseManagementSystemsLabOutline.pdf` (lab schedule, COs, assessment mapping).
- Sub-topics per lab are derived from the outline's topic titles and lab outcomes; the outline does not list them item by item.

## Product Principles
1. The outline is the source of truth: topics and their order follow it.
2. Ticking is the only job; everything else stays out of the way.
3. Progress is honest: it counts exactly what is ticked.
4. Adding a course is a data change, never a layout change.
