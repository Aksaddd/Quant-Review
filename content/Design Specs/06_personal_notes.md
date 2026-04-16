# Design Spec: Personal Notes & Progressive Summarization UI
> **Quant Review Platform** · Gamification & UX Designer · Spec 06 · For Review

---

## Overview

The current platform treats learning as a consumption activity — read the problem, view the solution, move on. But the strongest evidence in cognitive science (generation effect, self-explanation, retrieval practice) shows that **producing your own understanding is the learning event**, not consuming someone else's.

This spec designs a personal knowledge system where students build a "second brain" for quant concepts — their own annotations, mental models, technique summaries, and self-authored solutions that become reusable retrieval cues for future review.

**Three modes of engagement, escalating in cognitive depth:**

| Mode | Activity | Research Basis | Cognitive Depth |
|------|----------|---------------|-----------------|
| **Annotate** | Highlight key steps, add inline notes to solutions | Generation effect (Slamecka & Graf), spatial retrieval cues (Umejima 2021) | Medium |
| **Distill** | Write a one-sentence mental model in your own words | Progressive Summarization Layer 4, write-to-learn (half letter grade improvement) | High |
| **Express** | Author your own solution to teach a fellow candidate | Protégé effect (Chase et al. 2009, 1.3× metacognitive strategies), Feynman Technique | Highest |

---

## Part A: Concept & Note-Taking Science

### The Science

**The Generation Effect (Slamecka & Graf 1978; Forte citing Rosner et al. 2013):** Actively producing information strengthens memory far more than passively reading it. Writing activates motor, linguistic, and semantic processing networks simultaneously. The current "Show Solution" → read → move on flow leaves the strongest learning mechanism on the table.

**Self-Explanation Effect (Chi et al. 1989, 1994; Renkl 1997):** The extent to which learners benefit from worked examples depends on how thoroughly they explain each step's rationale to themselves. "Good" students relate solution actions to underlying principles. "Poor" students read passively. Chi's critical finding: **self-explanation can be explicitly prompted** — students trained to self-explain learn as well as naturally strong explainers.

**Write-to-Learn (Brown, Roediger, McDaniel):** Over 800 college students who summarized concepts in their own words scored approximately half a letter grade higher than those who copied slides verbatim. Benefits persisted (though diminished) at 2-month follow-up.

**The Protégé Effect (Chase, Chin, Oppezzo, Schwartz 2009, Stanford):** Students learn more effortfully when preparing to teach than when studying for themselves. Three critical findings:
1. Expectation alone produces benefits — just being told you'll teach improves learning
2. Actually teaching amplifies the effect further
3. **Timing is critical** — students must be told BEFORE studying, not surprised after. The preparation-to-teach mindset changes how material is encoded.

**Mueller & Oppenheimer (2014) + Urry et al. (2021) replication:** The medium doesn't matter (typing vs handwriting). What matters is whether the note-taking process forces **generative processing** (paraphrasing, connecting, selecting) vs **passive transcription** (copy-paste). The platform must structure prompts that force generative processing.

**Retrieval-based note-taking (RetrievalPractice.org):** Instead of writing during study, close materials and write from memory, then check. This transforms note-taking from an encoding activity into a retrieval activity — leveraging the testing effect. Student-generated retrieval cues require deeper processing than copy-paste notes.

### What Forte's Progressive Summarization Contributes

**Important caveat:** Progressive Summarization has **no peer-reviewed empirical validation** as a named technique. It is practitioner wisdom — Forte's synthesis of generation, elaboration, and spaced processing principles into a specific workflow. The spec leans on the validated underlying research, using Forte's layer metaphor as a UX framework.

**The layers adapted for quant problems:**

| Forte's Layer | Quant Review Adaptation | Cognitive Mechanism |
|---------------|------------------------|-------------------|
| **L1: Capture** | Full solution auto-saved to personal notebook when viewed | Storage — baseline reference |
| **L2: Bold** | Student highlights the critical step(s) that make the solution work | Selection — forces attention allocation |
| **L3: Highlight** | Student marks the single most important insight | Further distillation — desirable difficulty |
| **L4: Summary** | Student writes a one-sentence mental model in their own words | Generation effect — the highest-value note |
| **L5: Express** | Student authors their own solution or teaches the concept | Protégé effect — deepest encoding |

