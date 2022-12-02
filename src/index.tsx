import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import './index.css'
const setup = () => {
  const el = document.createElement('div');
  el.setAttribute('id', 'rooty');
  document.body.append(el);

  ReactDOM.createRoot(document.getElementById("rooty") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
setup();


