# CIVICAI – Majestic Legal Literacy Assistant

CIVICAI is a premium, multilingual legal literacy web application designed for Indian citizens. It leverages cutting-edge AI to simplify legal jargon and provide accessible information about fundamental rights and actionable legal steps.

## Key Features

- **Majestic Visuals**: A cinematic, high-end UI with glassmorphism and photorealistic legal imagery.
- **AI-Powered Analysis**: Driven by **Groq (Llama-3-70b)** for lightning-fast, accurate legal awareness.
- **Multilingual Support**: Fully localized in English, Hindi, Telugu, Tamil, and Kannada.
- **Versatile Input**:
    - **Natural Language**: Type your legal questions or situations.
    - **Voice Input**: Tap the mic to ask questions in your native language.
    - **Document Processing**: Upload PDFs, DOCX, or Images (OCR) for instant simplification.
- **Privacy & Policy**: Strictly provides awareness and literacy, emphasizing when to seek professional legal help without providing actual "advice".

## Technology Stack

- **Frontend**: React + Vite
- **Styling**: Vanilla CSS with custom property systems and Backdrop Blurs.
- **AI Integration**: Groq Cloud API
- **File Extraction**: 
    - PDF.js (PDFs)
    - Mammoth (Word documents)
    - Tesseract.js (Multi-language OCR for images)

## Getting Started

1. Clone the repository.
2. Create a `.env` file and add your Groq API key:
   ```env
   VITE_GROQ_API_KEY=your_key_here
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Disclaimer
CIVICAI provides legal awareness information only. It is not a substitute for professional legal advice. Always consult a qualified lawyer for legal proceedings.
