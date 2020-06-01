import React from "react";
import ReactDOM from "react-dom";
import AuthProvider from "./context/auth-context";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
