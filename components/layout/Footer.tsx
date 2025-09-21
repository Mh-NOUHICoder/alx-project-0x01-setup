import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-8 text-gray-600">
      <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
