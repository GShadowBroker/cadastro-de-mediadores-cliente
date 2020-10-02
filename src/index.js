import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import colors from "./constants/colors";
import { ptBR } from "@material-ui/core/locale";

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        light: colors.light.primary.light,
        main: colors.light.primary.main,
        dark: colors.light.primary.dark,
        contrastText: colors.light.primary.contrastText,
      },
      secondary: {
        light: colors.light.secondary.light,
        main: colors.light.secondary.main,
        dark: colors.light.secondary.dark,
        contrastText: colors.light.secondary.contrastText,
      },
      error: {
        light: colors.light.error.light,
        main: colors.light.error.main,
        dark: colors.light.error.dark,
        contrastText: colors.light.error.contrastText,
      },
    },
  },
  ptBR
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
