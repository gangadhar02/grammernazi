import { useState } from 'react';
import { correctGrammar } from './lib/gemini';
import { Trash2, ArrowRight, Copy, Check } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError('');
    setCorrectedText('');

    try {
      const result = await correctGrammar(text);
      setCorrectedText(result);
    } catch (err) {
      setError('Failed to correct grammar. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  const handleCopy = async () => {
    if (!correctedText) return;
    await navigator.clipboard.writeText(correctedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex justify-center items-center pb-6 border-b border-neutral-100">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold tracking-tight text-neutral-900">Grammer</span>
            <span className="text-xl font-bold tracking-tight text-neutral-900">Nazi</span>
          </div>
        </div>

        {/* Input Area */}
        <div className="relative group border border-neutral-200 rounded-xl p-4 transition-colors focus-within:border-neutral-400">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste your text here..."
            className="w-full h-64 p-0 text-lg leading-relaxed bg-transparent border-none resize-none placeholder-neutral-300 outline-none text-neutral-700 font-serif"
            autoFocus
          />
          {text && (
            <button
              onClick={() => setText('')}
              className="absolute top-2 right-2 p-2 text-neutral-300 hover:text-neutral-500 transition-colors"
              title="Clear text"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2 pb-8 border-b border-neutral-100">
          <button
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-white transition-all transform active:scale-95 ${loading || !text.trim()
              ? 'bg-neutral-300 cursor-not-allowed'
              : 'bg-neutral-900 hover:bg-neutral-800 shadow-lg hover:shadow-neutral-200'
              }`}
          >
            {loading ? 'Checking...' : 'Check'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-center text-sm">
            {error}
          </div>
        )}

        {/* Result Area */}
        {correctedText && (
          <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500 border border-neutral-200 rounded-xl p-4">
            <div className="absolute top-2 right-2">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${copied
                  ? 'bg-neutral-100 text-neutral-700'
                  : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                  }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="pt-8 text-lg leading-relaxed whitespace-pre-wrap text-neutral-800 font-serif">
              {correctedText}
            </div>
          </div>
        )}


        {/* Footer */}
        <div className="pt-8 text-center">
          <p className="text-sm text-neutral-400">
            built by <a href="https://www.bengaluruboy.in/" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900 transition-colors underline decoration-neutral-300 hover:decoration-neutral-600">gangadhar</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
