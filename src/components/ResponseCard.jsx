import React from 'react';

export default function ResponseCard({ data, lang }) {
    if (!data) return null;

    const labels = {
        en: {
            right: 'Fundamental Right',
            points: 'Key Points',
            action: 'Actionable Step',
            help: 'When to Seek Legal Help'
        },
        hi: {
            right: 'मौलिक अधिकार',
            points: 'मुख्य बिंदु',
            action: 'कार्यवाही कदम',
            help: 'कानूनी सहायता कब लें'
        },
        te: {
            right: 'ప్రాథమిక హక్కు',
            points: 'ముఖ్య అంశాలు',
            action: 'చేయవలసిన పనులు',
            help: 'చట్టపరమైన సహాయం ఎప్పుడు పొందాలి'
        },
        ta: {
            right: 'அடிப்படை உரிமை',
            points: 'முக்கிய புள்ளிகள்',
            action: 'நடவடிக்கை படி',
            help: 'சட்ட உதவியை எப்போது பெற வேண்டும்'
        },
        kn: {
            right: 'ಮೂಲ ಹಕ್ಕು',
            points: 'ಮುಖ್ಯಾಂಶಗಳು',
            action: 'ಕ್ರಮ ಕೈಗೊಳ್ಳುವ ಹಂತ',
            help: 'ಕಾನೂನು ನೆರವು ಯಾವಾಗ ಪಡೆಯಬೇಕು'
        }
    };

    const currentLabels = labels[lang.code] || labels.en;

    return (
        <div className="response-card fade-in">
            <div className="card majestic-border">
                <h4 className="label-gold">{currentLabels.right}</h4>
                <p className="response-text">{data.Fundamental_Right}</p>

                <h4 className="label-gold">{currentLabels.points}</h4>
                <div className="response-text">
                    {data.Key_Points?.split('\n').map((point, i) => (
                        <p key={i} className="point-item">{point}</p>
                    ))}
                </div>

                <h4 className="label-gold">{currentLabels.action}</h4>
                <p className="response-text">{data.Actionable_Step}</p>

                <h4 className="label-gold">{currentLabels.help}</h4>
                <p className="response-text">{data.When_To_Seek_Legal_Help}</p>
            </div>
        </div>
    );
}
