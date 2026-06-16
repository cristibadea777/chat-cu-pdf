import { useState } from "react"
import Chat from "./Chat"
import Prompt from "./Prompt"
import useTrimitePromptOllama from "./useTrimitePromptOllama"

const FereastraChat = ({ contextPDF, mesaje, setMesaje, salveazaConv }) => {
    const [promptInput, setPromptInput] = useState("")

    const { loading, trimitePrompt } = useTrimitePromptOllama({
        contextPDF,
        mesaje,
        setMesaje,
        salveazaConv
    })

    function trimite() {
        trimitePrompt(promptInput)
        setPromptInput("")
    }

    return (
        <div className="fereastra-chat">
            <Chat
                messages={mesaje}
                loading={loading}
            />

            <Prompt
                promptInput={promptInput}
                setPromptInput={setPromptInput}
                sendToOllama={trimite}
            />
        </div>
    )
}

export default FereastraChat