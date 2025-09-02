import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [summary, setSummary] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // You can optionally fetch a default summary or perform other initial tasks here
  }, []);

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/summarize', { // Replace with your FastAPI endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI Summarizer Bot</h1>
      <textarea
        rows="10"
        cols="50"
        placeholder="Enter text to summarize"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      {error && <p className="error">Error: {error}</p>}
      {summary && (
        <div className="summary">
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;