import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "../src/store/store.tsx";
import { Provider } from "react-redux";
import StatesProvider from "./hooks/states.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StatesProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </StatesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
