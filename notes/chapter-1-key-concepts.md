# Chapter 1 · From Chatbots to AI Workers: key concepts

Study notes for the PIAIC Advance Agentic AI class, Karachi. Source: [Chapter 1](https://agentfactory2.panaversity.org/ai-worker-paradigm/from-chatbots-to-ai-workers/overview/) of Panaversity's *The AI Agent Factory*. Interactive version: [theory.html](https://qasim-077.github.io/PIAIC-Advance-agenticAI-Karachi/theory.html).

---

## The point

AI text boxes look the same as they did in 2023. What happens behind them has changed completely. In 2023 the box gave you back **text** that you copied somewhere else yourself. Today it can give you back **finished work**: documents, spreadsheets and presentations that it can open again and edit.

After this chapter you can:

- place any AI product on a four-rung **ladder**, from tools that answer a question to tools that finish a job;
- keep three ideas apart that marketing blurs together: **continuity**, **where it runs**, and **where it is kept**;
- tell what is genuinely new in the next AI announcement from a new name for the same thing.

## Why it matters: Maria's week

Maria runs the office at a wholesale supplier in Ohio, with about 40 staff.

- **Monday.** She types "Summarize these vendor invoices" and attaches 15 PDFs. A tidy paragraph comes back. She copies the totals into a spreadsheet by hand. The same box could have built the spreadsheet, checked every total and flagged the one invoice billed twice. That duplicate, for $4,850, got paid.
- **Wednesday.** She asks for a report of unpaid bills by how overdue they are. The AI builds a spreadsheet and shows a short summary. She reads the summary and closes the tab.
- **Next Monday.** She asks for "last week's spreadsheet, updated." The summary is still in the conversation. The spreadsheet is not: it was built in a temporary workspace and never saved where she could open it again.

Her two mistakes, neither about intelligence:

1. She got **2023 value from a 2026 system**, because nothing on the screen said the box had changed.
2. She assumed that because the conversation remembered her, the work survived too. **Remembering is not keeping.**

---

## 1.1 The ladder of interaction

Every era of computing has a **unit of interaction**: the thing you hand over and the thing you get back.

> Search engines are queried. Chatbots are prompted. Agents are delegated tasks. AI Workers are managed.

| Rung | You hand over | You get back | Who does the work |
| --- | --- | --- | --- |
| Search engine | A query | A list of links | You read, judge and act |
| Chatbot | A message | A reply | You copy, check and finish the job |
| Agent | A task | A finished output | The agent works, you review |
| AI Worker | A role | Recurring results, with evidence | The worker works, you manage |

- An **agent** is the technical mechanism: a model in a loop with tools. It plans, acts, checks the result and acts again.
- An **AI Worker** is a business definition: a role-based AI system with identity, responsibilities, procedures (skills), knowledge access, tools, bounded authority, channels, evaluation criteria, and enough continuity to do recurring work.
- One invoice register is a **task**. A register every week is a **role**. An agent may be part of an AI Worker; not every agent is one.
- An **AI Workforce** is several AI Workers composed under human management (Part V of the book).
- Each rung up moves more work away from you, and needs more control. Hence the rule: **Humans define intent. AI Workers execute. Humans verify outcomes.**

## 1.2 The same text box, a different destination

- In 2023 the box mostly led to a conversation. Code sandboxes were an add-on that few people switched on.
- In 2026 the same box leads to **one conversation that routes itself**. A short question gets a short answer. A clear outcome usually gets **work**: the system plans, searches, reads your files and apps, writes and runs code, and delivers a finished file. It can keep going after you close the laptop, and run again every Monday.
- **Who decides between answering and working?** Often the system, mostly from **what you write**. An unclear request gets a chat answer. A clear outcome, format and limits tell it you want work done.
- So the **brief** (Outcome · Context · Format · Constraints) is a core management skill, not a writing trick (Chapter 5).
- A **surface** is one way a vendor offers its AI to you, such as a chat, or an agent that works on its own.

| You see | What is now behind it |
| --- | --- |
| The same text box | One conversation that routes between answering and working |
| A message you type | A brief: outcome, context, format, constraints |
| A reply | A finished file, or a document, deck or design you edit in place |
| A wait at the keyboard | A task that runs while you are away, or on a schedule |
| A browser tab | A way into your computer's folders, browser and apps, through a desktop app |
| Scrolling back | A panel showing the plan, the outputs and the tools used |
| A small settings menu | Permissions and connections that decide what the work can touch |

## 1.3 Where the work runs

- An **execution environment** is where work runs: a file system, tools, a shell, and limits on what it can reach. It may be a temporary machine in the vendor's cloud, a virtual machine on your computer, or a computer that belongs to a long-running AI Worker.
- Three effects:
  1. **Multi-step work becomes normal.** The agent can build, check and fix before you see the result.
  2. **Revising no longer means re-uploading.** While the environment lasts, earlier files are still there.
  3. **The environment is a boundary, but only for code.** Isolation limits where the agent's code runs. It does not limit what the agent does through the apps and folders you connect (Chapter 7).

## 1.4 Continuity, execution and persistence

| Idea | Means | Everyday analogy |
| --- | --- | --- |
| **Worker continuity** | What makes a worker the same worker over time: identity, responsibilities, context, recurring work | The family doctor |
| **Execution environment** | Where one piece of work runs. Often temporary. | The exam room |
| **Artifact persistence** | Where results are saved, and how you get them back | The records file |

Each can change without the other two. A finished spreadsheet on a machine is not a saved spreadsheet until it is saved where you can get it back.

| Place | What lives there | How long it lasts |
| --- | --- | --- |
| Your account or workspace | Transcripts, delivered outputs, documents, projects, schedules, memory | Durable |
| The execution environment | Working files, installed tools, work in progress | Often temporary. Check each product. |
| Your own computer | Your folders, browser sessions and apps | As long as you keep them. Cloud work reaches them only through an open desktop app, with your permission. |

- **The practical rule:** save anything you need later to a known place, and check that you can get it back.
- **Durable is not authoritative.** Personal memory and shared projects are not your company's official record. Chapter 4 adds **KSoR** (what a worker may know), **DSoR** (what it may do) and **SSoR** (where the work stands).

## 1.5 How today's tools realize it (as of early November 2026)

**Anthropic.** Chat and Cowork are one Claude conversation. On Pro, Max and Ultra, tasks run in the cloud, each session in an isolated, temporary sandbox that is destroyed when it ends; a scheduled task gets a fresh sandbox on every run. Claude Desktop is the bridge to folders you connect, only while it is open. Artifacts (Docs, Slides, Design and more) are kept in your account's Artifacts section; plain files arrive as file cards in the chat; working files never handed over are wiped with the sandbox. Claude for Google Workspace edits the Google file itself. Claude Duet is a standing worker in research preview.

**OpenAI.** ChatGPT is coming together in one conversation; some apps still show a Chat / Work switch. Tasks turn goals into finished files. Scheduled tasks can run on your computer or in the cloud. ChatGPT for Excel and Google Sheets edits live cells. **Dots** are always-on agents with their own cloud computer and browser, governed by Custom Rules.

**Open source.** You install the tool and pick the model, and you own setup, updates and security. **OpenCode** is a coding agent for tasks on your machine. **OpenClaw** is a self-hosted standing assistant. Run it on a separate machine with least permissions.

**Machine or record?** For a delegated task in Claude, the machine is always disposable and the record is always durable. A standing worker turns that around: the machine itself is the standing thing. Open source moves the machine onto your own hardware. Keep what you care about where the survivor is.

**Which surface for which job.**

| Surface | For |
| --- | --- |
| Chat | A question, a draft, an explanation you read once |
| Task | A clear outcome that comes back as a finished result |
| Schedule | Not a third choice: the same task, started by a clock |
| Standing worker | Ongoing work that continues between conversations |

**The invariant**, on any runtime:

1. Every request is routed to answering or to working.
2. The work runs in an execution environment, and you must know who controls it.
3. Anything you want to keep must be saved to a known place.
4. Durable state is still not the company's governed record.

## 1.6 The paradigm and the products

- The move from message → task → role is lasting. Products are less stable.
- Keep two questions apart: *Is this a real shift in how work is done?* (paradigm) and *Can I use it today, on my plan, in my market?* (product).
- Two opposite errors: dismissing the paradigm because a product is unfinished, and building on a product claim that isn't true for you yet.

**Four questions for any announcement:**

1. **Which rung is it?** Search, answer, task, or role?
2. **Where does the work run, and where are results kept?** What survives: the machine, or the record?
3. **Who is it acting as?** Your login, or an identity of its own?
4. **What is its status?** Generally available, beta or preview? On which plans and markets?

A worker doing a business process needs its own identity, its own limits and a named human owner. When it does one full-time role's work, the book calls it a **Digital FTE**.

> **The platforms are rented. The knowledge and the controls are yours.**

---

## Self-check

1. What is the unit of interaction on each rung? *(Query, message, task, role.)*
2. What decides whether the box answers or works? *(Mostly what you write.)*
3. What does work need once a request becomes work? *(An execution environment with files, tools and limits.)*
4. Which is durable: a scratch file, an installed package, half-finished work, or a delivered spreadsheet? *(The delivered spreadsheet.)*
5. Why did Maria lose her spreadsheet but keep her summary? *(The summary was in the conversation; the spreadsheet lived only in a temporary workspace.)*
6. What is a schedule? *(The same task, started by a clock instead of you.)*

More: the book's [Check yourself](https://agentfactory2.panaversity.org/ai-worker-paradigm/from-chatbots-to-ai-workers/check-yourself/) flashcards and quiz.
