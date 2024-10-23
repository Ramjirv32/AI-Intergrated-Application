import React, { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown, Copy } from "lucide-react"; // Import Copy icon
import think1 from "./images/think3.gif";

export default function Main() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const answerRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const api = 'AIzaSyAMuQdycsuzqwzGsxlHHwA7GtNqHFewUV8';

  useEffect(() => {
    const checkScroll = () => {
      if (answerRef.current) {
        setShowScrollButtons(
          answerRef.current.scrollHeight > answerRef.current.clientHeight
        );
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [answer]);

  async function generateAnswer(e) {
    e.preventDefault();
    setIsLoading(true);
    setAnswer("");
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: question }] }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const rawAnswer = data.candidates[0].content.parts[0].text;
      // Remove asterisks from the answer
      const cleanedAnswer = rawAnswer.replace(/\*/g, ""); 
      setAnswer(cleanedAnswer);
    } catch (error) {
      console.error(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setIsLoading(false);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(answer)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  };

  const scrollTo = (position: 'top' | 'bottom') => {
    if (position === 'top' && topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (position === 'bottom' && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center text-white mb-4">Chat AI</h1>

        <form onSubmit={generateAnswer} className="space-y-4">
          <textarea
            required
            className="w-full border border-gray-700 rounded bg-gray-700 text-white min-h-[100px] p-3 transition-all duration-300 focus:border-pink-400 focus:ring focus:ring-pink-300 focus:ring-opacity-50"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
            aria-label="Enter your question"
          ></textarea>
          <button
            type="submit"
            className={`w-full bg-pink-500 text-white p-3 rounded-md hover:bg-pink-600 transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="w-6 h-6 border-4 border-t-pink-500 border-transparent rounded-full animate-spin"></div>
                Generating...
              </div>
            ) : (
              'Generate answer'
            )}
          </button>
        </form>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Answer</h2>
          <Copy className="h-5 w-5 ml-[600px] mt-[-50px]"  onClick={copyToClipboard}/>
          <div className="relative">
            <div 
              ref={answerRef}
              className="h-64 bg-gray-700 rounded-md border border-gray-600 overflow-y-auto p-4 text-white"
            >
              <div ref={topRef}></div>
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <img src={think1} alt="Thinking..." className="w-16" style={{ height: '200px', width: '250px' }} />
                </div>
              ) : (
                <div className="text-left whitespace-pre-line">
                  {answer}
                  
                </div>
              )}
              <div ref={bottomRef}></div>
            </div>
            {showScrollButtons && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                <button 
                  onClick={() => scrollTo('top')} 
                  className="p-1 bg-gray-600 rounded-full shadow-md hover:bg-gray-500 transition-colors"
                  aria-label="Scroll up"
                >
                  <ChevronUp className="h-5 w-5 text-white" />
                </button>
                <button 
                  onClick={() => scrollTo('bottom')} 
                  className="p-1 bg-gray-600 rounded-full shadow-md hover:bg-gray-500 transition-colors"
                  aria-label="Scroll down"
                >
                  <ChevronDown className="h-5 w-5 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
