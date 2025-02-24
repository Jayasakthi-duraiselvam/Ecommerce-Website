import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const TodoApp = () => {
  let [isEditing, setIsEditing] = useState(false);
  let [currentEleId, setCurrentEleId] = useState(null);
  let [newItem, setNewItem] = useState("");
  let [items, setItems] = useState([
    { id: 1, label: "HTML", checked: true },
    { id: 2, label: "CSS", checked: true },
    { id: 3, label: "JavaScript", checked: false },
  ]);

  function handleChecked(id) {
    let newListItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newListItems);
  }

  let handleUpdate = (id) => {
    let listItem = items.find((item) => item.id === id);
    setNewItem(listItem.label);
    setIsEditing(true);
    setCurrentEleId(id);
  };

  let handleDelete = (id) => {
    let newItems = items
      .filter((item) => item.id !== id)
      .map((items, index) => ({ ...items, id: index + 1 }));
    setItems(newItems);
  };

  let handleAddSave = () => {
    if (isEditing) {
      let newListItems = items.map((item) =>
        item.id === currentEleId ? { ...item, label: newItem } : item
      );
      setItems(newListItems);
      setCurrentEleId(null);
      setNewItem("");
      setIsEditing(false);
    } else {
      setItems([
        ...items,
        { id: items.length + 1, label: newItem, checked: false },
      ]);
      setNewItem("");
    }
  };

  return (
    <main className="todo-container">
      <div className="todo-header">
        <h2>Todo List</h2>
        <input
          type="text"
          value={newItem}
          placeholder="Add New Item"
          className="todo-input"
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="todo-button" onClick={handleAddSave}>
          {isEditing ? "Save" : "Add"}
        </button>
      </div>

      <ul className="todo-list">
        {items.map((item) => (
          <li key={item.id} className={`todo-item ${item.checked ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={item.checked}
              className="todo-checkbox"
              onChange={() => handleChecked(item.id)}
            />
            <label className="todo-label">{item.label}</label>
            <FaEdit className="edit-icon" onClick={() => handleUpdate(item.id)} />
            <FaTrash className="delete-icon" onClick={() => handleDelete(item.id)} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TodoApp;
