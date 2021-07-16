import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./state/index";
import App from "./App";
import EmployeeDashboard from "./components/EmployeeDashboard";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <EmployeeDashboard />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
