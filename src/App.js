import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import BootstrapNavbar from "./components/Navbar";
import "./App.css";

const App = () => {
  const setLatexCode = useState("");

  return (
    <Router>
      <div>
        <BootstrapNavbar />
        <Routes>
          <Route path="/" element={<Home setLatexCode={setLatexCode} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
