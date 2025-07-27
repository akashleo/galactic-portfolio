import React from 'react';
import data from '../data/portfolio.json';

const Header = () => {
  const { name, title, description } = data.about;

  return (
    <header className="text-center py-16">
      <h1 className="text-6xl font-bold text-yellow-400 tracking-wider">{name}</h1>
      <p className="text-2xl mt-4 text-gray-300">{title}</p>
      <p className="mt-8 max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
        {description}
      </p>
    </header>
  );
};

export default Header;
