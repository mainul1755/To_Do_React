 import { useEffect, useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

export default function Todo() {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem("todo")) || []);
  const [newTodo, setNewTodo] = useState({ id: Date.now(), text: "", completed: false, isUpdating: false });
  const [updateText, setUpdateText] = useState("");

  const handleAddTodo = () => {
    if (!newTodo.text.trim()) return;
    const updated = [...todo, newTodo];
    setTodo(updated);
    setNewTodo({ id: Date.now(), text: "", completed: false, isUpdating: false });
    localStorage.setItem("todo", JSON.stringify(updated));
  };

  const handleDeleteTodo = (id) => {
    const updated = todo.filter((t) => t.id !== id);
    setTodo(updated);
    localStorage.setItem("todo", JSON.stringify(updated));
  };

  const handleEditTodo = (id) => {
    const found = todo.find((t) => t.id === id);
    setUpdateText(found.text);
    setTodo(todo.map((t) => (t.id === id ? { ...t, isUpdating: true } : t)));
  };

  const handleUpdateTodo = (id) => {
    const updated = todo.map((t) => (t.id === id ? { ...t, text: updateText, isUpdating: false } : t));
    setTodo(updated);
    localStorage.setItem("todo", JSON.stringify(updated));
  };

  const clearAllTodo = () => {
    setTodo([]);
    localStorage.setItem("todo", JSON.stringify([]));
  };

  useEffect(() => {
    setTodo(JSON.parse(localStorage.getItem("todo")) || []);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-green-200 via-white to-green-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-green-200">
        <h1 className="text-4xl font-extrabold text-green-600 text-center mb-6">🌿 To‑Do Manager</h1>

        {/* Input */}
        <div className="flex border border-green-400 rounded-xl overflow-hidden shadow-sm mb-5">
          <input
            type="text"
            value={newTodo.text}
            placeholder="Write your task..."
            className="flex-1 p-3 outline-none text-gray-700"
            onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
          />
          <button
            onClick={handleAddTodo}
            className="bg-green-500 text-white px-5 font-semibold hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {todo.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 w-full">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={(e) =>
                    setTodo(todo.map((item) => item.id === t.id ? { ...item, completed: e.target.checked } : item))
                  }
                  className="w-5 h-5 accent-green-600"
                />

                {t.isUpdating ? (
                  <input
                    value={updateText}
                    className="border p-1 w-full rounded"
                    onChange={(e) => setUpdateText(e.target.value)}
                  />
                ) : (
                  <p className={`text-gray-700 font-medium ${t.completed && "line-through text-gray-400"}`}>
                    {t.text}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {!t.isUpdating ? (
                  <button className="text-orange-500 text-2xl" onClick={() => handleEditTodo(t.id)}>
                    <MdEdit />
                  </button>
                ) : (
                  <button className="text-green-600 font-semibold" onClick={() => handleUpdateTodo(t.id)}>
                    Update
                  </button>
                )}

                <button className="text-red-500 text-2xl" onClick={() => handleDeleteTodo(t.id)}>
                  <MdDeleteForever />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todo.length > 0 && (
          <button
            onClick={clearAllTodo}
            className="w-full bg-red-500 text-white mt-6 py-3 rounded-xl font-semibold hover:bg-red-600 shadow"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
