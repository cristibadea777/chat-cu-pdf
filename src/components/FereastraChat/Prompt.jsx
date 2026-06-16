const Prompt = ({promptInput, setPromptInput, sendToOllama}) => {
    return (
        <div className="prompt">
            <textarea 
                className="prompt-textarea"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Mesaj..."
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        e.preventDefault()
                        sendToOllama()
                    }
                }}
            />
            <button onClick={sendToOllama}>Trimite</button>
        </div>
    )
}
export default Prompt