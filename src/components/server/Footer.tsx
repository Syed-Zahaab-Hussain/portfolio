import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 text-center text-gray-600 border-t border-white/5 mt-0 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Syed Zahaab Hussain. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
