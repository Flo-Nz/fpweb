import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="light">
        <RouterProvider router={router} />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
