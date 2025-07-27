import React from 'react';
import data from '../data/portfolio.json';
import Header from './Header';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';

const Portfolio = () => {
  return (
    <div className="fixed inset-0 z-20 overflow-y-auto bg-black bg-opacity-50 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  );
};

export default Portfolio;
