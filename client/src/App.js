import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const url = "/api";
function App() {
  const [data, setData] = useState(null);

  const fetchData = async (url) => {
    const res = await fetch(url);
    const serverData = await res.json();
    setData(serverData);
  };

  useEffect(() => {
    fetchData(url);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <code>{data ? data.message : "Loading..."}</code>
    </div>
  );
}

export default App;
