import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch backend data
  useEffect(() => {
    axios.get("/api")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  // Send POST request
  const sendData = async () => {
    if (!input) return;

    setLoading(true);
    try {
      const res = await axios.post("/api/data", { text: input });
      setResponse(res.data.message);
      setInput("");
    } catch (err) {
      console.error(err);
      setResponse("Error sending data");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>MERN CI Demo</h1>

      {/* Backend Status */}
      <div style={styles.card}>
        <h2>Backend Status</h2>
        {data ? (
          <p style={styles.success}>
            ✅ {data.message}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Send Data Section */}
      <div style={styles.card}>
        <h2>Send Data to Backend</h2>

        <input
          type="text"
          placeholder="Enter something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />

        <button onClick={sendData} style={styles.button}>
          {loading ? "Sending..." : "Send"}
        </button>

        {response && <p style={styles.response}>{response}</p>}
      </div>
    </div>
  );
}

// ---------------- STYLES ----------------
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial"
  },
  title: {
    color: "#333"
  },
  card: {
    background: "#f5f5f5",
    padding: "20px",
    margin: "20px auto",
    width: "300px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
  },
  input: {
    padding: "10px",
    width: "80%",
    marginBottom: "10px"
  },
  button: {
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  success: {
    color: "green",
    fontWeight: "bold"
  },
  response: {
    marginTop: "10px",
    color: "#555"
  }
};

export default App;