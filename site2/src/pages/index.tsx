import React from 'react';
import Site from '../components/Site';
import PersonalDetails from '../components/PersonalDetails';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Main = () => {
  return (
    <Site>
      <PersonalDetails />
      <About />
      <Projects />
      <Contact />
    </Site>
  );
};

export default Main;
