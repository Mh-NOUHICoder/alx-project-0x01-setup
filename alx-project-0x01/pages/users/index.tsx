// pages/users/index.tsx
import React from 'react';
import UserCard from '../../components/common/UserCard';
import { UserProps } from '../../interfaces';

interface UsersPageProps {
  posts: UserProps[]; // Keep it as posts to match getStaticProps
}

const Users: React.FC<UsersPageProps> = ({ posts }) => { // Destructure posts
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-6">Users List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((user) => ( // Use posts.map instead of users.map
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  const posts = await response.json() // Keep as posts

  return {
    props: {
      posts // Keep as posts
    }
  }
}

export default Users;