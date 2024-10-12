import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./providers/AuthProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* title e menu add korte */}
    <AuthProvider>
      <HelmetProvider>
        <div className="mx-auto max-w-screen-xl">
          <RouterProvider router={router} />
        </div>
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
