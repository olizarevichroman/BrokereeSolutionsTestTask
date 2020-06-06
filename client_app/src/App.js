import React from "react";
import "./App.css";
import AddItemForm from './js/components/addItemForm';
import ItemsList from './js/components/itemsList';
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <AddItemForm/>
      <ItemsList/>
    </div>
  );
}

export default App;
