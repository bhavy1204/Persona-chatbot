import { useState } from "react";

export default function ChatApp({ botId }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;
        const res = await fetch(`http://localhost:5000/chat/${botId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input })
        });
        const data = await res.json();
        setMessages(data.history);
        setInput("");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>{botId === "hitesh" ? "Hitesh Choudhary" : "Piyush Garg"} Bot</h2>
            <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
                {messages.map((m, i) => (
                    <div key={i}><strong>{m.role}:</strong> {m.content}</div>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{ width: "70%" }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
