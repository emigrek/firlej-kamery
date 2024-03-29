import "@client/index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    }
  }
});

import App from "@client/App";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);