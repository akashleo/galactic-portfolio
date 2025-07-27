import React from 'react';
import data from '../data/portfolio.json';

const Contact = () => {
  const { contact } = data;

  return (
    <footer className="text-center py-16">
      <h2 className="text-4xl font-bold text-center text-yellow-400 mb-8">Get In Touch</h2>
      <p className="text-lg text-gray-300 mb-4">Feel free to reach out for collaborations or just a friendly hello!</p>
      <a href={`mailto:${contact.email}`} className="text-xl text-yellow-500 hover:text-yellow-300">
        {contact.email}
      </a>
      <div className="flex justify-center gap-8 mt-8">
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          LinkedIn
        </a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Contact;
