import React, { useState, useEffect } from 'react';

const langMap = {
    en: 'en-IN',
    hi: 'hi-IN',
    te: 'te-IN',
    ta: 'ta-IN',
    kn: 'kn-IN'
};

export default function VoiceInput({ currentLang, onTranscription }) {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recog = new SpeechRecognition();
            recog.continuous = false;
            recog.interimResults = false;

            recog.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                onTranscription(transcript);
                setIsListening(false);
            };

            recog.onerror = () => setIsListening(false);
            recog.onend = () => setIsListening(false);

            setRecognition(recog);
        }
    }, [onTranscription]);

    const toggleListening = () => {
        if (!recognition) return;

        if (isListening) {
            recognition.stop();
        } else {
            recognition.lang = langMap[currentLang.code] || 'en-IN';
            recognition.start();
            setIsListening(true);
        }
    };

    if (!recognition) return <p style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>Voice input not supported in this browser.</p>;

    return (
        <div className="mic-wrapper">
            <button
                onClick={toggleListening}
                className={`mic-button ${isListening ? 'listening' : ''}`}
            >
                {isListening ? '⏹' : '🎤'}
            </button>
            <span>
                {isListening
                    ? (currentLang.code === 'en' ? 'Listening...' : (currentLang.code === 'hi' ? 'सुन रहे हैं...' : (currentLang.code === 'te' ? 'వింటున్నారు...' : (currentLang.code === 'ta' ? 'கேட்கிறது...' : 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...'))))
                    : (currentLang.code === 'en' ? 'Tap for Voice' : (currentLang.code === 'hi' ? 'बोलने के लिए दबाएं' : (currentLang.code === 'te' ? 'మాట్లాడటానికి నొక్కండి' : (currentLang.code === 'ta' ? 'பேச தட்டவும்' : 'ಧ್ವನಿಗಾಗಿ ಟ್ಯಾಪ್ ಮಾಡಿ'))))
                }
            </span>
        </div>
    );
}
