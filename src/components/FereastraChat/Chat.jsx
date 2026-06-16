import { useEffect, useRef } from "react"

const Chat = ({ messages, loading }) => {

    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    function clasaMesaj(msg) {
        if (msg.role === "user") return "user-message"
        if (msg.role === "system-info") return "system-info-message"
        return "assistant-message"
    }

    return (
        <div className="chat" ref={scrollRef}>
            {messages.map((msg, i) => (
                <div
                    key={i}
                    className={clasaMesaj(msg)}
                >
                    {msg.text}
                </div>
            ))}

            {loading && (
                <div className="assistant-message">
                    Thinking...
                </div>
            )}
        </div>
    )
}

export default Chat