import React from 'react';
import './Intro.css';
import data from '../data/portfolio.json';

const Intro = () => {
  const { title, text } = data.intro;

  return (
    <div className="intro-container">
      <div className="fade"></div>
      <section className="star-wars">
        <div className="crawl">
          <div className="title">
            <p>Episode IV</p>
            <h1>{title}</h1>
          </div>
          {text.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Intro;
