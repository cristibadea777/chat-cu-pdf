import { useCallback, useState } from "react"
import Chat from "./Chat"
import Prompt from "./Prompt"

const FereastraChat = ({ contextPDF, mesaje, setMesaje, salveazaConv }) => {

    const [promptInput, setPromptInput] = useState("")
    const [loading,     setLoading]     = useState(false)

    const userMessage = { role: "user", text: promptInput }

    const sendToOllama = useCallback(async () => {
        if (!promptInput.trim()) return
        if (loading) return

        const newMessages  = [...mesaje, userMessage]
        const ollamaMessage = newMessages.map(m => ({
            role:    m.role,
            content: m.text
        }))

        setMesaje(newMessages)
        setPromptInput("")
        setLoading(true)

        const mesajSistem = contextPDF
            ? [{ role: "system", content: "Analizeaza documentele:\n" + contextPDF }]
            : []

        try {
            const response = await fetch("http://localhost:11434/api/chat", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model:    "gemma4:latest",
                    messages: [...mesajSistem, ...ollamaMessage],
                    stream:   false,
                    think:    false,
                    options:  { num_ctx: 8192 }
                })
            })

            if (!response.ok) throw new Error(response.status)

            const data  = await response.json()
            const mesaj = data.message?.content?.trim()

            if (!mesaj) throw new Error("Mesaj gol")

            const mesajeFinale = [...newMessages, { role: "assistant", text: mesaj }]
            setMesaje(mesajeFinale)
            salveazaConv(mesajeFinale)

        } catch (err) {
            console.error(err)
            setMesaje([...newMessages, {
                role: "assistant",
                text: "Eroare: " + err.message
            }])
        } finally {
            setLoading(false)
        }

    }, [mesaje, promptInput, loading])

    return (
        <div className="fereastra-chat">
            <Chat
                messages = {mesaje}
                loading  = {loading}
            />
            <Prompt
                promptInput    = {promptInput}
                setPromptInput = {setPromptInput}
                sendToOllama   = {sendToOllama}
            />
        </div>
    )
}

export default FereastraChat