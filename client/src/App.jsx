import React, { useState } from 'react';
import './App.css';
import ResultCard from './components/ResultCard';

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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/summarize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ text })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server Error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Failed to connect to the server.');
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
