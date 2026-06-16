import { useEffect, useRef } from "react";

const Chat = ({messages, loading}) => {

    //pt scroll dupa fiecare mesaj nou
    const scrollRef = useRef(null)
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    return (
        <div className="chat" ref={scrollRef}>
            {messages.map((msg, i) => (
                <div 
                    key={i}
                    className={msg.role === "user" ? "user-message" : "assistant-message"}
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
    );
};
export default Chat;