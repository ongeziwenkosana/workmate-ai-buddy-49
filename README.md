# WorkMate AI – Workplace Productivity Assistant

WorkMate AI is an integrated workplace productivity platform that demonstrates practical AI implementation, prompt engineering, responsible AI use, and professional UI/UX. It provides three AI-powered workspaces in one modern SaaS-style dashboard.

## Features

### Smart Email Generator
- Recipient/audience (optional), purpose, and key points inputs
- Tone selector: Formal, Friendly, Persuasive, Professional
- Generates a clear, professional email based only on the information provided
- Editable output with one-click copy
- Sample brief included for quick demos

### Meeting Notes Summarizer
- Large input area for raw meeting notes
- Structured output: Summary, Key Decisions, Action Items, Deadlines, People Responsible, Open Questions
- Missing owners/deadlines are shown as "Unassigned" / "Not specified" — never guessed
- Editable and copyable output
- Realistic sample notes included

### AI Task Planner
- Multiple task entry with deadline information
- Priority selection: High, Medium, Low
- Daily or Weekly planning option
- Schedule organised by priority, deadline, suggested order, and time allocation
- Urgent/high-priority tasks clearly highlighted
- Editable and copyable output
- Sample tasks included

### Dashboard
- Workspace cards linking to each tool
- "How WorkMate Works" — Describe the work → Generate → Review, edit, copy
- Responsible AI notice and guidance on what not to enter

## Responsible AI

AI-generated content should always be reviewed by the user before professional use. Do not enter confidential, private or sensitive company information. AI outputs may contain errors and should be verified.

Do not enter:
- Client names
- Contracts or NDA information
- Personal data
- Passwords or API keys
- Internal financial figures

## Prompt Engineering

Each tool uses a separate structured prompt that defines:
- **Role** — what the AI is (e.g. a workplace productivity planning assistant)
- **Task** — what it must produce
- **User-provided information** — the only facts it may use
- **Output format** — the required structure
- **Constraints** — no invented facts, dates, owners, or figures

## Tech Stack

- [TanStack Start](https://tanstack.com/start) (React 19, SSR, server functions)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Lovable AI Gateway (no API keys required from users)

## Design

"Frosted Glass Calm" — clean light background, professional blue accents, subtle frosted-glass cards, generous spacing, responsive across desktop, tablet, and mobile.

## Development

```sh
npm i
npm run dev
```

## License

Built with [Lovable](https://lovable.dev).
