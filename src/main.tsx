// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";
import { Provider } from "react-redux";
import store from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>

  <Theme>
    <Provider store={store}>
      <App />
    </Provider>
  </Theme>
  // </StrictMode>
);
