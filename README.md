# Kanbanterview

**An AI-Powered Application Tracker & Interview Coach**

Kanbanterview is an application tracking system designed as a Kanban board (similar to Trello or Jira), built specifically for developers looking for internships or jobs.

I created it while preparing my own applications, because existing trackers were either too generic or didn’t help me practice for technical interviews.  
Beyond a simple “to-do list”, it uses a production-style architecture and a local AI to simulate real technical interview rounds.

## Key Features

- **Interactive Kanban Board:**  
  A dynamic UI with smooth drag-and-drop to track applications across different stages (Applied, Interview, Offer, Rejected, etc.).

- **🤖 AI Interview Coach:**  
  A virtual recruiter powered by a local LLM (via Ollama + Llama 3.1). It acts like a senior tech recruiter and asks targeted, technical questions to prepare you for upcoming interviews.  
  For example, when you move a card to “Interview scheduled”, the coach can generate questions on Angular signals, ASP.NET Core APIs, or system design based on the job description.

- **Robust Architecture:**  
  A clean separation of concerns using a RESTful API to manage relational data securely and act as a bridge for AI prompting.  
  This project was also an opportunity for me to practice Angular signals, standalone components, and designing a REST API in ASP.NET Core.

## Tech Stack

- **Frontend:** Angular 22 (Standalone Components, Signals, CDK Drag & Drop, Reactive Forms)
- **Backend:** ASP.NET Core 8 Web API (C#, REST Architecture)
- **AI Engine:** Ollama (Local Inference) running Meta’s Llama 3.1 model

## Project Creator

Ali Haboula

2026-2027
