import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./globalStyles";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <React.StrictMode>
      <Provider store={store}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
