import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Landing.css';

const Landing = () => {
  return (
    <div>
      <div className='grains-portal'>
        <p>Check out some 'saawheat' grains!</p>
        <Link to='grains'>Connect</Link>
      </div>
      <div className='farmers-portal'>
        <p>Or perhaps you have some grains to peddle?</p>
        <Link to='create-farmer'>New Farm</Link>
        <Link to='farms'>Existing Farm</Link>
      </div>
    </div>
  )
}

export default Landing;
