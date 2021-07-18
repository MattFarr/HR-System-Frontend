import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./state/index";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../../hr-main-app/src/theme";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <EmployeeDashboard />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
