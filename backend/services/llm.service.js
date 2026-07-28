require("dotenv").config();
const { GoogleGenAI } = require("@google/genai"); 
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

exports.generateAnswer = async (context, question) => {
    const prompt = `
You are an AI tutor.

Answer the user's question using ONLY the provided context.

Requirements:
- Produce a polished answer in Markdown.
- Use headings (##, ###).
- Explain concepts in your own words instead of copying sentences.
- Use bullet points only when appropriate.
- Highlight important terms using **bold**.
- Never say "Based on the provided context."
- Never mention the existence of the context.
- If the context does not contain the answer, clearly state that you couldn't find the information.
- Well formatted.

Context:
--------------------
${context}
--------------------

Question:
${question}
`;

    console.log(prompt);

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    return response.text;
}