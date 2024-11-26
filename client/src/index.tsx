import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./globalStyles";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Navbar from "./components/Navbar";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
//propably shouldnt be here
const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

  if (over) {
    console.log(`Dropped ${active.id} into ${over.id}`);
  }
};

root.render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <React.StrictMode>
      <Provider store={store}>
        <DndContext onDragEnd={handleDragEnd}>
          <GlobalStyles />
          <Navbar />
          <RouterProvider router={router} />
        </DndContext>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
