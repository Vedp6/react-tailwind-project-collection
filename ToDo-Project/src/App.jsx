import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // save todos automatically
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim() === "") return;

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const t = todos.find((item) => item.id === id);
    setTodo(t.todo);
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleCheckbox = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const filteredTodos = todos
    .filter((item) =>
      item.todo.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      if (filter === "completed") return item.isCompleted;
      if (filter === "pending") return !item.isCompleted;
      return true;
    });

  const completedCount = todos.filter((t) => t.isCompleted).length;
  const progress = todos.length
    ? (completedCount / todos.length) * 100
    : 0;

  return (
    <>
      <Navbar />

      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[88vh] md:w-[40%]">

        <h1 className="font-bold text-center text-3xl">
          iTask - Manage your Todos
        </h1>

        {/* Progress Bar */}

        <div className="my-4">
          <p className="text-sm font-semibold">
            {completedCount} / {todos.length} tasks completed
          </p>

          <div className="w-full bg-gray-300 rounded-full h-3 mt-1">
            <div
              className="bg-violet-700 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Add Todo */}

        <div className="flex my-4 gap-2">

          <input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            type="text"
            placeholder="Enter your task..."
            className="w-full rounded-full px-5 py-2"
          />

          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-500 px-5 py-2 text-white font-bold rounded-full"
          >
            Save
          </button>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full px-4 py-2 rounded-lg mb-3"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filters */}

        <div className="flex gap-2 mb-4">

          <button
            onClick={() => setFilter("all")}
            className="bg-violet-700 text-white px-3 py-1 rounded"
          >
            All
          </button>

          <button
            onClick={() => setFilter("completed")}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("pending")}
            className="bg-orange-500 text-white px-3 py-1 rounded"
          >
            Pending
          </button>

        </div>

        <h2 className="text-2xl font-bold">Your Todos</h2>

        {filteredTodos.length === 0 && (
          <div className="m-5 text-center text-gray-600">
            No Todos Found
          </div>
        )}

        {/* Todos List */}

        {filteredTodos.map((item) => (
          <div
  key={item.id}
  className="flex justify-between items-start bg-white p-3 rounded-lg my-3"
>
  <div className="flex gap-4 w-full min-w-0">

    <input
      type="checkbox"
      checked={item.isCompleted}
      onChange={() => handleCheckbox(item.id)}
    />

    <div
      className={`flex-1 break-words min-w-0 ${
        item.isCompleted ? "line-through text-gray-500" : ""
      }`}
    >
      {item.todo}
    </div>

  </div>

  <div className="flex gap-2 ml-2">

    <button
      onClick={() => handleEdit(item.id)}
      className="bg-violet-700 text-white p-2 rounded"
    >
      <FaEdit />
    </button>

    <button
      onClick={() => handleDelete(item.id)}
      className="bg-red-600 text-white p-2 rounded"
    >
      <AiFillDelete />
    </button>

  </div>
</div>

          
        ))}
      </div>
    </>
  );
}

export default App;