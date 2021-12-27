import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles/custom.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import About from "./components/About";
import Dev from "./components/Dev";
import NotFound from "./components/NotFound";
import "ip";
import { isPropertySignature } from "typescript";
import FiltersForm from "./modules/FiltersForm";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import ScrollToTop from "./modules/ScrollToTop";

const themeOptions = createTheme({
  palette: {
    primary: {
      main: "#FABA2C",
      light: "#b31515",
      dark: "#600404",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#E40C2B",
      light: "#1879af",
      dark: "#02293b",
    },
    error: {
      main: "#c1121f",
    },
    warning: {
      main: "#EBA63F",
    },
    success: {
      main: "#669bbc",
    },
    info: {
      main: "#000000",
      light: "#FFFFFF",
    },
  },
});

function App() {
  function getIp() {}
  return (
    <div id="rootDiv" style={{ background: "F1EFEA" }}>
      <ThemeProvider theme={themeOptions}>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/home" element={<Homepage />}></Route>
            <Route path="/search" element={<SearchResults />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/dev" element={<Dev />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
