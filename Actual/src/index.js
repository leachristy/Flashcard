import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { FireAuthProvider } from "./context/FireAuth";


import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FireAuthProvider>
        <App />
      </FireAuthProvider>
    </Provider>
  </React.StrictMode>
);
