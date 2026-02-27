🛠 Technical Stack Specification
🏷 Project: CIVICAI – Multilingual Legal Literacy Platform
1️⃣ Frontend Layer (The Experience)

Framework: Antigravity (Low-Code / No-Code Builder)
Role: Rapid UI assembly, state management, and API orchestration

Styling: CSS3 (Custom + Auto-generated)
Design System: Minimalist, high-contrast, card-based layout using a Blue & White professional palette

Typography: Google Noto Sans (Multi-script Support)
Purpose: Ensures accurate rendering of Devanagari (Hindi), Telugu, Tamil, Kannada, and English characters

Responsiveness:

HTML5 + CSS Media Queries

Optimized for low-cost mobile devices

2️⃣ Voice Processing Layer (The Input)

Technology: Native Browser Web Speech API

Implementation: Locale-aware Speech-to-Text (STT)

Supported Locales:

en-IN (Indian English)

hi-IN (Hindi)

te-IN (Telugu)

ta-IN (Tamil)

kn-IN (Kannada)

Advantages:

Zero additional server cost

Real-time processing

No backend dependency

Lightweight and scalable

3️⃣ Intelligence Layer (The Brain)

Core Model: Google Gemini 1.5 Flash

Capabilities:

Multilingual NLP reasoning

Legal text simplification

Structured JSON output generation

Context understanding across Indian languages

Special Features Used:

JSON Mode → Ensures UI-ready structured response

Plain Language Simplification → Converts IPC/BNSS content into understandable text

Connectivity:
REST API integration via Antigravity Logic Blocks

4️⃣ Logic & Integration Layer (The Glue)

Execution Engine: Antigravity Logic Blocks

Responsibilities:

Dynamic prompt generation

Language injection into system prompt

Input validation (empty input detection)

API error handling

Structured response formatting

Prompt Engineering Strategy:
Role-Based System Instruction

Template Example:

"You are a legal awareness guide for [Selected Language].
Simplify the user's query into 3 structured sections:

Fundamental Right

Actionable Step

When Professional Legal Advice is Required.
Do not provide direct legal advice."

5️⃣ Data Layer (The Foundation)

Storage Type: UTF-8 Encoded Local JSON Dataset

Content Includes:

Tenant rights

Consumer rights

Police procedure rights

Workplace-related rights

Purpose:

Prevent AI hallucination

Provide fallback responses

Enable instant answer mode

Encoding Standard:
Full Unicode support for multilingual script integrity

6️⃣ Security & Performance Layer
🔐 Security Design

Stateless Architecture (No user data stored)

No document persistence

Secure API key handling inside Antigravity environment

Explicit disclaimer enforcement

Browser-level microphone permission handling

⚡ Performance Design

Asynchronous API calls

Non-blocking UI rendering

Lightweight frontend processing

Target Latency: < 4 seconds (Voice → Structured Response)

📊 Stack Summary Table
Layer	Technology	Key Advantage
UI	Antigravity	Rapid development
AI	Gemini 1.5 Flash	Multilingual reasoning + JSON output
Voice	Web Speech API	Accessibility & zero cost
Fonts	Google Noto Sans	Regional script compatibility
Logic	Antigravity Blocks	Low maintenance & fast iteration
Data	Local JSON (UTF-8)	Accuracy + instant fallback
🏁 Implementation Readiness

CIVICAI uses a fully integrated lightweight architecture:

Voice input via Browser API

AI reasoning via Gemini

Logic orchestration via Antigravity

No external backend server required

This eliminates infrastructure complexity and enables stable hosting on static or low-cost platforms.

The system is optimized for hackathon deployment and scalable for future RAG-based expansion.