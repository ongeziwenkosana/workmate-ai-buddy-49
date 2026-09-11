# WorkMate AI

Build a complete, functional, responsive web application called WorkMate AI – Workplace Productivity Assistant.

This is ONE integrated workplace productivity platform, not separate projects. The goal is to demonstrate practical AI implementation, prompt engineering, responsible AI use, and professional UI/UX.

CORE REQUIREMENTS

Create a modern SaaS-style dashboard with a sidebar navigation and exactly these 3 AI-powered workspaces:

Smart Email Generator

Meeting Notes Summarizer

AI Task Planner

All three must be accessible from the sidebar and must be functional.

1. SMART EMAIL GENERATOR

Create a page called Smart Email Generator.

Include:

Recipient or audience (optional)

Purpose of the email

Key points to cover

Tone selector with:

Formal

Friendly

Persuasive

Professional

Generate Email button

AI-generated output area

Editable generated email

Copy button

The AI should generate a clear, professional email based only on the information provided by the user.

Use a structured prompt that defines:

The AI's role

The user's task

The information provided

The selected tone

The required output format

Constraints against inventing facts

Include a realistic sample brief so the feature can be demonstrated without entering real company information.

2. MEETING NOTES SUMMARIZER

Create a page called Meeting Notes Summarizer.

Include:

Large text input area for raw meeting notes

Summarize Meeting button

AI-generated output

The output must clearly organise information into:

Summary

Key Decisions

Action Items

Deadlines

People Responsible

Open Questions

Allow the generated output to be edited and copied.

Use a structured AI prompt that instructs the AI to extract information from the notes without inventing missing details.

If an owner or deadline is not provided, clearly indicate "Unassigned" or "Not specified" instead of guessing.

Include realistic sample meeting notes.

3. AI TASK PLANNER

Create a page called AI Task Planner.

Include:

Task input area

Ability to enter multiple tasks

Deadline information

Priority selection:

High

Medium

Low

Daily or Weekly planning option

Generate Schedule button

AI-generated schedule

The output should organise tasks by:

Priority

Deadline

Suggested order

Practical time allocation

Clearly highlight urgent/high-priority tasks.

Allow the generated schedule to be edited and copied.

Use a structured AI prompt that defines the AI as a workplace productivity planning assistant and instructs it not to invent deadlines or information that the user did not provide.

Include realistic sample tasks.

DASHBOARD

Create a professional dashboard home page called Dashboard.

Include:

Your Workspaces

Three cards:

Smart Email

Meeting Notes

Task Planner

Each card should contain a short description and a button linking to the relevant workspace.

How WorkMate Works

Display these three steps:

Describe the work

Generate

Review, edit, copy

Explain that structured prompts are used to guide the AI.

Responsible AI

Include a visible Responsible AI notice stating:

"AI-generated content should always be reviewed by the user before professional use. Do not enter confidential, private or sensitive company information. AI outputs may contain errors and should be verified."

Also explain that users should not enter:

Client names

Contracts or NDA information

Personal data

Passwords or API keys

Internal financial figures

DESIGN

Use a design called Frosted Glass Calm.

Design requirements:

Clean white/light background

Professional blue accents

Subtle frosted-glass cards

Modern SaaS aesthetic

Professional workplace appearance

Clear typography

Generous spacing

Easy-to-read forms and outputs

Consistent buttons and cards

Professional icons

Minimal visual clutter

Create a persistent sidebar with:

Dashboard

Email Generator

Meeting Summarizer

Task Planner

Include responsive mobile navigation.

The application must work well on desktop, tablet and mobile.

FUNCTIONALITY

This must be a functional application, not merely a visual mock-up.

Each of the three tools must:

Accept user input

Send the input through the appropriate AI logic

Generate an AI response

Display the response clearly

Allow the user to edit the response

Allow the user to copy the response

Include:

Loading states

Empty states

Error handling

Clear success states

Use the platform's available AI/backend functionality to implement the three AI tools.

Do not require users to enter API keys.

PROMPT ENGINEERING

Use separate structured prompts for each AI feature.

Each prompt should clearly define:

Role

Task

User-provided information

Output format

Constraints

Responsible AI requirements

The prompts should prioritise accuracy, transparency and avoiding fabricated information.

IMPORTANT BUILD INSTRUCTIONS

Build the entire application in this first build.

Create all three pages and the dashboard together.

Do not create unnecessary extra features.

Do not create a portfolio website.

Do not add unrelated pages.

Do not use fictional company credentials or personal information.

Prioritise having all three AI tools functional over adding decorative features.

The final application should look like a polished workplace productivity product suitable for a student AI project demonstration.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://workmate-ai-buddy-49.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1b1abd9f-1e03-4d0a-9536-8f3c4d76aca6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
