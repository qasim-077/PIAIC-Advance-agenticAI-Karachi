# PIAIC Advance Agentic AI · Karachi

## Chapter 1: From Chatbots to AI Workers

Material for one 3-hour class on Chapter 1 of Panaversity's [*The AI Agent Factory*](https://agentfactory2.panaversity.org/ai-worker-paradigm/from-chatbots-to-ai-workers/overview/), Second Edition.

**Live site:** https://qasim-077.github.io/PIAIC-Advance-agenticAI-Karachi/

| Part | Time | Page | What happens |
| --- | --- | --- | --- |
| 1 · Theory | 0:00 – 1:30 | [`theory.html`](https://qasim-077.github.io/PIAIC-Advance-agenticAI-Karachi/theory.html) | Interactive lessons 1.1–1.6, with live diagrams, animations, games and a quiz |
| 2 · Lab 1 | 1:30 – 3:00 | [`lab.html`](https://qasim-077.github.io/PIAIC-Advance-agenticAI-Karachi/lab.html) | Step-by-step Lab 1: brief builders, checklists, task timers, answer-key links |

The operating rule behind the whole chapter:

> **Humans define intent. AI Workers execute. Humans verify outcomes.**

---

## Topics covered

| # | Topic | The idea in one line | Interactive piece on the site |
| --- | --- | --- | --- |
| 0 | Why it matters: Maria's week | Two expensive mistakes, neither about intelligence | Click through Monday, Wednesday, next Monday |
| 1.1 | The ladder of interaction | Search engines are queried. Chatbots are prompted. Agents are delegated tasks. AI Workers are managed. | Animated ladder, the traits of an AI Worker, a sort-the-jobs game |
| 1.2 | The same text box, a different destination | One conversation routes between answering and working, mostly from what you write | Add Outcome, Context, Format and Constraints, and watch the request reroute |
| 1.3 | Where the work runs | An execution environment has files, tools, a shell and limits. It is a boundary only for code. | The agent's build → check → fix loop, and a boundary toggle |
| 1.4 | Continuity, execution and persistence | Three ideas that vary independently. Remembering is not keeping. | Three toggles, a "where does it live?" game, and the desktop-app bridge |
| 1.5 | How today's tools realize it | Anthropic, OpenAI and open source. What survives: the machine, or the record? | Vendor tabs, and a machine-vs-record animation |
| 1.6 | The paradigm and the products | The shift is lasting; the products are less stable | Paradigm-or-product game, and a four-question announcement analyser |
| — | Check yourself | 12 questions across the chapter | Quiz with explanations |
| Lab | Lab 1: a real job, checked | Delegate, verify against a key, and find where each result lives | 10-step guided lab, with progress saved in the browser |

Read the topics as plain notes: [`notes/chapter-1-key-concepts.md`](notes/chapter-1-key-concepts.md).

---

## Repository layout

```text
.
├── index.html                  Session home: agenda, live "now" marker, prep checklist
├── theory.html                 Part 1, 90 minutes of interactive theory
├── lab.html                    Part 2, 90 minutes of step-by-step Lab 1
├── assets/
│   ├── css/style.css           Shared styles, light and dark mode
│   └── js/
│       ├── common.js           Nav, theme, 3-hour session clock, copy buttons
│       ├── theory.js           Theory widgets and quiz
│       └── lab.js              Lab stepper, brief builder, timers
├── notes/chapter-1-key-concepts.md     The chapter as study notes
├── lab/LAB-1-session-guide.md          The lab as a 90-minute classroom guide
└── instructor/session-plan.md          Minute-by-minute run of show, with prompts
```

## For instructors

- Open [`index.html`](https://qasim-077.github.io/PIAIC-Advance-agenticAI-Karachi/) on the projector and press **▶** on the clock at the top right when class starts. The clock is shared across all three pages, and the agenda highlights the current block.
- Use the **Instructor notes** button on the Theory and Lab pages to show or hide the purple teaching notes. Hide them before you share your screen, if you like.
- The full minute-by-minute plan is in [`instructor/session-plan.md`](instructor/session-plan.md).

## For students

1. Bring a laptop, and a Claude or ChatGPT account. Free plans work for Part A of the lab.
2. Download and unzip the lab kit: [`brightline-lab-ch01.zip`](https://github.com/panaversity/agentfactory-v2-resources/releases/latest/download/brightline-lab-ch01.zip).
3. Give the AI only `inputs.zip`, and at each check that task's answer key. Never upload `LAB.md` or `README.md`: they link every answer key.

## Run it locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Credits

The chapter, the lab, the Brightline kit and the answer keys are by [Panaversity](https://agentfactory2.panaversity.org/), from *The AI Agent Factory*. This repo links to the lab files and answer keys, and does not copy them. Brightline and every name in the lab are invented. Product details (plans, betas, prices) are as the book states them in early November 2026, and they change, so check each vendor's page on the day.
