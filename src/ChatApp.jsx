import React, { useState } from "react";
import "./ChatApp.css"

export default function ChatApp() {
  const [messages, setMessages] = useState([]); // {role: 'user'|'bot', text: string}
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Send to backend
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      // Add bot reply
      setMessages([...newMessages, { role: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* <img src="hitesh.png" alt="image" className="logo" /> */}
      <div className="chat-area">
        <div className="chat-container">
          <div className="messages">
            {messages.length===0? <p className="initial">What's on the agenda today?</p> : ""}
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <strong>{msg.role === "user" ? "You" : "Hitesh sir"}</strong>
                {msg.text}
              </div>
            ))}
          </div>
          {loading && <p>...</p>}

          <div className="input">
            <input
              type="text"
              className="text-area"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask your doubt"
            />
            <button onClick={sendMessage} >Sendd</button>
          </div>
        </div>
      </div>
    </>
  );
}

{/* <div className="">
      <h2 className="row">AI Chatbot</h2>
      <div>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <strong>{msg.role === "user" ? "You" : "Bot"}: </strong>
            {msg.text}
          </div>
        ))}
        {loading && <p>Bot is typing...</p>}
      </div>

      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button className=" text-upppercase" onClick={sendMessage}>Send</button>
      </div>
    </div> */}
