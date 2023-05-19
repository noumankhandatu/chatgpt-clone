import { useState } from "react";
import axios from "axios";
import CGLogo from "./chatGPT.png";
import AppLogo from "./app-logo.png";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;
  const API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
  const API_KEY = apiKey;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        API_ENDPOINT,
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      setResponse(response.data.choices[0].message.content);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <img src={AppLogo} alt="" className="app-logo" />
      <form onSubmit={handleSubmit}>
        <img src={CGLogo} alt="" className={loading ? "cg-logo loading" : "cg-logo"} />
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask anything... :)" />
        <button type="submit">Ask</button>
      </form>
      <p className="response-area">{loading ? "Loading..." : response}</p>
      <div className="footer">~ webstylepress ~</div>
    </div>
  );
}

export default App;
