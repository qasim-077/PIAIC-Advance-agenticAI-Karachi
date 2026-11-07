/* Lab 1 — step-by-step classroom lab. Renders every step from STEPS, keeps ticks,
   "done" marks and brief drafts in localStorage (via window.piaicStore). */
(function () {
  const store = window.piaicStore || { get: (k, d) => d, set: () => {} };
  const KEY = 'piaic-lab1';
  let state = Object.assign({ checks: {}, done: {}, briefs: {} }, store.get(KEY, {}));
  const save = () => store.set(KEY, state);

  const BOOK = 'https://agentfactory2.panaversity.org/ai-worker-paradigm/from-chatbots-to-ai-workers/';
  const KEYURL = n => `https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01-key-task-${n}.md`;
  const KIT = 'https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01.zip';
  const PORT = 'https://github.com/panaversity/agentfactory-v2-resources/blob/main/labs/brightline-lab-ch01/answer-key/answer-key-port.md';

  const CHECK_PROMPT = `Outcome:     The task you just did for me in this conversation, graded
             against the attached answer key: Passed or Missed for
             each of its checks.
Context:     Your answers in this conversation, and the attached
             answer key.
Format:      A table: the check, Passed or Missed, your own words that
             show it, and one line on why. Then how many passed.
Constraints: Grade only. Do not redo the task, and do not suggest a
             better brief. With no quote, mark the check Missed. If a
             check is about what I did, ask me.`;

  const TEACHER_EXAMPLE = `Outcome:     How many students passed this week's quiz, out of how
             many took it.
Context:     quiz-scores.csv, attached. The pass mark is 60 out of
             100.
Format:      One line with the two numbers, then a list of the
             students who did not pass.
Constraints: Count only. If a score is missing or unclear, list it and
             ask me. Do not change the file.`;

  const TASK6_BRIEF = `Outcome:     For each of six AP jobs, my decision: which rung of the
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
             whether I am right. Record my answers as I give them.`;

  const TASK9_BRIEF = `Outcome:     My decision for each of my results: where it is kept, and
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
             4.`;

  const FILES_Q = 'Which files did you create that you did not deliver to me?';
  const COLUMN_ASK = 'Add a column that shows how many days each bill has until it is due, as of Wednesday, September 30, 2026. Late bills get a negative number.';

  /* ---------- sample student inputs: one model brief per task the students write.
     They state only facts from "The job" and good AP practice; the answers come from the AI and the keys. ---------- */
  const SAMPLES = {
    'task-1': {
      outcome: 'The total Brightline still owes on the attached vendor invoices,\nas of Wednesday, September 30, 2026: one number.',
      context: 'inputs.zip, attached, holds 15 invoice PDFs and a PO list (ignore\nthe PO list for now). I work in accounts payable at Brightline\nWholesale Supply, and this is for my manager. Midwest Packaging\'s\ninvoice 4471 was paid on September 25, 2026. No other invoice is\npaid yet.',
      format: 'The total first, on one line. Then a table of the invoices you\ncounted: vendor, invoice number, invoice date, amount. Then a list\nof any invoice you left out, with the reason.',
      constraints: 'Read every PDF, and take each amount from it; do not guess. Leave\nout invoice 4471. If an invoice looks like a copy of another, or\nits total does not match its lines, do not count it: list it and\nask me. Do not change any file.'
    },
    'task-2': {
      outcome: 'One spreadsheet file of all 15 invoices that my manager can check\nbefore Friday, October 2, 2026, and open again on Monday. Done when\nevery invoice is a row and every amount matches its PDF.',
      context: 'The 15 invoice PDFs you already have from inputs.zip. Today is\nWednesday, September 30, 2026. Invoice 4471 was paid on September\n25, 2026. No other invoice is paid yet.',
      format: 'An .xlsx file I can download. One row per invoice, with columns:\nvendor, invoice number, invoice date, payment terms, due date, PO\nnumber, amount, status (Paid, Unpaid or Check), note. A total of\nthe unpaid amounts at the bottom. Then, in the chat, up to three\nlines on anything I should look at.',
      constraints: 'Take every value from the PDFs; do not guess. Keep 4471 in the\nsheet, marked Paid. Mark any copy of another invoice, or any\ninvoice whose total does not match its lines, as Check, with a\nshort note. Use plain values, so the file opens anywhere. Do not\nchange the source files.'
    },
    'task-3': {
      outcome: 'The invoices that are late, or due on or before Friday, October 2,\n2026, and what they come to in total.',
      context: 'The 15 invoices, and the spreadsheet you made in this\nconversation. Today is Wednesday, September 30, 2026. Invoice 4471\nwas paid on September 25, 2026. No other invoice is paid yet.',
      format: 'A table: vendor, invoice number, due date, days until due\n(negative if late), amount. Late bills first. Then one line with\nthe total.',
      constraints: 'Leave out any bill already paid, and any copy of a bill already\non the list. If a due date or payment term is unclear, list that\ninvoice under the table and ask me. Do not change any file.'
    },
    'task-4': {
      outcome: 'For every invoice, whether it matches the purchase order it was\nbilled against. For each one that does not, the reason.',
      context: 'The 15 invoices, and Purchasing\'s PO list, purchase-orders.csv,\nboth in inputs.zip. Each PO line has a PO number, vendor, item,\nquantity, unit price and line total.',
      format: 'First one line: how many match, and how many do not. Then a table\nof the ones that do not: invoice number, vendor, PO number, the\nline that differs, what the PO says, what the invoice says.',
      constraints: 'Compare vendor, items, quantities, unit prices and totals, line\nby line. If an invoice has no PO number, or its PO is not in the\nlist, say so; do not guess one. Report only. Do not change any\nfile.'
    },
    'task-5': {
      outcome: 'A one-page document for Brightline\'s controller, that I can open\nagain later: each bill due by Friday, October 2, 2026, and their\ntotal.',
      context: 'The Friday list you made in this conversation. The controller is\nthe person who runs Brightline\'s accounts. Invoice 4471 is\nalready paid.',
      format: 'A document, not text in the chat. A title, and the date\nWednesday, September 30, 2026. A table: vendor, invoice number,\namount. The total under the table. One page.',
      constraints: 'Use only the bills on the Friday list. Do not share or send the\ndoc to anyone; I will send it myself. Tell me where the doc is\nsaved, so I can open it again.'
    }
  };

  /* Tasks 6 and 9: the student's input is their reply. A fill-in template, not the answers. */
  const REPLY_6 = `1. Rung: ____  Surface: ____  Starts it: me / a schedule
2. Rung: ____  Surface: ____  Starts it: me / a schedule
3. Rung: ____  Surface: ____  Starts it: me / a schedule
4. Rung: ____  Surface: ____  Starts it: me / a schedule
5. Rung: ____  Surface: ____  Starts it: me / a schedule
6. Rung: ____  Surface: ____  Starts it: me / a schedule`;
  const REPLY_9 = `1. Place: ____  Stays or goes: ____
2. Place: ____  Stays or goes: ____
3. Place: ____  Stays or goes: ____
4. (skip: Task 8 is homework)
5. Place: ____  Stays or goes: ____`;

  /* Everything the student types in each task, in order. */
  const SENDS = {
    'task-1': ['Your brief, with <code>inputs.zip</code> attached', 'The check prompt, with Task 1\'s key attached'],
    'task-2': ['Your brief (attach nothing)', `<q>${FILES_Q}</q>`, `<q>${COLUMN_ASK}</q>`, 'The check prompt, with Task 2\'s key attached'],
    'task-3': ['Your brief', 'The check prompt, with Task 3\'s key attached'],
    'task-4': ['Your brief', 'The check prompt, with Task 4\'s key attached'],
    'task-5': ['Your brief', 'The check prompt, with Task 5\'s key attached'],
    'task-6': ['The printed brief, as it is', 'Your reply: all six jobs in one message (template below)', 'The check prompt, with Task 6\'s key attached'],
    'task-9': ['The printed brief, as it is, in your first conversation', 'Your reply: every result in one message (template below)', 'The check prompt, with Task 9\'s key attached']
  };

  /* ---------- the ten steps (minutes are offsets on the 3-hour session clock) ---------- */
  const STEPS = [
    {
      id: 'setup', num: 'L0', title: 'Setup and the job', min: 5, from: 90,
      intro: `<div class="facts">
          <div class="fact"><b>Brightline Wholesale Supply</b><span>Columbus, Ohio. You work in accounts payable (AP), the team that pays the bills.</span></div>
          <div class="fact"><b>Wed, Sep 30, 2026</b><span>Today. Brightline pays its bills this <b style="display:inline;font-size:inherit">Friday, October 2</b>.</span></div>
          <div class="fact"><b>15 invoices</b><span>Came in during September, plus Purchasing's PO list.</span></div>
          <div class="fact"><b>Only 4471 is paid</b><span>Midwest Packaging's invoice 4471 was paid on September 25. Nothing else is paid yet.</span></div>
        </div>`,
      todo: [
        'Sign in to <b>Claude</b> or <b>ChatGPT</b>. A free plan works for everything in class today.',
        `Download the lab kit <a href="${KIT}"><code>brightline-lab-ch01.zip</code></a> and unzip it. You get <code>README.md</code>, <code>LAB.md</code> and <code>inputs.zip</code> (15 invoice PDFs + <code>purchase-orders.csv</code>).`,
        'Rule: give the AI <b>only</b> <code>inputs.zip</code> and, at each check, that task\'s answer key. <b>Never</b> upload <code>LAB.md</code> or <code>README.md</code>: they link every answer key.',
        'Open <b>one new conversation</b>. Tasks 1 to 6 and Task 9 all run in it, so keep this tab open.'
      ],
      teach: 'Walk the room for the first two minutes: everyone signed in, kit unzipped, one fresh conversation open. Explain <i>why</i> LAB.md stays out of the chat: it links the answer keys, so an AI that reads it can "pass" without doing the work. Read "The job" aloud; students will need these facts in their briefs, because the AI knows none of them.',
      concept: `The operating rule from <a href="theory.html#ladder">1.1</a>: <b>Humans define intent. AI Workers execute. Humans verify outcomes.</b> Every task today ends with you verifying.`
    },
    {
      id: 'brief', num: 'L1', title: 'The brief and the check loop', min: 10, from: 95,
      intro: `<p>Before you send any brief, decide what kind of answer you expect: <b>a number, a list or a file</b>. Then write it under four headings:</p>
        <div class="table-wrap"><table><thead><tr><th>Heading</th><th>What goes there</th></tr></thead><tbody>
          <tr><td><b>Outcome</b></td><td>What you want back</td></tr>
          <tr><td><b>Context</b></td><td>Who it is for, and from which sources</td></tr>
          <tr><td><b>Format</b></td><td>In what shape</td></tr>
          <tr><td><b>Constraints</b></td><td>What the result must keep or avoid, and how far the AI may go without asking you</td></tr>
        </tbody></table></div>
        <p class="muted" style="margin-top:6px">A teacher's brief, for a different job:</p>
        ${codeBlock(TEACHER_EXAMPLE)}
        <h3 class="sub" style="margin-top:6px">Every task is the same loop</h3>
        <div class="loop">
          <div><b>Send the brief</b>and read the answer.</div>
          <div><b>Download the key</b>one click, from the task card.</div>
          <div><b>Attach + check</b>attach the key, send the check prompt.</div>
          <div><b>Missed a check?</b>fix your brief, have the AI correct it, check again.</div>
        </div>
        <h3 class="sub" style="margin-top:6px" id="check-prompt">The check prompt (one prompt checks every task)</h3>
        ${codeBlock(CHECK_PROMPT)}`,
      todo: [
        'Read the teacher example and spot the four headings.',
        'Copy the check prompt somewhere handy (a notes app). You will send it after every task.',
        'If the AI asks you a question, answer briefly, and ignore its offers to do more.'
      ],
      teach: 'Demo live: paste the teacher example into a chat with a tiny made-up CSV, then show the check loop once. Stress that the check prompt says "Grade only" — the AI must quote its own words or mark the check Missed. Ask: "Why is a brief better than a one-line question?" (Lesson 1.2: the brief, not a mode button, tells the box to <i>work</i> instead of <i>answer</i>.)',
      concept: `<a href="theory.html#textbox">1.2 The same text box</a>: a clear outcome, context, format and constraints route the request to <b>working</b>; an unclear one usually gets a chat answer.`
    },
    {
      id: 'task-1', num: 'T1', title: 'What we owe', min: 15, from: 105, key: 1, checks: 'Task 1\'s three checks (1–3) passed, and you read the key yourself.',
      ask: 'How much do we owe on these invoices, as of Wednesday, September 30, 2026? And remember, invoice 4471 was paid on September 25. Nothing else is paid yet.',
      todo: [
        'In your one conversation, write the brief below. The AI knows nothing of "The job" or your manager, so put the facts it needs under Context.',
        'Send the brief with <code>inputs.zip</code> attached.',
        'Download Task 1\'s answer key, attach it, and send the check prompt.',
        'Missed a check? Fix the brief, ask the AI to correct its work, and check again.'
      ],
      builder: {
        outcome: 'What single thing comes back? Is it a number, a list or a file?',
        context: 'Which files? As of which date? What is already paid? The AI only knows what you write here.',
        format: 'How do you want the answer shaped so you can check it, e.g. the total and what it was built from?',
        constraints: 'What must it leave out? What should it do with anything unclear or unusual: guess, or list it and ask you?'
      },
      give: 'one total.',
      teach: 'Most common miss: the date and "4471 is paid" are missing from Context, because students assume the AI read the lab. When totals differ across the room, ask two students to read their briefs aloud — the difference is almost always in Context or Constraints. Do not announce the right total; the key does that.',
      concept: `<a href="theory.html#ladder">1.1 The ladder</a>: this is a <b>task</b> with a clear finish, delegated to an agent — not a message you finish by hand like Maria did on Monday.`
    },
    {
      id: 'task-2', num: 'T2', title: 'A spreadsheet for Friday', min: 20, from: 120, key: 2, checks: 'Checks 4 to 8 passed, and you know where the spreadsheet is: in the chat, on your computer, or in a connected app such as Google Drive.',
      ask: 'Put these invoices in a spreadsheet I can check before Friday. I\'ll want to open it again on Monday.',
      todo: [
        'Send your brief. The AI already has the files, so attach nothing.',
        `When it answers, send: <q>${FILES_Q}</q> While it works, an AI can make files you never see. This makes it list them — that is its word, which you check.`,
        'Download the spreadsheet and open it. If it shows formulas or blank cells, open it in Excel, Numbers or Google Sheets.',
        `Your manager adds a request. Send it as it is, and attach nothing: <q>${COLUMN_ASK}</q>`,
        'Download the new spreadsheet and open it.',
        'Download Task 2\'s answer key, attach it, and send the check prompt.'
      ],
      extra: () => `<div class="grid g2">${codeBlock(FILES_Q)}${codeBlock(COLUMN_ASK)}</div>`,
      builder: {
        outcome: 'Your manager wants a file, not a summary. Say so, and say what "done" looks like.',
        context: 'Who opens it, and when (before Friday, again on Monday)? Which sources? Which facts from Task 1 still matter?',
        format: 'File type, one row per what, and which columns your manager needs to check the bills.',
        constraints: 'What must the values match? How should paid or doubtful bills show? May it change the source files?'
      },
      give: 'a spreadsheet file with the new column, that you have opened.',
      teach: 'Two teaching moments. (1) The follow-up column works <i>without re-uploading</i> — files from earlier steps are still in the AI\'s workspace (1.3). (2) Read out a few answers to the files question: scratch files the AI never delivered live only in its sandbox and are wiped with it (1.4/1.5). Ask: "Will this spreadsheet be there on Monday? Where exactly?"',
      concept: `<a href="theory.html#runs">1.3 Where the work runs</a>: a revision builds on files already in the execution environment. <a href="theory.html#cep">1.4</a>: a file that was never delivered is not saved — it goes when the sandbox goes.`
    },
    {
      id: 'task-3', num: 'T3', title: 'What is due by Friday', min: 8, from: 140, key: 3, checks: 'Check 9 passed.',
      ask: 'Which of these invoices are late, or due by Friday, October 2? And what do they come to in total?',
      todo: ['Write and send your brief.', 'Download Task 3\'s answer key, attach it, and send the check prompt.'],
      builder: {
        outcome: 'A list, plus one total. Which bills belong in it: late ones, ones due by which date?',
        context: 'As of which date? What is already paid? Can it reuse the spreadsheet from Task 2?',
        format: 'Which details per bill let your manager check it quickly? Where does the total go?',
        constraints: 'What must be left out? What if a due date or payment term is unclear?'
      },
      give: 'a list of bills, with their total.',
      teach: 'Watch for students who drop the "late" half of the ask and only list bills due this week, or who forget that 4471 is already paid. Short task: if someone finishes early, have them compare this list with the days-until-due column from Task 2.',
      concept: `<a href="theory.html#textbox">1.2</a>: same box, same files — the brief alone decides whether you get a paragraph or a checked list.`
    },
    {
      id: 'task-4', num: 'T4', title: 'Match the POs', min: 8, from: 148, key: 4, checks: 'Checks 10 and 11 passed.',
      ask: 'Purchasing\'s PO list is in that zip too. Do the invoices match what we ordered? For any that don\'t, tell me why.',
      todo: ['Write and send your brief.', 'Download Task 4\'s answer key, attach it, and send the check prompt.'],
      builder: {
        outcome: 'Which invoices do not match their purchase order, each with the reason.',
        context: 'Which file is the PO list? What links an invoice to its PO?',
        format: 'One line or row per mismatch: invoice, PO, what differs.',
        constraints: 'What should it compare (items, quantities, prices, totals)? What if it cannot find a PO? It should not change any file.'
      },
      give: 'each invoice that does not match, with the reason.',
      teach: 'Ask the class: "Is a reason like <i>doesn\'t match</i> good enough for your manager?" Push for specific reasons (which line, which number). This is classic agent work: multi-step, it can check its own result before you see it.',
      concept: `<a href="theory.html#runs">1.3</a>: multi-step work becomes normal — the agent reads, compares and checks before it answers.`
    },
    {
      id: 'task-5', num: 'T5', title: 'A doc for the controller', min: 8, from: 156, key: 5, checks: 'Checks 12 to 14 passed, and you know where the doc is.',
      ask: 'Write the Friday list up as a one-page doc for our controller, the person who runs Brightline\'s accounts. List each bill due by Friday, October 2, 2026, with its vendor, invoice number and amount, and the total. Don\'t share it with anyone. I\'ll send it myself.',
      todo: [
        'Write and send your brief.',
        'Open the doc. On <b>Claude</b>, it is in the <b>Artifacts</b> section in the sidebar. On <b>ChatGPT</b>, it stays in this conversation: open it from there. Got a download instead? Download it and open it.',
        'Download Task 5\'s answer key, attach it, and send the check prompt.'
      ],
      builder: {
        outcome: 'A document you can open again — not just text in the chat.',
        context: 'Who reads it, and which list from this conversation does it use?',
        format: 'One page. Which fields per bill, and the total.',
        constraints: 'Who may it be shared with? What must it not do on its own?'
      },
      give: 'a doc you can open again.',
      teach: 'Have two students show where their doc lives — one on Claude, one on ChatGPT. Same request, different home. Ask: "If you close this chat, can you still open the doc next month?" (On Claude, artifacts are collected in the sidebar; on ChatGPT it lives in the conversation.)',
      concept: `<a href="theory.html#cep">1.4 Artifact persistence</a>: a result is only saved when it is in a place you can get it back from. <a href="theory.html#tools">1.5</a> shows where each vendor keeps it.`
    },
    {
      id: 'task-6', num: 'T6', title: 'Which surface for which job', min: 8, from: 164, key: 6, checks: 'Check 15 passed.',
      ask: 'We want to hand more AP work to AI. For each of these six jobs, tell me how far we can hand it over, and how it should run.',
      intro: `<ol style="margin:0;padding-left:22px">
          <li>Explain what "2/10 net 30" means on an invoice.</li>
          <li>Draft a polite reply to a vendor who asks when they will be paid.</li>
          <li>Turn this week's invoice PDFs into one spreadsheet I can check.</li>
          <li>Match this week's invoices to the PO list, and tell me which do not match.</li>
          <li>Every Monday at 7:00 a.m., build the unpaid-bills report and leave it for me.</li>
          <li>Watch the AP inbox all day, answer routine vendor questions, and pass anything unusual to Maria.</li>
        </ol>
        <div class="grid g3">
          <div class="fact"><b>The rung</b><span>Chatbot (message → reply), agent (task → finished output), AI Worker (role → recurring results).</span></div>
          <div class="fact"><b>The surface</b><span>Chat (read once), task (one finished result), standing worker (continues between conversations).</span></div>
          <div class="fact"><b>What starts it</b><span>You, or a schedule. A schedule does not change the surface — it starts the same task again.</span></div>
        </div>
        <p class="muted">Example, for a different job: "Turn last month's receipts into one expense report" → <b>agent, task, you</b>. <b>You decide.</b> The AI only shows the jobs and records your answers.</p>
        <h3 class="sub">Printed brief — copy it as it is</h3>
        ${codeBlock(TASK6_BRIEF)}`,
      todo: [
        'Send the printed brief, in the same conversation.',
        'Answer every job in one reply, in the shape it asks for: the rung, the surface, and what starts it.',
        'Download Task 6\'s answer key, attach it, and send the check prompt.'
      ],
      give: 'the table of your answers.',
      teach: 'Run this as a quick class vote before students answer: show of hands for each job\'s rung. The debates worth having: job 5 (a schedule repeats a <i>task</i>; it is not a new surface) and job 6 (ongoing work between conversations → a standing worker / AI Worker). The skill here is deciding, not writing a brief.',
      concept: `<a href="theory.html#ladder">1.1 The ladder of interaction</a> gives the rung; <a href="theory.html#tools">1.5 "Which surface for which job"</a> gives the surface.`
    },
    {
      id: 'task-9', num: 'T9', title: 'Where each result lives', min: 6, from: 172, key: 9, checks: 'Check 18 passed.',
      ask: 'Before Monday, tell me where each of these results is kept, and whether it will still be there.',
      intro: `<div class="callout warn"><b>In class, skip result 4.</b> It is the file from Task 8, which you do as homework. The brief already says "If I did not do Task 8, skip result 4."</div>
        <div class="grid g4">
          <div class="fact"><b>Your account / workspace</b><span>Conversations, and the Artifacts section on Claude.</span></div>
          <div class="fact"><b>The AI's workspace</b><span>The temporary computer where the AI's work runs.</span></div>
          <div class="fact"><b>Your own computer</b><span>Your folders and files.</span></div>
          <div class="fact"><b>A connected app</b><span>Such as Google Drive.</span></div>
        </div>
        <p class="muted">For each result decide <b>the place</b>, then <b>stays or goes</b>. Example: a letter you scanned into your Documents folder → "my own computer, stays".</p>
        <h3 class="sub">Printed brief — go back to your first conversation</h3>
        ${codeBlock(TASK9_BRIEF)}`,
      todo: [
        'Go back to your first conversation, the one with Tasks 1 to 6.',
        'Send the printed brief.',
        'Answer every result in one reply: the place, then stays or goes.',
        'Download Task 9\'s answer key, attach it, and send the check prompt.'
      ],
      give: 'the table of your answers.',
      teach: 'Close the loop on Maria: her summary survived (it was in the conversation) but her spreadsheet did not (it was never saved where she could get it). Ask the chapter\'s question: <b>"What survives — the machine, or the record?"</b> Result 5 is the trap: files never delivered go with the sandbox.',
      concept: `<a href="theory.html#cep">1.4 Continuity, execution and persistence</a>: three different places, three different lifetimes. Remembering is not keeping.`
    },
    {
      id: 'wrap', num: 'W', title: 'Wrap-up and homework', min: 2, from: 178,
      intro: `<div class="hw">
          <div class="card flat"><span class="kicker">Homework · 20 min</span><h3>Task 7. The other AI vendor</h3><p class="muted">Open a new conversation in the other one (Claude or ChatGPT). Send your final briefs for Tasks 1 to 5 unchanged, attach <code>inputs.zip</code> with the first, check each with its key, and note every change you had to make, and why. Only one vendor? Note what you think would change.</p></div>
          <div class="card flat"><span class="kicker">Homework · 15–25 min</span><h3>Task 8. Save it where you will find it Monday</h3><p class="muted">In a desktop app (Claude Desktop on a paid plan, or the ChatGPT desktop app), give the AI an empty <code>Brightline AP</code> folder only, and have it save <code>friday-run-2026-10-02.xlsx</code> there. Check with <a href="${KEYURL(8)}">Task 8's key</a> (checks 16–17). Then go back and answer result 4 of Task 9.</p></div>
          <div class="card flat"><span class="kicker">Tomorrow · 10 min</span><h3>Task 10. What survived</h3><p class="muted">At least a day later, look for every result: in the conversations, the Artifacts section, your <code>Brightline AP</code> folder, your computer. Then read <a href="${PORT}">the answers for Tasks 7 and 10</a> and the "Look back" questions.</p></div>
          <div class="card flat"><span class="kicker">Optional · Part B · ~1 hour</span><h3>Tasks 11–14. The vendors' newer tools</h3><p class="muted">Close the laptop (<a href="${KEYURL(11)}">11</a>), a checklist every Monday (<a href="${KEYURL(12)}">12</a>), the doc's earlier version (<a href="${KEYURL(13)}">13</a>), the AI inside the spreadsheet (<a href="${KEYURL(14)}">14</a>). Some need a paid plan or a Google account; if you cannot run one, read its key. Full steps: <a href="${BOOK}lab/">the book's lab page</a>.</p></div>
          <div class="card flat"><span class="kicker">Apply it</span><h3>Your vertical</h3><p class="muted">Take a pile of real files from the work you know best, and one thing your manager wants from them. Write the brief and run it. Then list five jobs in your vertical an AI could take, and place each on the ladder, with the surface it needs.</p></div>
        </div>`,
      todo: [
        'Note which checks you missed today, and why.',
        'Schedule Task 7 and Task 8 this week, and Task 10 for tomorrow.'
      ],
      teach: 'One-minute exit ticket: "Name one result from today and say where it lives and whether it will survive." Remind the class that Chapter 2 asks <i>What is an AI Worker?</i> — today they managed tasks; next they will manage a role.',
      concept: `<a href="theory.html#paradigm">1.6 The paradigm and the products</a>: the four questions — which rung, where it runs and is kept, who it acts as, what its status is.`
    }
  ];

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function codeBlock(text, attrs) {
    return `<div class="code-wrap"><pre class="code lab-code"${attrs || ''}>${esc(text)}</pre></div>`;
  }
  const clockFmt = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
  const mmss = s => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

  function assemble(b) {
    const pad = 13;
    const part = (label, text) => {
      const lines = String(text || '').trim().split(/\n+/).map(l => l.trim()).filter(Boolean);
      if (!lines.length) return '';
      return (label + ':').padEnd(pad) + lines.join('\n' + ' '.repeat(pad));
    };
    return [part('Outcome', b.outcome), part('Context', b.context), part('Format', b.format), part('Constraints', b.constraints)].filter(Boolean).join('\n');
  }

  /* ---------- render ---------- */
  const stepsEl = document.getElementById('steps');
  const tocEl = document.getElementById('toc');

  stepsEl.innerHTML = STEPS.map((s, i) => {
    const todo = (s.todo || []).map((t, j) => {
      const id = `${s.id}-${j}`;
      return `<li><label><input type="checkbox" data-check="${id}"${state.checks[id] ? ' checked' : ''}><span>${t}</span></label></li>`;
    }).join('');
    const builder = s.builder ? `
      <div class="builder" data-builder="${s.id}">
        <div class="row" style="justify-content:space-between"><h3 class="sub">Brief builder — write your own</h3><span class="meter" data-meter></span></div>
        <div class="builder-grid">
          ${['outcome', 'context', 'format', 'constraints'].map(f => `
            <div class="field">
              <label for="${s.id}-${f}">${f[0].toUpperCase() + f.slice(1)}</label>
              <span class="hint">${s.builder[f]}</span>
              <textarea id="${s.id}-${f}" data-field="${f}" spellcheck="true">${esc((state.briefs[s.id] || {})[f] || '')}</textarea>
            </div>`).join('')}
        </div>
        <div><div class="eyebrow" style="margin-bottom:6px">Your assembled brief</div>${codeBlock('', ' data-preview')}</div>
      </div>` : '';
    const sample = SAMPLES[s.id] ? `
      <details class="sample">
        <summary><span>📝 Sample brief</span><span class="muted">Write yours first, then compare</span></summary>
        <div class="sample-body">
          <p class="muted" style="font-size:14.5px">One good brief for this task. It gives the AI the facts and limits, not the answer. Yours can differ and still pass.</p>
          ${codeBlock(assemble(SAMPLES[s.id]))}
          <div class="row"><button class="btn small" type="button" data-fill="${s.id}">Put the sample in my brief builder</button></div>
        </div>
      </details>` : '';
    const replyTpl = s.id === 'task-6' || s.id === 'task-9' ? `
      <div><h3 class="sub">Your reply: fill in, then send</h3>
        <p class="muted" style="font-size:14.5px;margin-bottom:8px">When the AI shows the ${s.id === 'task-6' ? 'six jobs' : 'results'}, answer them all in one message in this shape. The decisions are yours; the answer key grades them.</p>
        ${codeBlock(s.id === 'task-6' ? REPLY_6 : REPLY_9)}</div>` : '';
    const sends = SENDS[s.id] ? `
      <div class="sends"><div class="eyebrow">What you type, in order</div>
        <ol>${SENDS[s.id].map(x => `<li>${x}</li>`).join('')}</ol></div>` : '';
    const keyBox = s.key ? `
      <div class="keybox"><div class="eyebrow">Check it now</div>
        <p style="margin-top:6px"><a class="btn small primary" href="${KEYURL(s.key)}">⬇ Task ${s.key} answer key</a></p>
        <p style="margin-top:8px;font-size:14.5px">Attach it, then send <a href="#check-prompt">the check prompt</a>.</p>
        <p style="margin-top:8px;font-size:14.5px"><b>Checkpoint.</b> ${s.checks}</p>
      </div>` : '';
    const next = STEPS[i + 1], prev = STEPS[i - 1];
    return `
    <article class="step${state.done[s.id] ? ' done' : ''}" id="${s.id}" data-step="${s.id}">
      <div class="step-head">
        <div class="step-num" aria-hidden="true">${s.num}</div>
        <div style="min-width:0">
          <h2>${s.key ? `Task ${s.key}. ` : ''}${s.title}</h2>
          <div class="step-meta"><span>⏱ ${s.min} min</span><span>🕐 ${clockFmt(s.from)}–${clockFmt(s.from + s.min)}</span><span>Step ${i + 1} of ${STEPS.length}</span><span class="now-tag">● NOW on the session clock</span></div>
        </div>
      </div>
      <div class="step-body">
        ${s.ask ? `<div class="ask"><div class="eyebrow">Your manager asks</div><q>${s.ask}</q></div>` : ''}
        ${s.intro || ''}
        <div><h3 class="sub">What you do</h3><ul class="checklist">${todo}</ul></div>
        ${sends}
        ${s.extra ? s.extra() : ''}
        ${replyTpl}
        ${builder}
        ${sample}
        ${s.give ? `<p class="give"><b>Give your manager:</b> ${s.give}</p>` : ''}
        <div class="meta-grid">${keyBox}<div class="concept"><div class="eyebrow">Connects to the theory</div><p style="margin-top:6px;font-size:15px">${s.concept}</p></div></div>
        <div class="callout teach">${s.teach}</div>
      </div>
      <div class="step-foot">
        <div class="mini-timer" data-timer="${s.min}">
          <button class="btn small" type="button" data-timer-btn>▶ Start ${s.min}-min timer</button><output>${mmss(s.min * 60)}</output>
        </div>
        <div class="row">
          ${prev ? `<a class="btn small" href="#${prev.id}">← Prev</a>` : ''}
          <button class="btn small${state.done[s.id] ? '' : ' primary'}" type="button" data-done="${s.id}">${state.done[s.id] ? '✓ Done (undo)' : 'Mark step done'}</button>
          ${next ? `<a class="btn small" href="#${next.id}">Next →</a>` : `<a class="btn small" href="#troubleshoot">Troubleshooting ↓</a>`}
        </div>
      </div>
    </article>`;
  }).join('');

  tocEl.innerHTML = STEPS.map(s =>
    `<li><a href="#${s.id}" data-toc="${s.id}">${s.key ? `Task ${s.key} · ` : ''}${s.title} <span><b class="tick">${state.done[s.id] ? '✓ ' : ''}</b>${s.min}′</span></a></li>`
  ).join('');

  /* ---------- copy buttons for rendered code blocks ---------- */
  stepsEl.querySelectorAll('.lab-code').forEach(pre => {
    const b = document.createElement('button');
    b.className = 'copy'; b.type = 'button'; b.textContent = 'Copy';
    b.addEventListener('click', async () => {
      const text = pre.textContent.trim();
      if (!text) { b.textContent = 'Empty'; setTimeout(() => (b.textContent = 'Copy'), 1200); return; }
      try { await navigator.clipboard.writeText(text); b.textContent = 'Copied ✓'; }
      catch (e) { const r = document.createRange(); r.selectNodeContents(pre); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); b.textContent = 'Selected — ⌘/Ctrl+C'; }
      setTimeout(() => (b.textContent = 'Copy'), 1600);
    });
    pre.parentElement.appendChild(b);
  });

  /* ---------- brief builders ---------- */
  stepsEl.querySelectorAll('[data-builder]').forEach(box => {
    const id = box.dataset.builder;
    const preview = box.querySelector('[data-preview]');
    const meter = box.querySelector('[data-meter]');
    const paint = () => {
      const b = state.briefs[id] || {};
      const text = assemble(b);
      preview.textContent = text || 'Start typing in the four boxes above. Your brief appears here, ready to copy.';
      preview.style.opacity = text ? 1 : .6;
      const filled = ['outcome', 'context', 'format', 'constraints'].filter(f => (b[f] || '').trim()).length;
      meter.innerHTML = `<b>${filled}</b>/4 headings`;
    };
    box.addEventListener('input', e => {
      const f = e.target.dataset.field; if (!f) return;
      state.briefs[id] = Object.assign({}, state.briefs[id], { [f]: e.target.value });
      save(); paint();
    });
    paint();
  });

  /* ---------- checklist + done ---------- */
  function updateProgress() {
    const done = STEPS.filter(s => state.done[s.id]).length;
    const total = STEPS.reduce((n, s) => n + (s.todo || []).length, 0);
    const ticked = Object.keys(state.checks).filter(k => state.checks[k]).length;
    document.getElementById('progLabel').textContent = `${done} of ${STEPS.length} steps done`;
    document.getElementById('progChecks').textContent = `${ticked} / ${total} ticks`;
    document.getElementById('progBar').style.width = `${(done / STEPS.length) * 100}%`;
    STEPS.forEach(s => {
      const art = document.getElementById(s.id);
      art.classList.toggle('done', !!state.done[s.id]);
      const btn = art.querySelector('[data-done]');
      btn.textContent = state.done[s.id] ? '✓ Done (undo)' : 'Mark step done';
      btn.classList.toggle('primary', !state.done[s.id]);
      tocEl.querySelector(`[data-toc="${s.id}"] .tick`).textContent = state.done[s.id] ? '✓ ' : '';
    });
  }
  stepsEl.addEventListener('change', e => {
    const id = e.target.dataset.check; if (!id) return;
    state.checks[id] = e.target.checked; save(); updateProgress();
  });
  stepsEl.addEventListener('click', e => {
    const d = e.target.closest('[data-done]');
    if (d) {
      const id = d.dataset.done;
      state.done[id] = !state.done[id]; save(); updateProgress();
      if (state.done[id]) {
        const i = STEPS.findIndex(s => s.id === id);
        const nxt = STEPS[i + 1];
        if (nxt) setTimeout(() => document.getElementById(nxt.id).scrollIntoView({ behavior: 'smooth' }), 250);
      }
      return;
    }
    const fill = e.target.closest('[data-fill]');
    if (fill) {
      const id = fill.dataset.fill, box = stepsEl.querySelector(`[data-builder="${id}"]`);
      const has = Object.values(state.briefs[id] || {}).some(v => (v || '').trim());
      if (has && !confirm('Replace what you wrote in this brief builder with the sample?')) return;
      ['outcome', 'context', 'format', 'constraints'].forEach(f => {
        const ta = box.querySelector(`[data-field="${f}"]`);
        ta.value = SAMPLES[id][f].replace(/\n/g, ' ');
        ta.dispatchEvent(new Event('input', { bubbles: true }));
      });
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const t = e.target.closest('[data-timer-btn]');
    if (t) toggleTimer(t.closest('[data-timer]'));
  });

  document.getElementById('resetLab').addEventListener('click', () => {
    if (!confirm('Clear all your ticks, "done" marks and brief drafts for Lab 1 in this browser?')) return;
    state = { checks: {}, done: {}, briefs: {} }; save();
    stepsEl.querySelectorAll('[data-check]').forEach(c => (c.checked = false));
    stepsEl.querySelectorAll('[data-builder] textarea').forEach(t => { t.value = ''; t.dispatchEvent(new Event('input', { bubbles: true })); });
    state = { checks: {}, done: {}, briefs: {} }; save();
    updateProgress();
  });

  /* ---------- per-step countdown timers ---------- */
  const timers = new Map();
  function toggleTimer(el) {
    const btn = el.querySelector('[data-timer-btn]');
    const out = el.querySelector('output');
    const mins = Number(el.dataset.timer);
    let t = timers.get(el);
    if (t && t.id) { // running → stop & reset
      clearInterval(t.id); timers.delete(el);
      el.classList.remove('running', 'over'); out.textContent = mmss(mins * 60);
      btn.textContent = `▶ Start ${mins}-min timer`; return;
    }
    const end = Date.now() + mins * 60000;
    el.classList.add('running');
    btn.textContent = '■ Stop';
    const tick = () => {
      const left = Math.round((end - Date.now()) / 1000);
      if (left <= 0) { out.textContent = 'Time!'; el.classList.remove('running'); el.classList.add('over'); }
      else out.textContent = mmss(left);
    };
    tick();
    timers.set(el, { id: setInterval(tick, 1000) });
  }

  /* ---------- highlight the step that matches the session clock ---------- */
  let lastNow = null;
  document.addEventListener('piaic:clock', e => {
    const m = e.detail.elapsed / 60;
    const cur = STEPS.find(s => m >= s.from && m < s.from + s.min);
    const id = cur ? cur.id : null;
    if (id === lastNow) return;
    lastNow = id;
    STEPS.forEach(s => {
      document.getElementById(s.id).classList.toggle('now', s.id === id);
      tocEl.querySelector(`[data-toc="${s.id}"]`).classList.toggle('now-step', s.id === id);
    });
  });

  /* ---------- TOC scroll-spy (common.js ran before the TOC existed) ---------- */
  if ('IntersectionObserver' in window) {
    const links = [...tocEl.querySelectorAll('a')];
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(a => a.classList.toggle('active', a.dataset.toc === en.target.id));
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    STEPS.forEach(s => io.observe(document.getElementById(s.id)));
  }

  updateProgress();
  if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) setTimeout(() => el.scrollIntoView(), 50); }
})();
