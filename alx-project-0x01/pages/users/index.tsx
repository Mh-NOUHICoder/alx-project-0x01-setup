// pages/users/index.tsx
import React, { useState, useMemo } from "react";
import { GetStaticProps } from "next";
import UserCard from "@/components/common/UserCard";
import { UserProps } from "@/interfaces";

type UsersPageProps = {
  users: UserProps[];
};

export const getStaticProps: GetStaticProps<UsersPageProps> = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    
    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status}`);
    }
    
    const users: UserProps[] = await res.json();

    return {
      props: {
        users: users ?? [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      props: {
        users: [],
      },
      // Optionally enable revalidate on error too
      revalidate: 10,
    };
  }
};

const UsersPage: React.FC<UsersPageProps> = ({ users = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState<"name" | "username" | "email">("name");

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    if (!users || users.length === 0) return [];
    
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      if (sortCriteria === "name") return a.name.localeCompare(b.name);
      if (sortCriteria === "username") return a.username.localeCompare(b.username);
      return a.email.localeCompare(b.email);
    });
  }, [users, searchTerm, sortCriteria]);

  // Handle loading and empty states
  if (!users) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Users Directory</h1>
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Users Directory</h1>
            <p className="text-gray-600">No users found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Users Directory</h1>
          <p className="text-gray-600">Browse our community of {users.length} users</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-2/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search users by name, username, or email..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="flex items-center">
                <span className="mr-2 text-gray-700 whitespace-nowrap">Sort by:</span>
                <select 
                  className="block w-full py-3 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={sortCriteria}
                  onChange={(e) => setSortCriteria(e.target.value as "name" | "username" | "email")}
                >
                  <option value="name">Name</option>
                  <option value="username">Username</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-700">
            Showing <span className="font-semibold">{filteredAndSortedUsers.length}</span> of <span className="font-semibold">{users.length}</span> users
          </p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Users grid */}
        {filteredAndSortedUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg className="h-12 w-12 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No users found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search query</p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;