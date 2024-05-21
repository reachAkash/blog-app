import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "./ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider>
    <App />
  </Provider>
);
