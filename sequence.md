# ScaleDaycares – Six-Branch Follow-Up Roadmap

**Source:** Sales Ops Brain 2 – November 5, 2026

## Definitions

- **First-call no-show:** A brand-new prospect who missed the original appointment. Daniel has never spoken with them.
- **Second-call no-show:** A prospect Daniel already spoke with who booked and then missed the second/closing call.
- **Timing:** Day numbers are measured from entry into the branch unless the touch is labeled relative to an appointment.

## Routing authority

**Daniel's EOD, populated and interpreted by Grokbot:** EOD/Grokbot is authoritative for no-shows, cancellations, reschedules, and the lead's next branch. Never infer a no-show only because a scheduled date passed.

## Global rules

- A lead can be active in only one branch at a time; never stack branch sequences.
- A newly booked appointment pauses the active recovery/follow-up sequence and moves the lead to the matching confirmation branch.
- Any reply pauses automation for Daniel to handle; do not restart a sequence automatically.
- Honor the specific follow-up date promised on the call before applying a generic cadence.
- Avoid repeating messages or proof already sent in the existing thread.
- Before every send, verify there is no reply, booked call, payment, manual pause, or opt-out.
- Respect channel permission, opt-outs, CASL, and CAN-SPAM; send only relevant, useful touches.
- Payment moves the lead to Closed and stops all automation. Daniel's explicit Lost/DQ instruction stops all automation.

---

# Branch 1 · First-Call Confirmation

**Purpose:** Get a brand-new booked prospect to acknowledge the meeting, consume the proof, and show up prepared.

**Entry trigger:** A brand-new first call is booked.

**Total cadence:** 2 emails · 2–3 texts

## Booking

- **Immediately after booking · Email:** Booking confirmation + call link — prompt: _(empty)_
- **Immediately after booking · SMS:** Booking acknowledgment — prompt: _(empty)_

## Pre-call

- **24 hours before · Email:** Reminder + preparation — prompt: _(empty)_
- **24 hours before · SMS · conditional:** Conditional confirmation if unanswered — prompt: _(empty)_
- **15 minutes before · SMS:** Call link + show-up reminder — prompt: _(empty)_

## Routes / exits

- **Shows and no second call is booked** → Branch 3 · Follow-Up Pending
- **Shows and books a second/closing call** → Branch 4 · Two-Call Close Nurture
- **No-shows** → Branch 2 · First-Call No-Show
- **Reschedules** → Restart Branch 1 around the new appointment
- **Pays or is marked Lost/DQ** → Closed / stop

---

# Branch 2 · First-Call No-Show

**Purpose:** Recover a brand-new prospect who missed the original call before Daniel ever spoke with them.

**Entry trigger:** EOD/Grokbot confirms the original first call was a no-show and no replacement booking exists.

**Total cadence:** 7 emails · 2 texts

## Immediate recovery

- **Day 0 · Email:** First-call no-show recovery 1 — prompt: _(empty)_
- **Day 0 · SMS:** First-call no-show text 1 — prompt: _(empty)_
- **Day 3 · SMS:** First-call no-show text 2 — prompt: _(empty)_
- **Day 5 · Email:** First-call no-show recovery 2 — prompt: _(empty)_
- **Day 12 · Email:** First-call no-show recovery 3 — prompt: _(empty)_
- **Day 30 · Email:** First-call no-show recovery 4 — prompt: _(empty)_

## Long-tail recovery

- **Day 90 · Email:** First-call no-show recovery 5 — prompt: _(empty)_
- **Day 180 · Email:** First-call no-show recovery 6 — prompt: _(empty)_
- **Day 270 · Email:** First-call no-show recovery 7 — prompt: _(empty)_

## Routes / exits

- **Books a first call** → Branch 1 · First-Call Confirmation
- **Replies** → Pause automation for Daniel
- **Pays, opts out, or is marked Lost/DQ** → Closed / stop

---

# Branch 3 · Follow-Up Pending

**Purpose:** Re-loop a prospect Daniel has spoken with when no second/closing call is currently booked.

**Entry trigger:** The first call was held, the lead did not buy, and no second/closing call is booked. Honor any date Daniel promised before starting the generic cadence.

**Total cadence:** 17 emails · up to 5 texts

## Active follow-up

