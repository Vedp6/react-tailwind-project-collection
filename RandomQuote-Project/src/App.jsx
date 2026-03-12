import { useState, useEffect } from "react";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [bgColor, setBgColor] = useState("bg-blue-400");

  const colors = [
    "bg-red-400",
    "bg-violet-400",
    "bg-blue-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-yellow-400",
    "bg-indigo-400",
  ];

  const getQuote = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();

      setQuote(data.quote);
      setAuthor(data.author);

      // change background color
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(randomColor);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div
      className={`h-screen flex items-center justify-center transition-all duration-500 ${bgColor}`}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-6">Random Quote Generator</h1>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <p className="text-lg italic mb-4">"{quote}"</p>

            <h3 className="text-gray-600 mb-6">- {author}</h3>
          </>
        )}

        <button
          onClick={getQuote}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
