import React from "react";
import ReactDOM from "react-dom/client";
import ArtHistoryQuiz from "./components/FrenchColonialRights";
import "./index.css"; // <- THIS IS CRUCIAL

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ArtHistoryQuiz />
  </React.StrictMode>
);
