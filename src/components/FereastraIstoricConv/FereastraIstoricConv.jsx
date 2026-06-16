const FereastraIstoricConv = ({ incarcaConversatia, conversatieNoua, istoricConversatii, stergeConv  }) => {

    function preview(mesaje) {
        const primul = mesaje.find(m => m.role === "user")
        return primul ? primul.text.slice(0, 40) : "Conversație goală"
    }

    function formatData(ts) {
        return new Date(ts).toLocaleDateString(
            "ro-RO", {
                day: "2-digit", 
                month: "short", 
                year: "numeric",
                hour: "2-digit", 
                minute: "2-digit"
            }
        )
    }

    return (
        <div className="fereastra-istoric-conv">

            <button onClick={conversatieNoua}>
                Conversație nouă
            </button>

            {istoricConversatii.length === 0
                ? <span className="istoric-gol">Nicio conversatie</span>
                : istoricConversatii.map(conv => (
                    <div key={conv.id} className="conv-item" onClick={() => incarcaConversatia(conv)}>
                        <div className="conv-preview">{preview(conv.mesaje)}</div>
                        <div className="conv-data">{formatData(conv.timestamp)}</div>
                        <button onClick={e => { e.stopPropagation(); stergeConv(conv.id) }}>
                            Șterge
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default FereastraIstoricConv