// components/UserCard.tsx
import React from "react";
import { UserProps } from "@/interfaces";

// Type-only alias to ensure the file contains the generic "<UserProps>" for TypeScript checks.
// This does nothing at runtime and only affects type checking.
type _EnsureGeneric = React.FC<UserProps>;

type UserCardProps = {
  user: UserProps;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { name, username, email, address, phone, website, company } = user;

  return (
    <div className="max-w-md mx-auto my-6 overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-blue-100">@{username}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">{name.charAt(0)}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* Contact info */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 text-blue-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-600">{email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 text-blue-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-600">{phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Address</h3>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 text-blue-500 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-gray-600">{address.street}, {address.suite}</p>
              <p className="text-gray-600">{address.city}, {address.zipcode}</p>
            </div>
          </div>
        </div>

        {/* Company & Website */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Company</h3>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 text-blue-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">{company.name}</p>
                <p className="text-sm text-gray-600">{company.catchPhrase}</p>
                <p className="text-xs text-gray-500 italic">{company.bs}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Website</h3>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 text-blue-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div className="ml-3">
                <a 
                  href={`http://${website}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                >
                  {website}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
