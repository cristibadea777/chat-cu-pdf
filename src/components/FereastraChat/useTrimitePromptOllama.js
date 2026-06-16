import { useCallback, useState } from "react"
import { trimiteLaOllama } from "../../services/ollamaService"

const useTrimitePromptOllama = ({
    contextPDF,
    mesaje,
    setMesaje,
    salveazaConv
}) => {
    const [loading, setLoading] = useState(false)

    const trimitePrompt = useCallback(async (text) => {
        const textTrimis = text.trim()

        if (!textTrimis) return
        if (loading) return

        const userMessage = {
            role: "user",
            text: textTrimis
        }

        const newMessages = [
            ...mesaje,
            userMessage
        ]

        setMesaje(newMessages)
        setLoading(true)

        try {
            const raspuns = await trimiteLaOllama({
                mesaje: newMessages,
                contextPDF
            })

            const mesajeFinale = [
                ...newMessages,
                {
                    role: "assistant",
                    text: raspuns
                }
            ]

            setMesaje(mesajeFinale)
            salveazaConv(mesajeFinale)

        } catch (err) {
            console.error(err)

            const mesajeFinale = [
                ...newMessages,
                {
                    role: "assistant",
                    text: "Eroare: " + err.message
                }
            ]

            setMesaje(mesajeFinale)
        } finally {
            setLoading(false)
        }

    }, [
        mesaje,
        loading,
        contextPDF,
        setMesaje,
        salveazaConv
    ])

    return {
        loading,
        trimitePrompt
    }
}

export default useTrimitePromptOllama