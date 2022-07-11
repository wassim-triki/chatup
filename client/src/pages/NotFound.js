import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center gap-4 justify-center font-roboto">
      <h1 className="text-9xl font-extrabold">404</h1>
      <h2 className="text-3xl font-bold">PAGE NOT FOUND</h2>
      <Link to="/" className="text-blue-700 underline">
        Take me home
      </Link>
    </div>
  );
};

export default NotFound;
