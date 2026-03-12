import { useState, useEffect } from "react";

function App() {

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className={`h-screen flex flex-col items-center justify-center transition-all duration-300 ${
      darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
    }`}>

      <h1 className="text-4xl font-bold mb-8">
        {darkMode ? "Dark Mode 🌙" : "Light Mode ☀️"}
      </h1>

      {/* Toggle Switch */}
      <div
        onClick={toggleTheme}
        className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
          darkMode ? "bg-blue-600" : "bg-gray-400"
        }`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-all duration-300 ${
            darkMode ? "translate-x-8" : "translate-x-0"
          }`}
        ></div>
      </div>

    </div>
  );
}

export default App;