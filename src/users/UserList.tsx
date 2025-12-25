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

import React, { useState, useEffect } from "react";
import { UserItem } from "./UserItem";

interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

interface UserListProps {
  refreshTrigger?: number;
}

export const UserList: React.FC<UserListProps> = ({ refreshTrigger }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const result = await window.electronAPI.getAllUsers();
      if (result.success && result.users) {
        setUsers(result.users);
      } else {
        console.error("Error loading users:", result.error);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [refreshTrigger]);

  if (loading) {
    return <div className="user-list">Loading users...</div>;
  }

  return (
    <div className="">
      <h3 className="text-lg">All Users ({users.length})</h3>
      {users.length === 0 ? (
        <p className="text-sm text-gray-500">No users found. Add your first user above!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};
