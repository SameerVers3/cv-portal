import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import List from "./components/List";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/job/:id" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
