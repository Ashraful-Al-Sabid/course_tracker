---
name: Course Tracker
description: A lab copy index page for ticking off course topics.
colors:
  cover: "#1f3a6b"
  cover-deep: "#152a50"
  cover-soft: "#c7d2ea"
  paper: "#fdfdf8"
  paper-tint: "#eef2fb"
  ink: "#1b1f2a"
  ink-soft: "#505a72"
  rule: "#d3d9e6"
  pen: "#2447b8"
  margin: "#d2453d"
  margin-ink: "#b3302a"
typography:
  family: "Public Sans, system-ui, sans-serif (self-hosted in assets/fonts)"
  title: "1.875rem / 700"
  body: "1rem / 400, 1.5 line height"
  small: "0.875rem and 0.8125rem"
rounded:
  control: "4px"
  bar: "6px"
---

# Design System: Course Tracker

## Overview

**Creative North Star: "The index page at the front of a lab copy."**

One row per class, hairline rules, a red margin rule beside the No. column, and a dated sign-off when a class is finished. Light paper surface because it is used at a desk or in a lab room under bright light.

## Colour

- Navy `cover` owns the header band only. Text on it is `paper`; secondary text is `cover-soft`.
- `pen` blue means "done by you": checkboxes, sign-off dates, focus rings, selection.
- `margin` red is the vertical rule; `margin-ink` is its text-safe shade, used only for Test, Exam and Project tags and the destructive button.
- Secondary text on paper is `ink-soft`, never grey.

## Typography

One family throughout. Weight steps 400 / 600 / 700. Counts and percentages use tabular numerals.

## Components

- **Course picker**: a labelled native select at the top of the cover, options written as "Title (CODE)"; `paper` background with `cover` text. Hidden when there is only one course.
- **Index row**: grid of No. | title | done count | sign-off; the whole row is the expand button. Open row gets `paper-tint`.
- **Topic**: native checkbox with label, 44px minimum row height; ticked text turns `ink-soft` with a strike.
- **Tag**: outlined `margin-ink` label for assessments.
- **Progress**: 12px bar in the cover, count left, percent right. At 100% a "Course complete" stamp with the date appears beside the title.
- **Button**: 1px outlined, 4px radius; danger variant filled `margin-ink`.

## Motion

State changes only, 150 to 300 ms, ease-out. Two authored moments: the sign-off date writes in left to right, and the completion stamp lands once. All motion is off under reduced-motion.

## Rules

- Adding a course is a data change in `courses.js`; the layout does not change.
- No cards, no progress rings, no modals. Destructive actions confirm inline.
- Below 640px the sign-off moves under the title and the column header hides.
