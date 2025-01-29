import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider>
      <Toaster />
      <App />
    </Provider>
  </React.StrictMode>
);
