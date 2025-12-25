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
    <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
      <div className="">
        <h4 className="text-lg">{user.username}</h4>
        <p className="text-sm text-gray-500">{user.email}</p>
        <small className="text-sm text-gray-500">Joined: {new Date(user.created_at).toLocaleDateString()}</small>
      </div>
      <div className="text-sm text-gray-500">ID: {user.id}</div>
    </div>
  );
};
