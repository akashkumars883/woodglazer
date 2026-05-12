"use client";

import { useState, useEffect } from "react";
import { Sparkles, Loader2, Key, HelpCircle, X, Check, AlertCircle, Cpu, Globe } from "lucide-react";
import { generateAIContent, saveAIConfig, getAIConfig } from "@/app/admin/actions";

interface AIAssistButtonProps {
  prompt: string;
  formatAsJson?: boolean;
  onSuccess: (result: string) => void;
  label?: string;
  className?: string;
  loadingText?: string;
}

export default function AIAssistButton({
  prompt,
  formatAsJson = false,
  onSuccess,
  label = "AI Assist",
  className = "",
  loadingText = "AI is thinking..."
}: AIAssistButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiEndpointInput, setApiEndpointInput] = useState("https://api.groq.com/openai/v1");
  const [apiModelInput, setApiModelInput] = useState("llama-3.3-70b-versatile");
  
  const [savingKey, setSavingKey] = useState(false);
  const [keyError, setKeyError] = useState<string | null>(null);
  const [keySuccess, setKeySuccess] = useState(false);

  // Load config on mount from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("universal_ai_config");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.key) {
            setApiKeyInput(parsed.key);
            setApiEndpointInput(parsed.endpoint || "https://api.groq.com/openai/v1");
            setApiModelInput(parsed.model || "llama-3.3-70b-versatile");
          }
        } catch (e) {
          console.error("Error parsing local AI config:", e);
        }
      }
    }
  }, []);

  const handleAction = async () => {
    setLoading(true);
    try {
      // 1. Try reading from localStorage first
      let localConfig = null;
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("universal_ai_config");
        if (saved) {
          try {
            localConfig = JSON.parse(saved);
          } catch (e) {}
        }
      }

      // 2. Generate content passing localConfig to bypass cached keys if valid
      const result = await generateAIContent(
        prompt, 
        formatAsJson, 
        (localConfig && localConfig.key?.trim()) ? localConfig : undefined
      );

      if (!result.success) {
        if (result.error === "API_KEY_MISSING") {
          // Fetch current DB config to populate modal as fallback
          const config = await getAIConfig();
          setApiKeyInput(config.key || "");
          setApiEndpointInput(config.endpoint || "https://api.groq.com/openai/v1");
          setApiModelInput(config.model || "llama-3.3-70b-versatile");
          setShowKeyModal(true);
        } else {
          alert(`AI Assist Error: ${result.error}`);
        }
        return;
      }

      if (result.text) {
        if (formatAsJson) {
          onSuccess(result.text);
        } else {
          // Simulate ChatGPT-style live streaming typing effect
          const regex = /(<[^>]+>|[^<\s]+|\s+)/g;
          const tokens = result.text.match(regex) || [];
          
          let current = "";
          let index = 0;
          
          const interval = setInterval(() => {
            if (index >= tokens.length) {
              clearInterval(interval);
              return;
            }
            current += tokens[index];
            onSuccess(current);
            index++;
          }, 15);
        }
      }
    } catch (err: unknown) {
      console.error(err);
      alert("Something went wrong with the AI Engine");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenConfig = async () => {
    setLoading(true);
    try {
      // Check localStorage first
      let hasLocal = false;
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("universal_ai_config");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed.key) {
              setApiKeyInput(parsed.key);
              setApiEndpointInput(parsed.endpoint || "https://api.groq.com/openai/v1");
              setApiModelInput(parsed.model || "llama-3.3-70b-versatile");
              hasLocal = true;
            }
          } catch (e) {}
        }
      }

      if (!hasLocal) {
        const config = await getAIConfig();
        setApiKeyInput(config.key || "");
        setApiEndpointInput(config.endpoint || "https://api.groq.com/openai/v1");
        setApiModelInput(config.model || "llama-3.3-70b-versatile");
      }
      setShowKeyModal(true);
    } catch (err) {
      console.error("Could not fetch AI config:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) {
      setKeyError("API Key cannot be empty");
      return;
    }

    setSavingKey(true);
    setKeyError(null);
    setKeySuccess(false);

    try {
      const payload = {
        key: apiKeyInput.trim(),
        endpoint: apiEndpointInput.trim(),
        model: apiModelInput.trim()
      };

      // 1. Save locally for instant reactivity
      if (typeof window !== "undefined") {
        localStorage.setItem("universal_ai_config", JSON.stringify(payload));
      }

      // 2. Also write to DB for fallback
      await saveAIConfig(
        payload.key,
        payload.endpoint,
        payload.model
      );

      setKeySuccess(true);
      setTimeout(() => {
        setShowKeyModal(false);
        setKeySuccess(false);
        // Auto-trigger the AI content action again!
        handleAction();
      }, 1500);
    } catch (err: unknown) {
      setKeyError("An error occurred while saving the configuration");
    } finally {
      setSavingKey(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={loading}
          onClick={handleAction}
          className={`inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 via-primary to-amber-600 hover:from-amber-600 hover:to-primary text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/15 transition-all hover:scale-[1.03] active:scale-95 disabled:opacity-80 disabled:hover:scale-100 ${className}`}
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{loadingText}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
              <span>{label}</span>
            </>
          )}
        </button>
        
        {/* Gear icon for instant setup edit */}
        <button
          type="button"
          title="AI Settings"
          onClick={handleOpenConfig}
          className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 rounded-xl transition-all"
        >
          <Key className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* AI Config Modal Dialog */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 sm:p-10 space-y-6 animate-in zoom-in-95 duration-300 shadow-2xl relative border border-stone-100 my-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowKeyModal(false)}
              className="absolute top-6 right-6 p-2 bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Title */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-gradient-to-tr from-amber-500 to-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                <Sparkles className="w-6 h-6 animate-pulse text-amber-100" />
              </div>
              <div>
                <h3 className="text-xl font-black text-secondary tracking-tight">Configure AI Assistant</h3>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mt-1">Unlock 1-Click Writing & SEO Assist</p>
              </div>
            </div>

            <p className="text-sm text-stone-500 leading-relaxed text-center font-medium">
              We support standard OpenAI-compatible endpoints (**Groq, DeepSeek, OpenAI, OpenRouter** etc.) to write drafts and optimize SEO metadata.
            </p>

            <form onSubmit={handleSaveKey} className="space-y-4">
              {/* API Key */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1 flex items-center justify-between">
                  <span>AI API Key</span>
                  {apiEndpointInput.includes("groq") && (
                    <a
                      href="https://console.groq.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-0.5 text-primary hover:underline font-bold"
                    >
                      Get Groq Key <HelpCircle className="w-3 h-3" />
                    </a>
                  )}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                    <Key className="w-4 h-4" />
                  </span>
                  <input
                    required
                    type="password"
                    placeholder="Enter your API Key"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-semibold text-stone-700"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                  />
                </div>
              </div>

              {/* API Endpoint */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                  API Endpoint
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                    <Globe className="w-4 h-4" />
                  </span>
                  <input
                    required
                    type="text"
                    placeholder="e.g. https://api.groq.com/openai/v1"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-xs font-mono font-semibold text-stone-600"
                    value={apiEndpointInput}
                    onChange={(e) => setApiEndpointInput(e.target.value)}
                  />
                </div>
                <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider ml-1">For Groq: https://api.groq.com/openai/v1</p>
              </div>

              {/* AI Model */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                  AI Model Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                    <Cpu className="w-4 h-4" />
                  </span>
                  <input
                    required
                    type="text"
                    placeholder="e.g. llama-3.3-70b-versatile"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-xs font-mono font-semibold text-stone-600"
                    value={apiModelInput}
                    onChange={(e) => setApiModelInput(e.target.value)}
                  />
                </div>
                <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider ml-1">For Groq: llama-3.3-70b-versatile or mixtral-8x7b-32768</p>
              </div>

              {keyError && (
                <div className="bg-red-50 border border-red-100 p-3.5 rounded-xl flex items-center gap-2 text-red-600 text-xs font-bold leading-normal">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{keyError}</span>
                </div>
              )}

              {keySuccess && (
                <div className="bg-green-50 border border-green-100 p-3.5 rounded-xl flex items-center gap-2 text-green-600 text-xs font-bold leading-normal">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>AI Engine Configured Successfully! Triggering AI...</span>
                </div>
              )}

              <button
                type="submit"
                disabled={savingKey || keySuccess}
                className="w-full bg-secondary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-secondary/15 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
              >
                {savingKey ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving Config...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Save & Activate AI
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
