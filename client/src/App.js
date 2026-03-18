import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("/api").then(res => setMsg(res.data.message));
  }, []);

  return <h1>{msg}Hello</h1>;
}

export default App;