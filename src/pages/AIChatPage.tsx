import { useState, type FormEvent } from "react";
import { Send, Bot, User, Loader2, Sparkles, Trash2 } from "lucide-react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hey! I'm your FitTrack AI Coach. Ask me anything about workouts, nutrition, recovery or fitness goals. Let's get stronger together!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    const message = input.trim();

    if (!message || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: message }]);

    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "AI request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: result.result || "I couldn't generate a response.",
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "ai",
        text: "Chat cleared! What would you like to work on today?",
      },
    ]);
    setError("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
      <div className="mb-8 border-b border-white/10 pb-6 flex justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="text-[#CCFF00] w-6 h-6" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#CCFF00]">
              Powered by Gemini AI
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter">
            AI Fitness Coach
          </h1>

          <p className="text-[10px] font-bold tracking-widest uppercase opacity-60 mt-2">
            Your personal fitness assistant, available anytime.
          </p>
        </div>

        <button
          onClick={clearChat}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-3 border border-white/20 text-[10px] font-black uppercase tracking-widest hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors disabled:opacity-40"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:block">Clear Chat</span>
        </button>
      </div>

      <div className="bg-[#1A1A1A] border border-white/10 flex flex-col h-[600px]">
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#CCFF00] flex items-center justify-center">
            <Bot className="text-black w-6 h-6" />
          </div>

          <div>
            <h3 className="font-black uppercase text-sm">FitTrack Assistant</h3>
            <p className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest">
              AI Coach
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "ai" && (
                <div className="w-8 h-8 flex-shrink-0 bg-[#CCFF00] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-[#CCFF00] text-black font-semibold"
                    : "bg-[#0A0A0A] border border-white/10 text-white"
                }`}
              >
                {msg.text}
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 flex-shrink-0 bg-white/10 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 bg-[#CCFF00] flex items-center justify-center">
                <Bot className="w-5 h-5 text-black" />
              </div>

              <div className="bg-[#0A0A0A] border border-white/10 p-4 flex items-center gap-3 text-xs uppercase tracking-widest">
                <Loader2 className="w-4 h-4 animate-spin text-[#CCFF00]" />
                AI is thinking...
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-xs font-bold text-center">
              {error}
            </p>
          )}
        </div>

        <form
          onSubmit={sendMessage}
          className="p-4 border-t border-white/10 flex gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your fitness coach..."
            disabled={loading}
            className="flex-1 min-w-0 bg-[#0A0A0A] border border-white/20 px-4 py-4 text-sm text-white outline-none focus:border-[#CCFF00] disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-[#CCFF00] text-black px-5 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-40"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      <p className="text-[10px] text-white/40 uppercase tracking-widest mt-4 text-center">
        AI responses may not always be accurate. Verify important health advice.
      </p>
    </div>
  );
}
