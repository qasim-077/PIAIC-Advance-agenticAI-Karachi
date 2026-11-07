# Lab 1: a real job, checked — 90-minute classroom guide

**Session clock 1:30 – 3:00** (the second half of the 3-hour Chapter 1 session).
Interactive version with checklists, brief builder and timers: [`lab.html`](../lab.html).

Adapted from [Lab 1: a real job, checked](https://agentfactory2.panaversity.org/ai-worker-paradigm/from-chatbots-to-ai-workers/lab/), Chapter 1 of Panaversity's *The AI Agent Factory*, Second Edition. Every name, number and company in the lab is invented. The answer keys hold the answers; this guide does not repeat them.

| Clock | Min | Block |
| --- | --- | --- |
| 1:30 – 1:35 | 5 | [L0 Setup and the job](#l0-setup-and-the-job-5-min) |
| 1:35 – 1:45 | 10 | [L1 The brief and the check loop](#l1-the-brief-and-the-check-loop-10-min) |
| 1:45 – 2:00 | 15 | [Task 1. What we owe](#task-1-what-we-owe-15-min) |
| 2:00 – 2:20 | 20 | [Task 2. A spreadsheet for Friday](#task-2-a-spreadsheet-for-friday-20-min) |
| 2:20 – 2:28 | 8 | [Task 3. What is due by Friday](#task-3-what-is-due-by-friday-8-min) |
| 2:28 – 2:36 | 8 | [Task 4. Match the POs](#task-4-match-the-pos-8-min) |
| 2:36 – 2:44 | 8 | [Task 5. A doc for the controller](#task-5-a-doc-for-the-controller-8-min) |
| 2:44 – 2:52 | 8 | [Task 6. Which surface for which job](#task-6-which-surface-for-which-job-8-min) |
| 2:52 – 2:58 | 6 | [Task 9. Where each result lives](#task-9-where-each-result-lives-6-min) |
| 2:58 – 3:00 | 2 | [Wrap-up and homework](#wrap-up-and-homework-2-min) |

---

## L0 Setup and the job (5 min)

- Sign in to **Claude** or **ChatGPT**. A free plan works for everything done in class.
- Download the lab kit **[`brightline-lab-ch01.zip`](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01.zip)** and unzip it: `README.md`, `LAB.md`, `inputs.zip` (15 invoice PDFs + `purchase-orders.csv`).
- Give the AI **only** `inputs.zip` and, at each check, that task's answer key. **Never** upload `LAB.md` or `README.md`: they link every answer key.
- Open **one new conversation**. Tasks 1–6 and Task 9 all run in it.

**The job**

- You work in accounts payable (AP) at **Brightline Wholesale Supply**, Columbus, Ohio.
- Today is **Wednesday, September 30, 2026**. Brightline pays its bills this **Friday, October 2**.
- **15 vendor invoices** came in during September.
- Midwest Packaging's invoice **4471 was paid on September 25**. No other invoice is paid yet.

> 🎤 **Instructor:** walk the room — everyone signed in, kit unzipped, one fresh conversation. Explain why `LAB.md` stays out of the chat: it links the keys.

## L1 The brief and the check loop (10 min)

Before you send a brief, decide what kind of answer you expect: **a number, a list or a file**. Write it under four headings:

- **Outcome** — what you want back
- **Context** — who it is for, and from which sources
- **Format** — in what shape
- **Constraints** — what the result must keep or avoid, and how far the AI may go without asking you

A teacher's brief, for a different job:

```text
Outcome:     How many students passed this week's quiz, out of how
             many took it.
Context:     quiz-scores.csv, attached. The pass mark is 60 out of
             100.
Format:      One line with the two numbers, then a list of the
             students who did not pass.
Constraints: Count only. If a score is missing or unclear, list it and
             ask me. Do not change the file.
```

**Every task is the same loop:** 1) send the brief, read the answer → 2) download the task's answer key → 3) attach the key and send the check prompt → 4) missed a check? fix your brief, have the AI correct its work, and check again.

### The check prompt

```text
Outcome:     The task you just did for me in this conversation, graded
             against the attached answer key: Passed or Missed for
             each of its checks.
Context:     Your answers in this conversation, and the attached
             answer key.
Format:      A table: the check, Passed or Missed, your own words that
             show it, and one line on why. Then how many passed.
Constraints: Grade only. Do not redo the task, and do not suggest a
             better brief. With no quote, mark the check Missed. If a
             check is about what I did, ask me.
```

> 🎤 **Instructor:** demo the teacher example and one check loop live. Link back to 1.2: the brief, not a mode button, routes the box to working.

## Task 1. What we owe (15 min)

**Your manager asks:** "How much do we owe on these invoices, as of Wednesday, September 30, 2026? And remember, invoice 4471 was paid on September 25. Nothing else is paid yet."

1. Write your brief. The AI knows nothing of "The job", so put the facts it needs under Context.
2. Send it with `inputs.zip` attached.
3. **Check it:** [Task 1 answer key](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-1.md) + the check prompt.

**Give your manager:** one total. **Checkpoint:** checks 1–3 passed, and you read the key yourself.
**Theory:** 1.1 — a task with a clear finish, not a message you finish by hand.

> 🎤 **Instructor:** most common miss — the date and "4471 is paid" are missing from Context. When totals differ, have two students read their briefs aloud.

## Task 2. A spreadsheet for Friday (20 min)

**Your manager asks:** "Put these invoices in a spreadsheet I can check before Friday. I'll want to open it again on Monday."

1. Send your brief. The AI already has the files.
2. When it answers, send: `Which files did you create that you did not deliver to me?`
3. Download the spreadsheet and open it (Excel, Numbers or Google Sheets if you see formulas or blanks).
4. Send this as it is, attaching nothing: `Add a column that shows how many days each bill has until it is due, as of Wednesday, September 30, 2026. Late bills get a negative number.`
5. Download the new spreadsheet and open it.
6. **Check it:** [Task 2 answer key](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-2.md) + the check prompt.

**Give your manager:** a spreadsheet file with the new column, that you have opened. **Checkpoint:** checks 4–8 passed, and you know where the spreadsheet is.
**Theory:** 1.3 — a revision builds on files already in the workspace. 1.4 — files never delivered go when the sandbox goes.

## Task 3. What is due by Friday (8 min)

**Your manager asks:** "Which of these invoices are late, or due by Friday, October 2? And what do they come to in total?"

Send your brief, then check with the [Task 3 answer key](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-3.md).
**Give your manager:** a list of bills, with their total. **Checkpoint:** check 9 passed.

## Task 4. Match the POs (8 min)

**Your manager asks:** "Purchasing's PO list is in that zip too. Do the invoices match what we ordered? For any that don't, tell me why."

Send your brief, then check with the [Task 4 answer key](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-4.md).
**Give your manager:** each invoice that does not match, with the reason. **Checkpoint:** checks 10 and 11 passed.

## Task 5. A doc for the controller (8 min)

**Your manager asks:** "Write the Friday list up as a one-page doc for our controller, the person who runs Brightline's accounts. List each bill due by Friday, October 2, 2026, with its vendor, invoice number and amount, and the total. Don't share it with anyone. I'll send it myself."

1. Send your brief.
2. Open the doc — Claude: the **Artifacts** section in the sidebar. ChatGPT: it stays in this conversation.
3. **Check it:** [Task 5 answer key](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-5.md) + the check prompt.

**Give your manager:** a doc you can open again. **Checkpoint:** checks 12–14 passed, and you know where the doc is.
**Theory:** 1.4 artifact persistence; 1.5 where each vendor keeps results.

## Task 6. Which surface for which job (8 min)

**Your manager asks:** "We want to hand more AP work to AI. For each of these six jobs, tell me how far we can hand it over, and how it should run."

For each job decide **the rung** (chatbot / agent / AI Worker), **the surface** (chat / task / standing worker) and **what starts it** (you / a schedule). You decide; the AI only records. Send this printed brief as it is:

```text
Outcome:     For each of six AP jobs, my decision: which rung of the
             ladder of interaction it sits on, which surface it needs,
             and what starts it.
Context:     The rungs: chatbot (you send a message, and get a reply),
             agent (you delegate a task, and get a finished output),
             AI Worker (you hand over a role, with recurring results).
             The surfaces: chat (a question, a draft or an explanation
             I read once), task (a clear outcome that comes back as a
             finished result), standing worker (ongoing work that
             continues between conversations). What starts it: me, or
             a schedule (the same task, started again at a set time).
             The jobs: 1. Explain what "2/10 net 30" means on an
             invoice. 2. Draft a polite reply to a vendor who asks
             when they will be paid. 3. Turn this week's invoice PDFs
             into one spreadsheet I can check. 4. Match this week's
             invoices to the PO list, and tell me which do not match.
             5. Every Monday at 7:00 a.m., build the unpaid-bills
             report and leave it for me. 6. Watch the AP inbox all
             day, answer routine vendor questions, and pass anything
             unusual to Maria.
Format:      First show me the rungs, the surfaces and what starts
             the work, with their meanings. Then show all six jobs as
             a numbered list, and ask for "the rung, the surface, and
             what starts it" for each, in one reply. At the end, a
             table of my answers.
Constraints: Ask only. Do not answer for me, and do not tell me
             whether I am right. Record my answers as I give them.
```

Check with the [Task 6 answer key](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-6.md). **Checkpoint:** check 15 passed.
**Theory:** 1.1 the ladder; 1.5 "Which surface for which job".

## Task 9. Where each result lives (6 min)

**Your manager asks:** "Before Monday, tell me where each of these results is kept, and whether it will still be there."

> **In class, skip result 4** — it is the Task 8 file, which is homework.

Go back to your first conversation and send this printed brief:

```text
Outcome:     My decision for each of my results: where it is kept, and
             whether it stays or goes when the AI's work is done.
Context:     The places: my account or workspace (the conversations,
             and the Artifacts section on Claude), the AI's workspace
             (the temporary computer where the AI's work runs), my own
             computer (my folders and files), a connected app (such as
             Google Drive). The results: 1. The Task 1 total, as text
             in this conversation. 2. The Task 2 spreadsheet, as a
             file in this conversation. 3. The Task 5 doc. 4. The
             Friday file I saved in my Brightline AP folder in Task 8.
             5. Any file you made in Task 2 and never delivered to me.
Format:      First show me the places and their meanings below. Then
             show all five results as a numbered list, each with what
             it is and where it was made, and ask for "the place, then
             stays or goes" for each, in one reply. At the end, a
             table of my answers.
Constraints: Ask only. Do not answer for me, and do not tell me
             whether I am right. If I did not do Task 8, skip result
             4.
```

Check with the [Task 9 answer key](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-9.md). **Checkpoint:** check 18 passed.
**Theory:** 1.4 — what survives, the machine or the record?

## Wrap-up and homework (2 min)

- **Task 7. The other AI vendor (homework, 20 min):** run your final Task 1–5 briefs unchanged on the other vendor; check each; note every change and why.
- **Task 8. Save it where you will find it Monday (homework, 15–25 min):** in a desktop app, with an empty `Brightline AP` folder, save `friday-run-2026-10-02.xlsx`. [Task 8 key](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-8.md) (checks 16–17). Then answer result 4 of Task 9.
- **Task 10. What survived (tomorrow, 10 min):** look for every result, then read [the answers for Tasks 7 and 10](https://github.com/panaversity/agentfactory-v2-resources/blob/main/labs/brightline-lab-ch01/answer-key/answer-key-port.md).
- **Part B, optional (~1 hour):** Tasks 11–14 — close the laptop, a weekly checklist, the doc's version history, the AI inside Google Sheets. Keys: [11](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-11.md) · [12](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-12.md) · [13](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-13.md) · [14](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-14.md). Some need a paid plan or a Google account. Full steps on [the book's lab page](https://agentfactory2.panaversity.org/ai-worker-paradigm/from-chatbots-to-ai-workers/lab/).
- **Apply it to your vertical:** take real files from the work you know best, write a brief, run it; list five jobs an AI could take and place each on the ladder with its surface.

## If something goes wrong

- **The AI will not take `inputs.zip`.** Unzip it and upload the files inside instead.
- **The AI will not take an answer key, or uploads ran out.** Open the key, copy its text, paste it under the check prompt.
- **Wrong key attached.** Say so, attach the right one, send the check prompt again.
- **Your plan cannot work on files.** Do the tasks anyway, and see what the AI could and could not do.
- **Daily limit ran out.** Your conversation will still be there tomorrow. Carry on from the next task.
