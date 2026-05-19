"use client";
import { useState, useEffect } from "react";

const LIMIT = 5;
const STORAGE_KEY = "apw_gen_count";

const tones = [
  { value: "professional", label: "Professional", emoji: "💼" },
  { value: "casual", label: "Casual", emoji: "😊" },
  { value: "luxury", label: "Luxury", emoji: "✨" },
  { value: "playful", label: "Playful", emoji: "🎉" },
];

export default function Home() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState("professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [genCount, setGenCount] = useState(0);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    setGenCount(stored);
  }, []);

  const remaining = LIMIT - genCount;
  const limitReached = genCount >= LIMIT;

  async function handleGenerate() {
    if (limitReached) return;
    if (!productName.trim() || !features.trim()) {
      setError("Product name and features are required.");
      return;
    }
    setError("");
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, category, features, tone }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); } else {
        setOutput(data.description);
        const newCount = genCount + 1;
        setGenCount(newCount);
        localStorage.setItem(STORAGE_KEY, String(newCount));
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-[#26304A] bg-[#0A0E1A]/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/gm-logo.png" alt="Ghulam Mustafa" width={32} height={32} className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-lg">ProductWriter</span>
            <span className="text-xs text-gray-400 bg-[#1B2237] px-2 py-0.5 rounded-full ml-1">Shopify Optimized</span>
          </div>
          <a href="https://ghulammustafa.dev" target="_blank" className="text-sm text-[#00D9FF] hover:text-[#00D9FF]/80">by ghulammustafa.dev</a>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">AI Product Description Generator</h1>
          <p className="text-gray-400 text-lg">Write SEO-optimized Shopify product descriptions in seconds using AI.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#131829] border border-[#26304A] rounded-2xl p-6 space-y-5">
            <h2 className="font-semibold text-gray-200 text-lg">Product Details</h2>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Product Name *</label>
              <input
                type="text"
                value={productName}
                onChange={e => setProductName(e.target.value)}
                placeholder="e.g. ProSound Wireless Earbuds"
                className="w-full bg-[#0A0E1A] border border-[#26304A] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Category</label>
              <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="e.g. Electronics, Fashion, Home Decor"
                className="w-full bg-[#0A0E1A] border border-[#26304A] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Key Features *</label>
              <textarea
                value={features}
                onChange={e => setFeatures(e.target.value)}
                rows={4}
                placeholder="e.g. 30hr battery, active noise cancellation, IPX5 waterproof, fast pairing, includes charging case"
                className="w-full bg-[#0A0E1A] border border-[#26304A] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Tone</label>
              <div className="grid grid-cols-2 gap-2">
                {tones.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition ${tone === t.value ? "border-[#00D9FF] bg-[#00D9FF]/10 text-[#00D9FF]" : "border-[#26304A] bg-[#0A0E1A] text-gray-400 hover:border-[#00D9FF]/40"}`}
                  >
                    {t.emoji} {t.label}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            {limitReached ? (
              <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/40 rounded-xl p-4 text-center">
                <p className="text-[#00D9FF] font-semibold mb-1">🎯 Demo limit reached (5/5)</p>
                <p className="text-gray-400 text-sm mb-3">Want unlimited generations for your store?</p>
                <a href="https://cal.com/ghulammustafa/20min" target="_blank"
                  className="inline-block bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-[#0A0E1A] font-semibold px-5 py-2 rounded-lg transition text-sm">
                  Book a Free Call →
                </a>
              </div>
            ) : (
              <div>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full bg-[#00D9FF] hover:bg-[#00D9FF]/90 disabled:opacity-50 disabled:cursor-not-allowed text-[#0A0E1A] font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#0A0E1A]/30 border-t-[#0A0E1A] rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : "✨ Generate Description"}
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">{remaining} free generation{remaining !== 1 ? "s" : ""} remaining</p>
              </div>
            )}
          </div>

          <div className="bg-[#131829] border border-[#26304A] rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-200 text-lg">Generated Description</h2>
              {output && (
                <button onClick={handleCopy} className="text-sm bg-[#1B2237] hover:bg-[#26304A] px-3 py-1.5 rounded-lg transition text-gray-300">
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              )}
            </div>

            {!output && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-600">
                <div className="text-5xl mb-3">✍️</div>
                <p className="text-sm">Fill in the product details and click Generate.</p>
                <p className="text-xs mt-1">Your AI-written description will appear here.</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
                <div className="text-4xl mb-3 animate-pulse">🤖</div>
                <p className="text-sm">AI is writing your description...</p>
              </div>
            )}

            {output && (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 bg-[#0A0E1A] border border-[#26304A] rounded-xl p-4 text-[#E5E7EB] text-sm leading-relaxed whitespace-pre-wrap">{output}</div>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>{output.split(" ").length} words</span>
                  <span>Shopify optimized ✓</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center pb-8">
          <div className="bg-[#131829] border border-[#26304A] rounded-xl p-4">
            <div className="text-2xl mb-1">⚡</div>
            <p className="font-medium text-sm">10 seconds</p>
            <p className="text-[#9CA3AF] text-xs">vs 30 mins manual writing</p>
          </div>
          <div className="bg-[#131829] border border-[#26304A] rounded-xl p-4">
            <div className="text-2xl mb-1">🎯</div>
            <p className="font-medium text-sm">SEO Optimized</p>
            <p className="text-[#9CA3AF] text-xs">Shopify-ready format</p>
          </div>
          <div className="bg-[#131829] border border-[#26304A] rounded-xl p-4">
            <div className="text-2xl mb-1">🔄</div>
            <p className="font-medium text-sm">4 Tone Options</p>
            <p className="text-[#9CA3AF] text-xs">Match your brand voice</p>
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 z-40 border-t border-[#26304A] bg-[#0A0E1A]/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <p>💡 AI tool by <a href="https://ghulammustafa.dev" className="text-[#00D9FF] hover:underline" target="_blank">ghulammustafa.dev</a></p>
          <a href="https://cal.com/ghulammustafa/20min" target="_blank" className="bg-[#00D9FF] text-[#0A0E1A] font-semibold px-4 py-1.5 rounded-lg hover:bg-[#00D9FF]/90 transition text-xs">Want this for your store? Book a free call →</a>
        </div>
      </footer>
    </div>
  );
}
