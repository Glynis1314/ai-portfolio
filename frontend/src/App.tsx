import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = input;

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });

    const data = await res.json();

    setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
  };

  return (
    <div style={{
      height: "100vh",
      background: "#0f172a",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        width: 380,
        height: 600,
        background: "#020617",
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 25px black"
      }}>

        <div style={{
          padding: 15,
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          borderBottom: "1px solid #1e293b"
        }}>
          🤖 Glynis AI Portfolio
        </div>

        <div style={{
          flex: 1,
          padding: 10,
          overflowY: "auto"
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              maxWidth: "80%",
              padding: 10,
              margin: "8px 0",
              borderRadius: 10,
              marginLeft: m.role === "user" ? "auto" : 0,
              background: m.role === "user" ? "#2563eb" : "#1e293b",
              color: "white",
              fontSize: 14
            }}>
              {m.text}
            </div>
          ))}
        </div>

        <div style={{
          display: "flex",
          padding: 10,
          borderTop: "1px solid #1e293b"
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Glynis..."
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 8,
              border: "none"
            }}
          />

          <button onClick={sendMessage} style={{
            marginLeft: 8,
            padding: "8px 14px",
            background: "#2563eb",
            border: "none",
            borderRadius: 8,
            color: "white"
          }}>
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;