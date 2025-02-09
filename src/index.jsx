import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Importera PostHog och PostHogProvider
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// Initiera PostHog direkt i index.jsx
posthog.init("phc_cFOE6ty8yZFYjs99HeTqcdtqjUaSYITLhf2jt3Knb0k", {
  api_host: "https://eu.i.posthog.com",
  persistence: "localStorage",
});

// Skapa root och rendera appen med PostHogProvider
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>
);
