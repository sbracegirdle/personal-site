import React from 'react';

const Site = ({children}: {children: React.ReactNode | undefined}) => {
  return (
    <>
      <nav className="TopNav sticky top-0 px-2 md:px-6 py-4 text-white border-b-4 border-purple-900 bg-gray-900 text-center md:text-right">
        <ul className="flex flex-row flex-wrap uppercase text-lg items-center text-center justify-center md:text-right md:justify-end">
          {/* <li className="mr-3">Blog</li> */}
          <li className="mr-3 hover:underline hover:text-orange-500">
            <a href="/#about">About</a>
          </li>
          <li className="mr-3 hover:underline hover:text-orange-500">
            <a href="/#projects">Projects</a>
          </li>
          <li className="mr-3 hover:underline hover:text-orange-500">
            <a href="/#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {children}

      <nav className="Footer px-6 py-4 text-white bg-gray-900 text-center text-xs border-t-4 border-purple-900">
        Copyright © Simon Bracegirdle {new Date().getFullYear()}
      </nav>
    </>
  );
};

export default Site;
