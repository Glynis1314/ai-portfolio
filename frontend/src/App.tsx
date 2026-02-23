import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = async () => {
    if (!input) return;

    setMessages([...messages, { role: "user", text: input }]);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "bot", text: data.choices[0].message.content },
    ]);

    setInput("");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>AI Resume Chat</h2>

      <div>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.role}:</b> {m.text}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about Glynis..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;