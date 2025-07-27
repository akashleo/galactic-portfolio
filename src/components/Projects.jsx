import React from 'react';
import data from '../data/portfolio.json';

const Projects = () => {
  const { projects } = data;

  return (
    <section className="my-16">
      <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800 bg-opacity-75 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            {/* Placeholder for project image */}
            <div className="w-full h-48 bg-gray-700"></div> 
            <div className="p-6">
              <h3 className="text-2xl font-bold text-yellow-300 mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-300 font-semibold">
                View Project &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
