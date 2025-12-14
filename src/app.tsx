import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { UserForm, UserList } from "./users";
import "./users/styles.css";

// Wait for DOM to be ready before initializing React
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);

    const App: React.FC = () => {
      const [refreshTrigger, setRefreshTrigger] = useState(0);

      const handleUserAdded = () => {
        setRefreshTrigger((prev) => prev + 1);
      };

      return (
        <div className="app">
          <header>
            <h1>User Management System</h1>
          </header>

          <main>
            <UserForm onUserAdded={handleUserAdded} />
            <UserList refreshTrigger={refreshTrigger} />
          </main>
        </div>
      );
    };

    root.render(<App />);
  } else {
    console.error("Root container not found");
  }
});