- **Day 0 · Email:** Follow-up pending email 1 — prompt: _(empty)_
- **Day 3 · SMS:** Follow-up pending text 1 — prompt: _(empty)_
- **Day 5 · Email:** Follow-up pending email 2 — prompt: _(empty)_
- **Day 12 · Email:** Follow-up pending email 3 — prompt: _(empty)_
- **Day 17 · SMS:** Follow-up pending text 2 — prompt: _(empty)_
- **Day 21 · Email:** Follow-up pending email 4 — prompt: _(empty)_
- **Day 35 · Email:** Follow-up pending email 5 — prompt: _(empty)_
- **Day 45 · SMS:** Follow-up pending text 3 — prompt: _(empty)_
- **Day 50 · Email:** Follow-up pending email 6 — prompt: _(empty)_
- **Day 70 · Email:** Follow-up pending email 7 — prompt: _(empty)_
- **Day 90 · Email:** Follow-up pending email 8 — prompt: _(empty)_

## Monthly nurture

- **Day 120 · Email:** Monthly nurture 1 — prompt: _(empty)_
- **Day 150 · Email:** Monthly nurture 2 — prompt: _(empty)_
- **Day 180 · Email:** Monthly nurture 3 — prompt: _(empty)_
- **Day 210 · Email:** Monthly nurture 4 — prompt: _(empty)_
- **Day 240 · Email:** Monthly nurture 5 — prompt: _(empty)_
- **Day 270 · Email:** Monthly nurture 6 — prompt: _(empty)_
- **Day 300 · Email:** Monthly nurture 7 — prompt: _(empty)_
- **Day 330 · Email:** Monthly nurture 8 — prompt: _(empty)_
- **Day 360 · Email:** Monthly nurture 9 — prompt: _(empty)_
- **Later, when contextually relevant · SMS · conditional:** Selective later text 4 — prompt: _(empty)_
- **Later, when contextually relevant · SMS · conditional:** Selective later text 5 — prompt: _(empty)_

## Routes / exits

- **Books a second/closing call** → Branch 4 · Two-Call Close Nurture
- **Replies** → Pause automation for Daniel
- **Pays, opts out, or is marked Lost/DQ** → Closed / stop

---

# Branch 4 · Two-Call Close Nurture

**Purpose:** Warm and confirm a prospect between the first conversation and the booked second/closing call.

**Entry trigger:** A second/closing call is booked after Daniel has already spoken with the prospect.

**Total cadence:** 2 emails · 2–3 texts

## Booking

- **Immediately after booking · Email:** Second-call booking + preparation — prompt: _(empty)_
- **Immediately after booking · SMS:** Second-call acknowledgment — prompt: _(empty)_

## Pre-call

- **24 hours before · Email:** Second-call reminder + decision preparation — prompt: _(empty)_
- **24 hours before · SMS · conditional:** Conditional confirmation if unanswered — prompt: _(empty)_
- **15 minutes before · SMS:** Second-call link + reminder — prompt: _(empty)_

## Routes / exits

- **Shows and buys** → Closed / stop
- **Shows and does not buy** → Branch 6 · Post-Second-Call Follow-Up
- **No-shows** → Branch 5 · Second-Call No-Show
- **Reschedules** → Restart Branch 4 around the new appointment
- **Explicitly declines or is marked Lost/DQ** → Lost / stop

---

# Branch 5 · Second-Call No-Show

**Purpose:** Recover a warm prospect Daniel already spoke with who missed the scheduled second/closing call.

**Entry trigger:** EOD/Grokbot confirms the second/closing call was a no-show and no replacement booking exists.

**Total cadence:** 16 emails · up to 5 texts

## Active recovery

- **Day 0 · SMS:** Second-call no-show text 1 — prompt: _(empty)_
- **Day 1 · Email:** Second-call no-show email 1 — prompt: _(empty)_
- **Day 3 · SMS:** Second-call no-show text 2 — prompt: _(empty)_
- **Day 5 · Email:** Second-call no-show email 2 — prompt: _(empty)_
- **Day 10 · Email:** Second-call no-show email 3 — prompt: _(empty)_
- **Day 14 · SMS:** Second-call no-show text 3 — prompt: _(empty)_
- **Day 21 · Email:** Second-call no-show email 4 — prompt: _(empty)_
- **Day 45 · Email:** Second-call no-show email 5 — prompt: _(empty)_
- **Day 75 · Email:** Second-call no-show email 6 — prompt: _(empty)_
- **Day 90 · Email:** Second-call no-show email 7 — prompt: _(empty)_

