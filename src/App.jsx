import React, { useState, useEffect } from 'react';
import LanguageSelector from './components/LanguageSelector';
import VoiceInput from './components/VoiceInput';
import ResponseCard from './components/ResponseCard';
import { getLegalAwareness } from './services/geminiService';
import { extractTextFromFile } from './services/fileExtractionService';
import './index.css';

function App() {
  const [lang, setLang] = useState({ code: 'en', name: 'English', label: 'English' });
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';

  useEffect(() => {
    if (apiKey) {
      console.log("CIVICAI: Groq API Key detected (automatic mode)");
    } else {
      console.warn("CIVICAI: No Groq API Key found in environment variables");
    }
  }, [apiKey]);

  const handleTranscription = (text) => {
    setQuery(text);
    if (apiKey) {
      handleSearch(text);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setExtracting(true);
    setResponse(null);
    try {
      const extractedText = await extractTextFromFile(file);
      setQuery(extractedText);
      if (apiKey) {
        handleSearch(extractedText);
      }
    } catch (error) {
      console.error("Extraction error:", error);
      setResponse({
        Fundamental_Right: "File Error",
        Key_Points: "Could not read the uploaded file correctly.",
        Actionable_Step: error.message,
        When_To_Seek_Legal_Help: "Please try a different file format or paste the text manually."
      });
    } finally {
      setExtracting(false);
      event.target.value = '';
    }
  };

  const handleSearch = async (textToSearch = query) => {
    if (!textToSearch.trim()) return;
    if (!apiKey) {
      console.warn("Groq API Key is missing. Please set VITE_GROQ_API_KEY in .env");
      setResponse({
        Fundamental_Right: "Configuration Error",
        Key_Points: "API Key is not configured.",
        Actionable_Step: "The developer needs to provide the API Key in the environment settings.",
        When_To_Seek_Legal_Help: "Please check back later once connectivity is restored."
      });
      return;
    }

    setLoading(true);
    setResponse(null);
    const result = await getLegalAwareness(textToSearch, lang, apiKey, 'chat');
    setResponse(result);
    setLoading(false);
  };

  const placeholders = {
    en: "Describe your legal question or upload a document...",
    hi: "अपनी कानूनी समस्या बताएं या दस्तावेज़ अपलोड करें...",
    te: "మీ చట్టపరమైన ప్రశ్నను వివరించండి లేదా ఫైల్‌ను అప్‌లోಡ್ చేయండి...",
    ta: "உங்கள் சட்டக் கேள்வியை விவரிக்கவும் அல்லது ஆவணத்தைப் பதிவேற்றவும்...",
    kn: "ನಿಮ್ಮ ಕಾನೂನು ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ ಅಥವಾ ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ..."
  };

  return (
    <div className="main-container">
      <header className="fade-in">
        <h1 className="app-title">CIVICAI</h1>
        <p className="subtitle">Justice Made Accessible. Multilingually.</p>

        <div className="api-badge-container">
          <span className={`api-badge ${apiKey ? 'success' : 'warning'}`}>
            {apiKey ? 'CONNECTED' : 'OFFLINE'}
          </span>
        </div>
      </header>

      <LanguageSelector currentLang={lang} onLangChange={setLang} />

      <main className="fade-in">
        <div className="card">
          <textarea
            placeholder={placeholders[lang.code] || placeholders.en}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="action-row">
            <div className="left-actions">
              <VoiceInput currentLang={lang} onTranscription={handleTranscription} />

              <div className="upload-wrapper">
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf,.docx,image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <button
                  className="upload-btn"
                  onClick={() => document.getElementById('file-upload').click()}
                  disabled={extracting}
                >
                  {extracting ? <div className="spinner"></div> : '📁 Upload'}
                </button>
              </div>
            </div>

            <button
              className="ask-btn"
              onClick={() => handleSearch()}
              disabled={loading || extracting}
            >
              {loading ? <div className="spinner"></div> : (lang.code === 'en' ? 'Ask Assistant' : (lang.code === 'hi' ? 'असिस्टेंट से पूछें' : (lang.code === 'te' ? 'అసిస్టెంట్‌ని అడగండి' : (lang.code === 'ta' ? 'அசிஸ்டெண்டிடம் கேளுங்கள்' : 'ಸಹಾಯಕನನ್ನು ಕೇಳಿ'))))}
            </button>
          </div>
        </div>

        <ResponseCard data={response} lang={lang} />

        <div className="disclaimer">
          {lang.code === 'en' ? 'CIVICAI provides legal awareness only. This is not professional legal advice.' : (lang.code === 'hi' ? 'CIVICAI केवल कानूनी जागरूकता प्रदान करता है। यह पेशेवर कानूनी सलाह नहीं है।' : (lang.code === 'te' ? 'CIVICAI చట్టపరమైన అవగాహనను మాత్రమే అందిస్తుంది. ఇది వృత్తిపరమైన చట్టపరమైన సలహా కాదు.' : 'CIVICAI provides legal awareness only.'))}
          <br />
          {lang.code === 'en' ? 'If you are facing police action or court proceedings, please consult a qualified lawyer immediately.' : (lang.code === 'hi' ? 'यदि आप पुलिस कार्रवाई या अदालती कार्यवाही का सामना कर रहे हैं, तो कृपया तुरंत एक योग्य वकील से परामर्श लें।' : (lang.code === 'te' ? 'మీరు పోలీసు చర్య లేదా కోర్టు విచారణలను ఎదుర్కొంటున్నట్లయితే, దయచేసి వెంటనే అర్హత కలిగిన న్యాయవాదిని సంప్రదించండి.' : ''))}
        </div>
      </main>
    </div>
  );
}

export default App;
