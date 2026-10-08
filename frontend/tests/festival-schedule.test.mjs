import { test } from "node:test";
import assert from "node:assert/strict";
import {
  countdownValues,
  festivalEvents,
  formatEventDate,
  formatSessionTime,
  getEventTiming,
  getFestivalSnapshot,
} from "../data/festival-schedule.ts";

function snapshot(timestamp) {
  return getFestivalSnapshot(Date.parse(timestamp));
}

test("Before FeISTEval, Scotland Yard round 1 is next and nothing is live", () => {
  const result = snapshot("2026-10-08T12:00:00+05:30");
  assert.equal(result.phase, "before");
  assert.equal(result.current.length, 0);
  assert.equal(result.next.event.id, "scotland-yard");
  assert.equal(result.next.session.startsAt, "2026-10-11T09:00:00+05:30");
});

test("Scotland Yard switches at the exact start and end of all three rounds", () => {
  for (const [time, currentStart, nextStart] of [
    ["09:00:00", "09:00:00", "15:00:00"],
    ["12:59:59", "09:00:00", "15:00:00"],
    ["13:00:00", null, "15:00:00"],
    ["14:59:59", null, "15:00:00"],
    ["15:00:00", "15:00:00", "18:00:00"],
    ["17:00:00", null, "18:00:00"],
    ["18:00:00", "18:00:00", null],
  ]) {
    const result = snapshot(`2026-10-11T${time}+05:30`);
    assert.deepEqual(
      result.current.map((slot) => slot.session.startsAt),
      currentStart ? [`2026-10-11T${currentStart}+05:30`] : [],
    );
    if (nextStart)
      assert.equal(
        result.next.session.startsAt,
        `2026-10-11T${nextStart}+05:30`,
      );
    else assert.equal(result.next.event.id, "concrete");
  }
  assert.equal(snapshot("2026-10-11T19:00:00+05:30").current.length, 0);
  assert.equal(
    snapshot("2026-10-11T19:00:00+05:30").next.session.startsAt,
    "2026-10-12T18:30:00+05:30",
  );
});

test("Each Square One day starts at its published time and is no longer live at its end", () => {
  for (const [day, id] of [
    [12, "concrete"],
    [13, "clutch"],
    [15, "crypt"],
    [16, "catalyst"],
  ]) {
    const date = `2026-10-${day}`;
    const before = snapshot(`${date}T00:00:00+05:30`);
    assert.equal(before.current.length, 0);
    assert.equal(before.next.event.id, id);
    assert.equal(snapshot(`${date}T18:29:59+05:30`).current.length, 0);
    assert.equal(snapshot(`${date}T18:30:00+05:30`).current[0].event.id, id);
    assert.equal(snapshot(`${date}T20:29:59+05:30`).current[0].event.id, id);
    assert.equal(snapshot(`${date}T20:30:00+05:30`).current.length, 0);
  }
});

test("Charge's 8–9 PM break is not live and round 2 becomes the next session", () => {
  assert.equal(
    snapshot("2026-10-14T18:00:00+05:30").current[0].event.id,
    "charge",
  );
  const gap = snapshot("2026-10-14T20:00:00+05:30");
  assert.equal(gap.current.length, 0);
  assert.equal(gap.next.session.startsAt, "2026-10-14T21:00:00+05:30");
  assert.equal(
    getEventTiming("charge", Date.parse("2026-10-14T20:30:00+05:30")).status,
    "intermission",
  );
  assert.equal(
    snapshot("2026-10-14T21:00:00+05:30").current[0].session.startsAt,
    "2026-10-14T21:00:00+05:30",
  );
  assert.equal(snapshot("2026-10-14T23:00:00+05:30").next.event.id, "crypt");
});

test("The last event is live without a next event; the festival completes only at 8:30 PM", () => {
  const live = snapshot("2026-10-16T20:29:59+05:30");
  assert.equal(live.phase, "live");
  assert.equal(live.next, null);
  const finished = snapshot("2026-10-16T20:30:00+05:30");
  assert.equal(finished.phase, "complete");
  assert.equal(finished.current.length, 0);
  assert.equal(finished.next, null);
  assert.equal(
    getEventTiming("concrete", Date.parse("2026-10-13T09:00:00+05:30")).status,
    "complete",
  );
});

test("Absolute timestamps and formatted labels use IST even in other browser timezones", () => {
  const scotland = festivalEvents.find((event) => event.id === "scotland-yard");
  assert.equal(
    new Date(scotland.sessions[0].startsAt).toISOString(),
    "2026-10-11T03:30:00.000Z",
  );
  assert.equal(
    snapshot("2026-10-11T03:30:00Z").current[0].event.id,
    "scotland-yard",
  );
  assert.match(formatEventDate(scotland), /Sunday.*11 October 2026/);
  assert.match(
    formatSessionTime(scotland.sessions[0]),
    /9:00\sAM–1:00\sPM IST/,
  );
});

test("Countdowns remain non-negative across a boundary and include days, hours, minutes and seconds", () => {
  assert.deepEqual(countdownValues(-1000), [0, 0, 0, 0]);
  assert.deepEqual(countdownValues(0), [0, 0, 0, 0]);
  assert.deepEqual(countdownValues(90061000), [1, 1, 1, 1]);
});
