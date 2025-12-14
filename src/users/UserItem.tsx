import React from "react";

interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

interface UserItemProps {
  user: User;
}

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className="user-item">
      <div className="user-info">
        <h4>{user.username}</h4>
        <p>{user.email}</p>
        <small>Joined: {new Date(user.created_at).toLocaleDateString()}</small>
      </div>
      <div className="user-id">ID: {user.id}</div>
    </div>
  );
};
