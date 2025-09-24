// pages/users/index.tsx
import React, { useState } from 'react';
import UserCard from '../../components/common/UserCard';
import UserModal from '../../components/common/UserModal';
import { UserProps, UserData } from '../../interfaces';

interface UsersPageProps {
  posts: UserProps[]; // Keep it as posts to match getStaticProps
}

const Users: React.FC<UsersPageProps> = ({ posts }) => { // Destructure posts
  const [usersData, setUsersData] = useState<UserProps[]>(posts || []);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddUser = (newUser: UserData) => {
    const nextId = usersData.length > 0 ? Math.max(...usersData.map(u => u.id)) + 1 : 1;
    const userToAdd: UserProps = { ...(newUser as UserProps), id: nextId };
    setUsersData(prev => [...prev, userToAdd]);
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between my-6">
        <h1 className="text-3xl font-bold">Users List</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usersData.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {isModalOpen && (
        <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts = await response.json(); // Keep as posts

  return {
    props: {
      posts // Keep as posts
    }
  };
}

export default Users;
