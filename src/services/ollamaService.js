const OLLAMA_URL = "http://localhost:11434/api/chat"
const MODEL = "gemma4:latest"

export async function trimiteLaOllama({ mesaje, contextPDF }) {
    const mesajeOllama = mesaje.map(m => ({
        role: m.role,
        content: m.text
    }))

    const mesajSistem = contextPDF
        ? [{
            role: "system",
            content: `
                Analizează documentele de mai jos.
                Răspunde în limba română.
                Folosește informațiile din document când întrebarea are legătură cu el.
                Dacă informația nu apare în document, spune clar acest lucru.
                Document: ${contextPDF}
            `
        }]
        : []

    const response = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [...mesajSistem, ...mesajeOllama],
            stream: false,
            think: false,
            options: {
                num_ctx: 8192
            }
        })
    })

    if (!response.ok) {
        throw new Error("Eroare Ollama: " + response.status)
    }

    const data = await response.json()
    const mesaj = data.message?.content?.trim()

    if (!mesaj) {
        throw new Error("Mesaj gol")
    }

    return mesaj
}