import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ResultCard from './components/ResultCard';

const API_URL = 'http://localhost:5000/api/summarize';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError('Please provide some text to summarize.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(API_URL, { text });
      setResult(response.data);
    } catch (err) {
      console.error('API Error:', err);
      const message = err.response?.data?.error || 'Failed to connect to the server. Make sure the backend is running.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Summarizer AI</h1>
        <p className="subtitle">Transform messy notes into structured insights in seconds.</p>
      </header>

      <main>
        <div className="input-section">
          <textarea
            placeholder="Paste your unstructured text here (e.g., meeting notes, long emails, articles)..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />

          <button onClick={handleSummarize} disabled={loading}>
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                Analyzing...
              </div>
            ) : (
              'Summarize Text'
            )}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <ResultCard result={result} />
      </main>

      <footer style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Zoo Media For AI Intern : 2026
      </footer>
    </div>
  );
}

export default App;
