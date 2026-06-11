import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IntlProvider } from "react-intl";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./app.css";
import translations from "./assets/translations.json";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_ID_CLIENT}>
      <IntlProvider locale="fr" messages={translations["fr"]}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <main className="text-foreground bg-background min-h-screen">
              <App />
            </main>
          </BrowserRouter>
        </QueryClientProvider>
      </IntlProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
