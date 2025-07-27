import React from 'react';
import data from '../data/portfolio.json';

const Skills = () => {
  const { skills } = data;

  return (
    <section className="my-16">
      <h2 className="text-4xl font-bold text-center text-yellow-400 mb-8">Skills</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, index) => (
          <span key={index} className="bg-gray-700 text-gray-200 text-lg font-semibold px-4 py-2 rounded-full shadow-md">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
