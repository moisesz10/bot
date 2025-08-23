// frontend/src/components/Summarizer.jsx
import { useState, useEffect } from "react";
import { summarizeText, fetchHistory } from "../api";

export default function Summarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [insights, setInsights] = useState("");
  const [history, setHistory] = useState([]);

  // Carrega histórico ao iniciar
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await fetchHistory();
      setHistory(response.data);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    try {
      const response = await summarizeText(text);
      const data = response.data;

      setSummary(data.summary || "");
      setInsights(data.insights || "");
      setText(""); // limpa o campo

      // Atualiza histórico
      await loadHistory();
    } catch (error) {
      console.error("Erro ao resumir texto:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Summarizer</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows="6"
          placeholder="Cole seu texto aqui..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Resumir
        </button>
      </form>

      {summary && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Resumo:</h2>
          <p>{summary}</p>
          {insights && (
            <>
              <h3 className="font-semibold mt-2">Insights:</h3>
              <p>{insights}</p>
            </>
          )}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Histórico de Resumos:</h2>
      {history.length === 0 && <p>Nenhum resumo gerado ainda.</p>}
      <ul className="space-y-2">
        {history.map((item) => (
          <li key={item.id} className="border p-2 rounded bg-white">
            <p className="text-sm text-gray-500">
              {new Date(item.created_at).toLocaleString()}
            </p>
            <p><strong>Resumo:</strong> {item.summary}</p>
            {item.insights && <p><strong>Insights:</strong> {item.insights}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
