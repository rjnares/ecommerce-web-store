import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: orange[200],
      main: orange[600],
      dark: orange[900],
    },
    secondary: {
      light: grey[200],
      main: grey[500],
      dark: grey[700],
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
