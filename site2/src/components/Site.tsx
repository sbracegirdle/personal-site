import React from 'react';
import Nav from './Nav';

const Site = ({children}: {children: React.ReactNode | undefined}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      {children}

      <nav className="Footer px-6 py-4 text-white bg-gray-900 text-center text-xs border-t-4 border-purple-900">
        Copyright © Simon Bracegirdle {new Date().getFullYear()}
      </nav>
    </div>
  );
};

export default Site;
