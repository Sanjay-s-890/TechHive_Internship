import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/item", {
        item: itemText,
        description: descriptionText, // Add the description to the request
      });
      setListItems((prev) => [...prev, res.data]);
      setItemText("");
      setDescriptionText(""); // Reset the description text after adding an item
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/items");
        setListItems(res.data);
        console.log("render");
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/api/item/${isUpdating}`,
        {
          item: updateItemText,
          description: descriptionText, // Add the updated description to the request
        }
      );
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      listItems[updatedItemIndex].item = updateItemText;
      listItems[updatedItemIndex].description = descriptionText; // Update the description in the list as well
      setUpdateItemText("");
      setDescriptionText("");
      setIsUpdating("");
    } catch (err) {
      console.log(err);
    }
  };

  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e) => updateItem(e)}>
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => setUpdateItemText(e.target.value)}
        value={updateItemText}
      />
      <input
        className="update-new-input"
        type="text"
        placeholder="New Description"
        onChange={(e) => setDescriptionText(e.target.value)}
        value={descriptionText}
      />
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );

  return (
    <div className="App">
      <h1>CRUD APP</h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add Name"
          onChange={(e) => setItemText(e.target.value)}
          value={itemText}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescriptionText(e.target.value)}
          value={descriptionText}
        />
        <button type="submit">Create</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((item) => (
          <div className="todo-item" key={item._id}>
            {isUpdating === item._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <p className="item-description">{item.description}</p>{" "}
                {/* Display the description */}
                <button
                  className="update-item"
                  onClick={() => setIsUpdating(item._id)}
                >
                  Update
                </button>
                <button
                  className="delete-item"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

//mern_app/client/todo-list-mernapp