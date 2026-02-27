import React from 'react';

const languages = [
  { code: 'en', name: 'English', label: 'English' },
  { code: 'hi', name: 'Hindi', label: 'हिन्दी' },
  { code: 'te', name: 'Telugu', label: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', label: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', label: 'ಕನ್ನಡ' }
];

export default function LanguageSelector({ currentLang, onLangChange }) {
  return (
    <div className="language-buttons fade-in">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLangChange(lang)}
          className={currentLang.code === lang.code ? 'active' : ''}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
