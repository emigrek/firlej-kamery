import "@client/index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import Modal from "react-modal";
Modal.setAppElement('#root');

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();

import App from "@client/App";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);