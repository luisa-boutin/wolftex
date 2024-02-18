import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./App.css";
import "./themes.css";

const App = () => {
  const setLatexCode = useState("");

  return (
    <Router>
      <div className="body-content">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home setLatexCode={setLatexCode} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
