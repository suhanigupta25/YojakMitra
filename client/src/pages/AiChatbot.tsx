import React, { useState } from "react";
import "./AiChatbot.css"

interface Message {
    sender: "user" | "ai";
    text: string;
}

const AiAssistant = () => {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (!trimmedQuery || isLoading) return;

        // 1. Immediately append the user's message to the chat layout
        const userMessage: Message = { sender: "user", text: trimmedQuery };
        setMessages((prev) => [...prev, userMessage]);
        setQuery(""); // Clear the input field immediately
        setIsLoading(true);

        try {
            // 2. Make the real network request to your backend endpoint
            const response = await fetch("http://localhost:5000/aiassistant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: trimmedQuery }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            
            // 3. Append the real AI response from the server
            setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
        } catch (error) {
            console.error("Error communicating with AI backend:", error);
            setMessages((prev) => [
                ...prev, 
                { sender: "ai", text: "Sorry, I encountered an error. Please try again later." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ai-minimal-section">
            <div className="ai-minimal-wrapper">
                
                {/* Condition: Show header only when there are no messages yet */}
                {messages.length === 0 && (
                    <div className="ai-minimal-header">
                        <h2>Consult YojnaMitra AI</h2>
                        <p>
                            Describe your personal profile, regional context, or structural requirements naturally to begin an assisted evaluation.
                        </p>
                    </div>
                )}

                {/* The Active Chat View (replaces the void frame) */}
                <div className="ai-minimal-void">
                    <div className="chat-history-container">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-bubble ${msg.sender}`}>
                                <p>{msg.text}</p>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="chat-bubble ai typing-indicator">
                                <p>Thinking...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Integrated Input Base Interface at the bottom */}
                <form className="ai-minimal-input-form" onSubmit={handleChatSubmit}>
                    <div className="ai-input-container">
                        <input
                            type="text"
                            placeholder={isLoading ? "AI is typing..." : "Type a message..."}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={isLoading}
                            autoFocus
                        />
                        <button type="submit" className="btn-ai-submit" disabled={isLoading || !query.trim()}>
                            {messages.length === 0 ? "Initialize" : "Send"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AiAssistant;