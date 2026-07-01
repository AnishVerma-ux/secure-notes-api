import { useState, useRef, useEffect } from "react";
import noteService from "../../services/noteService";
import "./ChatBot.css";

function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! Ask me anything about your notes 📝" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await noteService.getNotes();
                setNotes(res.data);
            } catch (e) {
                console.error("Failed to load notes for chatbot", e);
            }
        };
        fetchNotes();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const buildContext = () => {
        if (notes.length === 0) return "The user has no notes yet.";
        return notes.map((n, i) =>
            `Note ${i + 1}:\nTitle: ${n.title}\nContent: ${n.content}`
        ).join("\n\n");
    };

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: "user", content: input };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            const notesContext = buildContext();

            const chatHistory = updatedMessages
                .filter((m, i) => i > 0)
                .map(m => ({ role: m.role, content: m.content }));

            const response = await fetch("https://secure-notes-api-y3hh.onrender.com/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    messages: chatHistory,
                    notesContext
                })
            });

            if (!response.ok) {
                throw new Error("Backend error");
            }

            const data = await response.json();
            setMessages(prev => [...prev, {
                role: "assistant",
                content: data.reply || "Sorry, no response received."
            }]);

        } catch (e) {
            console.error(e);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "Something went wrong. Please try again."
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        setMessages([
            { role: "assistant", content: "Hi! Ask me anything about your notes 📝" }
        ]);
    };

    return (
        <>
            <button
                className="chat-fab"
                onClick={() => setOpen(o => !o)}
                title="Chat with your notes"
            >
                {open ? "✕" : "💬"}
            </button>

            {open && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div>
                            <p className="chat-title">Notes Assistant</p>
                            <p className="chat-subtitle">
                                {notes.length} note{notes.length !== 1 ? "s" : ""} loaded
                            </p>
                        </div>
                        <div style={{ display: "flex", gap: "6px" }}>
                            <button
                                className="chat-close"
                                onClick={clearChat}
                                title="Clear chat"
                            >
                                🗑
                            </button>
                            <button
                                className="chat-close"
                                onClick={() => setOpen(false)}
                                title="Close"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-msg ${msg.role}`}>
                                {msg.role === "assistant" && (
                                    <div className="chat-avatar">🤖</div>
                                )}
                                <div className="chat-bubble">{msg.content}</div>
                                {msg.role === "user" && (
                                    <div className="chat-avatar">👤</div>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className="chat-msg assistant">
                                <div className="chat-avatar">🤖</div>
                                <div className="chat-bubble typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <div className="chat-input-wrap">
                        <textarea
                            className="chat-input"
                            placeholder="Ask about your notes..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            rows={1}
                        />
                        <button
                            className="chat-send"
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBot;