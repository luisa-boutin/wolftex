import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./App.css";
import "./themes.css";
import "./components/Internationalization/i18n.js";

const App = () => {
  const setLatexCode = useState("");

  return (
    <HashRouter>
      <div className="body-content">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home setLatexCode={setLatexCode} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
