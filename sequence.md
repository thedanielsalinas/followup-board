# ScaleDaycares – Follow-Up Email Sequence Roadmap

## A · How a lead enters the Follow-Up Board

**Entry reasons**
- Follow-up or two-call close no-show → Warm, next-day touch
- Call ended with a follow-up date (said on the call, or Daniel types it in the EOD; 'next week' = next Monday, 'next month' = the 1st, none said = call + 7 days)
- Two-call close or follow-up call held, no close, no new date

**Sources:** Fathom recording/recap, EOD doc, Google Calendar → Admin bot → Pipeline (Follow-Up Board, Warm, Next Touch date)

**Exits (not in the sequence)**
- Closed (Closed tab or payment confirmation email)
- Lost/DQ (only if Daniel writes it)
- Hot (call booked → Upcoming Calls)

## B · Email sequence

### Fast follow-up (every 5 days, gap +5 days)
- Email 1 - Day 0 - Fast follow-up — prompt: _(empty)_
- Email 2 - Day 5 - Fast follow-up — prompt: _(empty)_
- Email 3 - Day 10 - Fast follow-up — prompt: _(empty)_

### Check-in (every 14 days, gap +14 days)
- Email 4 - Day 24 - Check-in — prompt: _(empty)_
- Email 5 - Day 38 - Check-in — prompt: _(empty)_

### Monthly nurture (every 30 days, gap +30 days)
- Email 6 - Day 68 - Monthly nurture — prompt: _(empty)_
- Email 7 - Day 98 - Monthly nurture — prompt: _(empty)_
- Email 8 - Day 128 - Monthly nurture — prompt: _(empty)_
- Email 9 - Day 158 - Monthly nurture — prompt: _(empty)_
- Email 10 - Day 188 - Monthly nurture — prompt: _(empty)_
- Email 11 - Day 218 - Monthly nurture — prompt: _(empty)_
- Email 12 - Day 248 - Monthly nurture — prompt: _(empty)_
- Email 13 - Day 278 - Monthly nurture — prompt: _(empty)_
- Email 14 - Day 308 - Monthly nurture — prompt: _(empty)_
- Email 15 - Day 338 - Monthly nurture — prompt: _(empty)_
- Email 16 - Day 368 - Monthly nurture — prompt: _(empty)_
- Email 17 - Day 398 - Monthly nurture — prompt: _(empty)_

**End:** Gone Cold - no reply after the full sequence

## C · Branches / rules
- Lead replies → touch count resets to 0, restart Email 1 cadence, next touch = reply + 5 days. Daniel answers replies himself.
- New call booked → leaves the sequence → Hot (Upcoming Calls); after the call, re-enters fresh.
- Daniel says 'cold' → Gone Cold immediately. Daniel says 'Lost' / 'no follow-up' → Lost.
- Pays → Closed, stops everything.

## D · How each email is made and sent
1. Each morning: find leads due today (green) or overdue (red) on the Pipeline Follow-Up Board
2. Pull context: Fathom recap, objection, 'Where It Stands', center name, past thread
3. Write a personalized email from that stage's prompt
4. Send as a REPLY in the lead's existing Gmail thread from daniel.salinas@scaledaycares.com (green 'pipe' label)
5. Pipeline updates itself: Last Touch, Touches +1, Next Touch; row goes uncolored
6. Nightly check catches replies

- Approval: Daniel reviews drafts at first, then auto-send once trusted
- Writer: Grok (default) vs ChatGPT (side-by-side test pending)

## E · Text lane
SMS / iMessage via GoHighLevel - waiting on A2P approval
- Text - TBD (Day 0) (alongside Email 1)
- Text - TBD (Day 5) (alongside Email 2)
- Text - TBD (Day 10) (alongside Email 3)

## F · Open questions
- Which emails also get a text?
- Email 1 wording differs by entry reason (no-show vs undecided)?
- Send from Gmail or GHL sub-account?
- When to switch from approve-first to auto-send?