## Monthly nurture

- **Day 120 · Email:** Monthly nurture 1 — prompt: _(empty)_
- **Day 150 · Email:** Monthly nurture 2 — prompt: _(empty)_
- **Day 180 · Email:** Monthly nurture 3 — prompt: _(empty)_
- **Day 210 · Email:** Monthly nurture 4 — prompt: _(empty)_
- **Day 240 · Email:** Monthly nurture 5 — prompt: _(empty)_
- **Day 270 · Email:** Monthly nurture 6 — prompt: _(empty)_
- **Day 300 · Email:** Monthly nurture 7 — prompt: _(empty)_
- **Day 330 · Email:** Monthly nurture 8 — prompt: _(empty)_
- **Day 360 · Email:** Monthly nurture 9 — prompt: _(empty)_
- **Later, when contextually relevant · SMS · conditional:** Selective later text 4 — prompt: _(empty)_
- **Later, when contextually relevant · SMS · conditional:** Selective later text 5 — prompt: _(empty)_

## Routes / exits

- **Rebooks the second/closing call** → Branch 4 · Two-Call Close Nurture
- **Replies** → Pause automation for Daniel
- **Pays, opts out, or is marked Lost/DQ** → Closed / stop

---

# Branch 6 · Post-Second-Call Follow-Up

**Purpose:** Continue the sales conversation after the second/closing call was held but the prospect did not buy.

**Entry trigger:** The second/closing call was held and the prospect did not purchase or explicitly decline.

**Total cadence:** 17 emails · up to 5 texts

## Active follow-up

- **Day 0 · Email:** Post-second-call email 1 — prompt: _(empty)_
- **Day 2 · SMS:** Post-second-call text 1 — prompt: _(empty)_
- **Day 3 · Email:** Post-second-call email 2 — prompt: _(empty)_
- **Day 7 · Email:** Post-second-call email 3 — prompt: _(empty)_
- **Day 11 · SMS:** Post-second-call text 2 — prompt: _(empty)_
- **Day 14 · Email:** Post-second-call email 4 — prompt: _(empty)_
- **Day 25 · Email:** Post-second-call email 5 — prompt: _(empty)_
- **Day 30 · SMS:** Post-second-call text 3 — prompt: _(empty)_
- **Day 40 · Email:** Post-second-call email 6 — prompt: _(empty)_
- **Day 60 · Email:** Post-second-call email 7 — prompt: _(empty)_
- **Day 90 · Email:** Post-second-call email 8 — prompt: _(empty)_

## Monthly nurture

- **Day 120 · Email:** Monthly nurture 1 — prompt: _(empty)_
- **Day 150 · Email:** Monthly nurture 2 — prompt: _(empty)_
- **Day 180 · Email:** Monthly nurture 3 — prompt: _(empty)_
- **Day 210 · Email:** Monthly nurture 4 — prompt: _(empty)_
- **Day 240 · Email:** Monthly nurture 5 — prompt: _(empty)_
- **Day 270 · Email:** Monthly nurture 6 — prompt: _(empty)_
- **Day 300 · Email:** Monthly nurture 7 — prompt: _(empty)_
- **Day 330 · Email:** Monthly nurture 8 — prompt: _(empty)_
- **Day 360 · Email:** Monthly nurture 9 — prompt: _(empty)_
- **Later, when contextually relevant · SMS · conditional:** Selective later text 4 — prompt: _(empty)_
- **Later, when contextually relevant · SMS · conditional:** Selective later text 5 — prompt: _(empty)_

## Routes / exits

- **Books another decision call** → Branch 4 · Two-Call Close Nurture
- **Replies** → Pause automation for Daniel
- **Pays, opts out, or is marked Lost/DQ** → Closed / stop

---

# Open questions

- Exact content/prompt for every email and SMS touch.
- Which two later contextual SMS opportunities should be used in Branches 3, 5, and 6.
- Final sending system for each channel (Gmail versus GoHighLevel/SendBlue).
- Approval threshold for moving from review-first drafts to automatic sending.

