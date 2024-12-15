import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./globalStyles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router";
import Router from "./Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <GlobalStyles />
          <Navbar />
          <Router />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
