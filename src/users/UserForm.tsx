// Type definitions for the exposed electron API
declare global {
  interface Window {
    electronAPI: {
      createUser: (username: string, email: string) => Promise<{ success: boolean; userId?: number; error?: string }>;
      getAllUsers: () => Promise<{ success: boolean; users?: any[]; error?: string }>;
      getUserById: (id: number) => Promise<{ success: boolean; user?: any; error?: string }>;
    };
  }
}

import React, { useState } from "react";

interface UserFormProps {
  onUserAdded: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !email.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await window.electronAPI.createUser(username.trim(), email.trim());
      if (result.success) {
        setUsername("");
        setEmail("");
        onUserAdded();
      } else {
        alert(`Error creating user: ${result.error}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form">
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
};
