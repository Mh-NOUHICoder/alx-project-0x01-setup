import React from "react";
import Header from "@/components/layout/Header";
const UsersPage: React.FC = () => {
  const users = ["Alice", "Bob", "Charlie"];

  return (
    <div className="p-6">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="list-disc pl-5 space-y-1">
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
