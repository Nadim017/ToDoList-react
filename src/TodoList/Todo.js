import React, { useState, useEffect } from "react";
import "./todo.css";
const getLocalStorage = () => {
  const list = localStorage.getItem("myToDo");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalStorage());
  const [editItems, setEditItem] = useState();
  const addItem = () => {
    if (!inputdata) {
      alert("Please add something");
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };

      setItems([...items, newInputData]);
      setInputData("");
    }
  };
  const deleteItem = (id) => {
    const updatedList = items.filter((curElem) => {
      return curElem.id != id;
    });
    setItems(updatedList);
  };
  const removeAll = () => {
    setItems([]);
  };
  useEffect(() => {
    localStorage.setItem("myToDo", JSON.stringify(items));
  }, [items]);

  const editItem = (id) => {
    const editedItem = items.find((curElem) => {
      return curElem.id === id;
    });
    setInputData(editedItem.name);
  };
  return (
    <>
      <div>
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <input
            value={inputdata}
            onChange={(event) => {
              setInputData(event.target.value);
            }}
            className="inputField"
            placeholder="🧮 add item"
            type="text"
          />
          <span onClick={addItem} className="addbtn">
            +
          </span>
          <br />
          <br />
          {items.map((element) => {
            return (
              <>
                <div key={element.id} style={{}}>
                  <input
                    className="inputField"
                    value={element.name}
                    type="text"
                  />
                  <span onClick={() => editItem(element.id)} className="edit">
                    Reset
                  </span>{" "}
                  <span
                    className="delete"
                    onClick={() => deleteItem(element.id)}
                  >
                    ❌
                  </span>{" "}
                  <br />
                </div>
              </>
            );
          })}
        </div>
        <br />
        <div
          style={{
            textAlign: "center",
          }}
        >
          <button
            onClick={removeAll}
            style={{
              padding: "7px 15px",
              color: "black",
              background: "lightgray",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            Check List
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
