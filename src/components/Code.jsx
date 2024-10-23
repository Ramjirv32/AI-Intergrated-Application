import React, { useState } from 'react';
import { generateCode } from './api/codeGen.js'; 

export default function CodeGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleGenerateCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateCode(prompt);
      
      if (Array.isArray(result) && result.length > 0 && result[0].generated_text) {
        setGeneratedCode(result[0].generated_text);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      setError('Error generating code: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Code Generator</h1>
      <textarea
        value={prompt}
        onChange={handleInputChange}
        placeholder="Enter your prompt here..."
        className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleGenerateCode}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Code'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {generatedCode && (
        <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Generated Code:</h2>
          <pre className="whitespace-pre-wrap">{generatedCode}</pre>
        </div>
      )}
    </div>
  );
}