The key principle: **each layer requires less text but more thinking.** A Layer 4 one-sentence summary that captures the essence of a stochastic calculus solution is harder to produce than copying the entire solution — and that difficulty is precisely why it works.

---

## Part B: UI Design & Note Layers

### Inline Annotation (Layer 2-3)

After a student views a worked solution in `SolutionReveal`, the solution text becomes annotatable.

```
┌──────────────────────────────────────────────────────────┐
│  Solution                                         Hide  │
│  ──────────────────────────────────────────────────────  │
│                                                          │
│  Let X be the number of socks drawn. By the Pigeon Hole  │
│  Principle, if there are n colors, we need at most n+1   │
│  draws to guarantee a matching pair.                     │
│  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ [highlighted by user] │
│                                                          │
│  With 10 colors and 10 socks of each color, drawing     │
│  n+1 = 11 socks guarantees at least two share a color.  │
│                                                          │
│  📝 Your note on this step:                              │
│  ┌──────────────────────────────────────────────────┐    │
│  │ "The +1 is the key — it's always one more than   │    │
│  │  the number of categories."                      │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  Answer: 11 socks                                        │
│                                                          │
│  ──────────────────────────────────────────────────────  │
│  ✏️ Your mental model:                                   │
│  ┌──────────────────────────────────────────────────┐    │
│  │ "PHP: need k+1 items to guarantee 2 in same bin  │    │
│  │  among k bins."                                  │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  ✓ Solved · +25 XP    [ Undo solved ] [ Reset ]         │
└──────────────────────────────────────────────────────────┘
```

**Annotation Interaction:**

| Action | How | Result |
|--------|-----|--------|
| **Highlight text** | Select text in solution → floating toolbar appears with highlight button | Selected passage gets yellow background (Layer 2). Persisted per problem per user. |
| **Add inline note** | Click highlighted passage → note input expands below | Free-text note anchored to specific solution step (Layer 3). Spatial retrieval cue. |
| **Write mental model** | Below the solution, a permanent "Your mental model" field | One-sentence summary in the student's own words (Layer 4). The highest-value note. |
| **Remove highlight** | Click highlighted text → "Remove" option in toolbar | Removes highlight and any attached note |

**Design principles:**
- Highlights and notes are **private by default**. Never shown to other users.
- The mental model field uses a generous text area (not a single line) but prompts brevity: "Summarize the key technique in one sentence."
- Notes are persisted in localStorage (matching current architecture) and synced to Supabase when authenticated.
- Highlighting uses `window.getSelection()` + stored character offsets for the solution markdown.

### Mental Model Prompt (Layer 4)

The highest-value note. Appears below every solution after it's revealed.

**Prompt variations (rotated):**

| Prompt | When Used |
|--------|-----------|
| "Summarize the key technique in one sentence, in your own words." | Default |
| "If you saw this problem on an interview, what's the one thing you'd need to remember?" | After hard problems |
| "What pattern does this problem follow? Name it." | When technique tags exist |
| "Without looking at the solution, write the first step." | Retrieval-based prompt (most challenging) |

**States:**

| State | Visual |
|-------|--------|
| **Empty** | Light gray placeholder text with prompt. Subtle pencil icon. Inviting but not pushy. |
| **Has content** | User's text in their own font preference. Small "Last edited: Apr 14" timestamp. Edit icon on hover. |
| **On revisit (spaced review)** | Mental model is shown BEFORE the solution on return visits: "You wrote this last time: '[their summary].' Still accurate?" This triggers retrieval practice — the student must evaluate their own understanding. |

### Retrieval-Based Note Prompt (Pre-Solution)

Before revealing the solution, prompt a retrieval attempt. This is the "Submit My Approach" step from the synthesis document.

