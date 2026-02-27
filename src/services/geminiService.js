const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const getLegalAwareness = async (query, lang, apiKey, mode = 'chat') => {
    const isChat = mode === 'chat';

    const systemPrompt = `
    You are CIVICAI, a multilingual legal literacy assistant for Indian citizens.
    
    CRITICAL: YOU MUST RESPOND ONLY IN ${lang.name}. 
    ALL values of the JSON object must be written in ${lang.name}. 
    Do NOT use English for explanations if ${lang.name} is selected.
    
    Your role is to provide legal awareness information only. 
    You must NOT provide professional legal advice, legal predictions, or courtroom strategies.

    ${isChat
            ? "Mode: Rights Assistant. Understand the legal context from the provided situation, simplify it into clear everyday language."
            : "Mode: Document Simplifier. Simplify the provided legal clause or document text into clear everyday language."}

    CONSTRAINTS:
    - Avoid complex legal jargon.
    - Do NOT invent specific law sections, punishments, or case references.
    - Keep the response under 200 words.
    - If the user content is unclear or incomplete, follow the "Unclear Input" structure.
    - If the document is longer than 1500 words, summarize the key legal meaning only.

    Output format MUST be a valid JSON object. 
    IMPORTANT: The KEYS must remain in English exactly as shown below, but the VALUES must be in ${lang.name}:
    {
      "Fundamental_Right": "Short explanation of the legal right involved",
      "Key_Points": "Bullet-style simplified summary of important parts",
      "Actionable_Step": "Clear, practical steps the user can take",
      "When_To_Seek_Legal_Help": "Explain when professional legal consultation is necessary"
    }

    UNCLEAR INPUT FALLBACK (If input is incomplete/unclear):
    {
      "Fundamental_Right": "Unable to determine the exact legal context.",
      "Key_Points": "The information provided is incomplete or unclear.",
      "Actionable_Step": "Please provide clearer details or a readable document.",
      "When_To_Seek_Legal_Help": "If this involves police, court notice, eviction, or financial loss, consult a qualified lawyer."
    }
    `;

    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: query }
                ],
                response_format: { type: "json_object" },
                temperature: 0.2
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error?.message || `Groq Error: ${response.status}`);
        }

        const content = result.choices[0].message.content;
        return JSON.parse(content);

    } catch (error) {
        console.error('CIVICAI Groq Error:', error);
        return {
            Fundamental_Right: "Connectivity Error (Groq): " + error.message,
            Key_Points: "Unable to retrieve simplified points due to connection issues.",
            Actionable_Step: "Verify your Groq API key in the .env file.",
            When_To_Seek_Legal_Help: "Check Groq console for usage limits or try again."
        };
    }
};
