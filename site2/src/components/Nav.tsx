import React from 'react';
import {Link} from '@reach/router';

const Nav = () => {
  return (
    <nav className="TopNav sticky top-0 px-3 md:px-6 py-4 text-white border-b-4 border-purple-900 bg-gray-900 items-baseline md:text-right flex flex-row align-center">
      <h1 className="flex-1 text-left hidden md:block font-mono text-xl">
        <Link to="/">
          <span className="text-orange-400 underline">Simon</span> <span className="text-gray-500">Bracegirdle</span>
        </Link>
      </h1>
      <ul className="flex flex-row flex-wrap uppercase text-lg items-center text-center justify-center md:text-right md:justify-end">
        <li className="mr-3 hover:underline hover:text-orange-500">
          <Link to="/blog">Blog</Link>
        </li>
        <li className="mr-3 hover:underline hover:text-orange-500">
          <Link to="/#about">About</Link>
        </li>
        <li className="mr-3 hover:underline hover:text-orange-500">
          <Link to="/#projects">Projects</Link>
        </li>
        <li className="mr-3 hover:underline hover:text-orange-500">
          <Link to="/#contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