```
┌──────────────────────────────────────────────────────────┐
│  Before you see the solution...                          │
│                                                          │
│  What's your approach? (Even a partial idea helps.)      │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │                                                  │    │
│  │  [free text scratchpad]                          │    │
│  │                                                  │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  [ Submit & See Solution ]        [ Skip → Solution ]   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| **Trigger** | Appears when student clicks "Show Solution" — intercepts before reveal |
| **Skip option** | Always available. Never force. "Skip → Solution" bypasses the prompt. |
| **After submission** | Student's approach is saved. Solution reveals below. A comparison prompt appears: "Compare your approach to the solution. What did you get right?" |
| **XP bonus** | +5 XP for submitting any approach (even "I don't know"). Rewards the generative attempt. This stacks with the existing 5 XP for "attempted." |
| **Persistence** | Saved per problem. On revisit, the student can see their previous approach alongside the canonical solution — tracking their own growth. |

### Self-Explanation Prompts (Post-Solution)

After viewing critical solution steps, structured prompts that activate Chi's self-explanation effect:

| Prompt Type | Example | When |
|-------------|---------|------|
| **Why this technique?** | "Why does this solution use conditioning instead of direct computation?" | After solutions using non-obvious technique selection |
| **What would change?** | "What would change if the distribution were continuous instead of discrete?" | After probability/stochastic problems |
| **Find the error** | "This solution contains a subtle error in step 3. Can you find it?" | Variant problems (authored by Content Author). McLaren et al.: explaining errors > explaining only correct solutions. |

These are **optional** — expandable sections below the solution. Never forced. Labeled: "Deepen your understanding (optional)."

### Notes Sidebar (Aggregated View)

A collapsible panel accessible from the reader toolbar that shows all notes for the current chapter:

```
┌─── Your Notes ─────────────────────┐
│                                    │
│  Chapter 2 · 12 notes              │
│                                    │
│  §2.1 Problem Simplification       │
│  ├ Screwy Pirates: "Work backward  │
│  │  from simplest case (2 pirates)"│
│  ├ Tiger & Sheep: "Parity is the   │
│  │  key — odd vs even changes..."  │
│  │                                 │
│  §2.3 Pigeon Hole                  │
│  ├ Matching Socks: "PHP: k+1 items │
│  │  guarantees match among k bins" │
│  ├ Handshakes: "0 and n-1 can't    │
│  │  coexist — that's the PHP"      │
│  │                                 │
│  [ Export Notes ]                   │
│                                    │
└────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| **Placement** | Right sidebar, toggled via notebook icon in reader toolbar. Collapses to not interfere with reading. |
| **Organization** | Grouped by section, then by problem. Shows mental model summaries (Layer 4). |
| **Click to navigate** | Clicking a note scrolls to the associated problem. |
| **Export** | "Export Notes" → copies all notes as formatted markdown to clipboard. For transfer to personal note apps (Obsidian, Notion, etc.). |
| **Cross-linking** | Notes tagged with technique tags are discoverable from the Technique Atlas (Spec 05). A note on "conditioning" in Problem 4.3.2 surfaces when browsing the Conditioning technique page. |
| **Focus Mode** | Notes sidebar is **available** during Focus Mode (it's a study tool, not gamification chrome). The toggle is accessible but the sidebar starts collapsed. |

---

## Part C: Express Mode & Integration

### Express Mode — "Teach It Back"

The highest tier of the personal notes system. Based on the protégé effect (Chase et al. 2009): students who prepare to teach use 1.3× more metacognitive strategies and learn more deeply.

**Unlock condition:** Available on problems the student has already solved. A "Write Your Solution" button appears in the problem footer after solving.

```
┌──────────────────────────────────────────────────────────┐
│  Write Your Solution                                     │
│  ──────────────────────────────────────────────────────  │
│                                                          │
│  Explain this solution as if teaching a fellow candidate │
│  who's stuck. Use your own words and reasoning.          │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │                                                  │    │
│  │  [rich text editor — markdown supported]         │    │
│  │                                                  │    │
│  │  Supports LaTeX: $E[X] = \sum x \cdot P(x)$     │    │
│  │                                                  │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  [ Save My Solution ]    [ Compare to Book Solution ]    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| **Editor** | Markdown with KaTeX support (matching the existing `MarkdownRenderer`). Toolbar: bold, italic, math inline, math block, bullet list. |
| **Framing** | "Explain as if teaching a fellow candidate who's stuck." This activates the protégé effect — the preparation-to-teach mindset. |
| **Compare view** | Side-by-side: student's solution on the left, book solution on the right. Highlights differences. Helps students identify gaps in their own reasoning. |
| **XP reward** | +15 XP for submitting an Express solution (same as Comeback Bonus — reflects the high cognitive value). Only awarded once per problem. |
| **Visibility** | Private by default. Future v2: opt-in sharing with community ("Publish my solution"). |
| **Spaced review integration** | When a problem resurfaces for spaced review, the student's own Express solution is shown FIRST — they re-read their own explanation before attempting the problem again. If their Express solution is wrong or incomplete, the gap becomes visible on retry. |

### Create Your Own Flashcard

Students can create custom flashcards from any problem or note — the "Intermediate Packet" concept from Forte.

**Trigger:** A "Create Flashcard" button on solved problems and on the notes sidebar.

```
┌──────────────────────────────────────────────────────────┐
│  Create Flashcard from: Matching Socks                   │
│                                                          │
│  Front (question):                                       │
│  ┌──────────────────────────────────────────────────┐    │
│  │ How many socks must you draw from a drawer with  │    │
│  │ 10 colors (10 each) to guarantee a matching pair?│    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  Back (answer):                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │ 11 — by PHP, k+1 items among k categories       │    │
│  │ guarantees at least 2 in the same category.      │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  Tags: [ pigeon-hole ] [ combinatorics ] [ + Add ]       │
│                                                          │
│  [ Create Card ]                                         │
└──────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| **Pre-populated** | Front: problem title + setup (truncated). Back: student's mental model if it exists, otherwise empty. Tags: from problem's technique tags. |
| **Editable** | Student can rewrite both sides. The act of formulating a Q&A pair is itself generative learning. |
| **Integration** | Created cards enter the SM-2 system via `useCustomSets` hook (already exists in codebase). They appear in regular flashcard review sessions alongside book-authored cards. |
| **XP** | +5 XP for creating a flashcard (generative activity). Cards then earn standard flashcard review XP on each review. |

### Data Model

```typescript
// ── Personal Notes ──────────────────────────

export interface ProblemNote {
  problemId: string;
  userId: string;

  // Layer 2-3: highlights and inline notes
  highlights: NoteHighlight[];

  // Layer 4: mental model summary
  mentalModel?: string;

  // Pre-solution approach (retrieval-based)
  approach?: string;

  // Layer 5: Express solution
  expressSolution?: string;

  // Self-explanation responses
  selfExplanations?: Record<string, string>;  // promptId → response

  createdAt: string;
  updatedAt: string;
}

export interface NoteHighlight {
  id: string;
  startOffset: number;     // character offset in solution markdown
  endOffset: number;
  note?: string;           // inline note attached to this highlight
  createdAt: string;
}
```

### Database Schema

```sql
create table if not exists public.problem_notes (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  problem_id   text not null,
  mental_model text,
  approach     text,
  express_solution text,
  highlights   jsonb not null default '[]',
  self_explanations jsonb not null default '{}',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  unique (user_id, problem_id)
);

alter table public.problem_notes enable row level security;

create policy "Users can read own notes"
  on public.problem_notes for select using (auth.uid() = user_id);
create policy "Users can upsert own notes"
  on public.problem_notes for insert with check (auth.uid() = user_id);
create policy "Users can update own notes"
  on public.problem_notes for update using (auth.uid() = user_id);

create index idx_problem_notes_user
  on public.problem_notes (user_id);
```

### New Components

| Component | File | Complexity |
|-----------|------|------------|
| `<SolutionHighlighter />` | `src/components/notes/SolutionHighlighter.tsx` | High — text selection, offset tracking, overlay rendering |
| `<InlineNote />` | `src/components/notes/InlineNote.tsx` | Low — expandable text input anchored to highlight |
| `<MentalModelField />` | `src/components/notes/MentalModelField.tsx` | Low — textarea with rotating prompts |
| `<ApproachPrompt />` | `src/components/notes/ApproachPrompt.tsx` | Low — intercept modal before solution reveal |
| `<ExpressSolution />` | `src/components/notes/ExpressSolution.tsx` | Medium — markdown editor with KaTeX + compare view |
| `<CreateFlashcard />` | `src/components/notes/CreateFlashcard.tsx` | Medium — card creation form, integrates with useCustomSets |
| `<NotesSidebar />` | `src/components/notes/NotesSidebar.tsx` | Medium — aggregated view with navigation |
| `<SelfExplanationPrompt />` | `src/components/notes/SelfExplanationPrompt.tsx` | Low — expandable optional prompts |

### Hook

```typescript
// src/hooks/useNotes.ts
interface UseNotesReturn {
  getNoteForProblem: (problemId: string) => ProblemNote | null;
  saveMentalModel: (problemId: string, text: string) => void;
  saveApproach: (problemId: string, text: string) => void;
  saveExpressSolution: (problemId: string, text: string) => void;
  addHighlight: (problemId: string, highlight: NoteHighlight) => void;
  removeHighlight: (problemId: string, highlightId: string) => void;
  getNotesForChapter: (chapter: number) => ProblemNote[];
  exportNotes: (chapter: number) => string;  // formatted markdown
  noteCount: number;  // total notes across all problems
}
```

### Gamification Intensity

| Feature | Minimal | Standard | Full |
|---------|---------|----------|------|
| Mental model field | **Available** | Available | Available |
| Approach prompt (pre-solution) | **Available** | Available | Available |
| Inline highlights | **Available** | Available | Available |
| Notes sidebar | **Available** | Available | Available |
| Express mode | **Available** | Available | Available |
| Create flashcard | **Available** | Available | Available |
| XP for notes (+5/+15) | Hidden | **Awarded** | Awarded |
| "Notes taken" stat on dashboard | Hidden | Hidden | **Visible** |

Notes are a **learning feature, not gamification.** Available at all intensity levels. Only the XP reward and stats display follow gamification settings.

### Implementation Priority

| Priority | Component | Why This Order |
|----------|-----------|----------------|
| 1 | `<MentalModelField />` | Lowest complexity, highest cognitive value. The one-sentence summary is the single most impactful note type. |
| 2 | `useNotes` hook + localStorage persistence | Foundation for all note features |
| 3 | `<ApproachPrompt />` | Intercepts "Show Solution" — activates generation before revelation |
| 4 | `<NotesSidebar />` | Aggregated view makes notes discoverable and reviewable |
| 5 | `<SolutionHighlighter />` | Highest complexity — text selection and offset tracking |
| 6 | `<CreateFlashcard />` | Integrates with existing `useCustomSets` |
| 7 | `<ExpressSolution />` | Markdown editor with compare view |
| 8 | `<SelfExplanationPrompt />` | Content-dependent — needs prompts authored per problem |
| 9 | Supabase schema + sync | Migration, RLS policies |
| 10 | Technique Atlas cross-linking | Notes discoverable from Spec 05 technique pages |

---

## Sources

### Generation & Self-Explanation
- Slamecka & Graf (1978) — Generation effect
- Rosner et al. (2013, *Cortex*) — Neuroimaging: writing activates more brain regions than reading
- Chi et al. (1989, 1994) — Self-explanation effect in worked examples
- Renkl (1997, *European Journal of Psychology of Education*) — Self-explanation in mathematics
- Chi (2000) — Self-explanation meta-analysis (ERIC ED518041)

### Note-Taking & Writing
- Mueller & Oppenheimer (2014) — "The Pen Is Mightier Than the Keyboard"
- Urry et al. (2021) — Replication: medium doesn't matter, generative process does
- Brown, Roediger, McDaniel — Write-to-learn: half letter grade improvement
- Umejima et al. (2021, *Frontiers in Behavioral Neuroscience*) — Spatial retrieval cues in notes
- Bohay et al. (2011) — Note-taking method × learning outcome interaction
- RetrievalPractice.org — Retrieve-taking strategy

### Teaching & Protégé Effect
- Chase, Chin, Oppezzo, Schwartz (2009) — Protégé effect, 1.3× metacognitive strategies
- McGonigal — Quest to Learn's teachable agents ("Betty")
- Feynman Technique — operationalized protégé effect

### Progressive Summarization
- Forte (2022) — *Building a Second Brain*, CODE method, Intermediate Packets
- Note: No peer-reviewed empirical validation of Progressive Summarization as a named technique. Built on validated cognitive principles.

### Error Annotation
- McLaren et al. (2015) — Explaining erroneous worked examples > explaining correct only
- Chen et al. (2015) — Worked example × generation × element interactivity
