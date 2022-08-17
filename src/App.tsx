import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DisplayPokemon from "./components/DisplayPokemon/DisplayPokemon";
import DisplaySinglePokemon from "./components/DisplaySinglePokemon/DisplaySinglePokemon";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <div id="content">
          <Routes>
            <Route path="/" element={<DisplayPokemon />} />
            <Route path="/pokemon/:id" element={<DisplaySinglePokemon />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
