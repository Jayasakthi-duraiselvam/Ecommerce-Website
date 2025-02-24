import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import Shop from "./shop";

const Content = () => {
  let [isEditing, setisEditing] = useState(false);
  let [currentEleId, setcurrentEleId] = useState(null);
  let [newItem, setnewItem] = useState("");
  let [items, setitems] = useState([
    { id: 1, label: "html", checked: true },
    { id: 2, label: "css", checked: true },
    { id: 3, label: "javascript", checked: false },
  ]);
  function handlechecked(id) {
    let newlistItems = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setitems(newlistItems);
  }
  let handleupdate = (id) => {
    let listitem = items.find((item) => item.id === id);
    setnewItem(listitem.label);
    setisEditing(true);
    setcurrentEleId(id);
  };

  let handleDelete = (id) => {
    let newitems = items
      .filter((item) => item.id !== id)
      .map((items, index) => {
        return { ...items, id: index + 1 };
      });
    setitems(newitems);
  };

  let handleAddSave = () => {
    if (isEditing) {
      let newlistItems = items.map((item) => {
        return item.id === currentEleId ? { ...item, label: newItem } : item;
      });
      setitems(newlistItems);
      setcurrentEleId(null);
      setnewItem("")
      setisEditing(false)
    } else {
      setitems([
        ...items,
        { id: items.length + 1, label: newItem, checked: false },
      ]);
      setnewItem("");
    }
  };

  return (
    <main>
      <input
        type="text"
        value={newItem}
        placeholder="Add New Item"
        onChange={(e) => {
          setnewItem(e.target.value);
        }}
      />
      <button onClick={handleAddSave}>{isEditing ? "Save" : "Add"}</button>

      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handlechecked(item.id)}
              />
              <label>{item.label}</label>
              <FaEdit
                role="button"
                tabIndex={0}
                onClick={() => handleupdate(item.id)}
              />
              <FaTrash
                className="trash"
                role="button"
                tabIndex={0}
                onClick={() => handleDelete(item.id)}
              />
            </li>
          );
        })}
      </ul>

      {/* <Shop/> */}
    </main>
  );
};

export default Content;
