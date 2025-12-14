import React from "react";
import { createRoot } from "react-dom/client";

// Wait for DOM to be ready before initializing React
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(<h2>Hello from React!</h2>);
  } else {
    console.error("Root container not found");
  }
});
