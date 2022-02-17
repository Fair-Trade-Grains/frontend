import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Landing.css';

const Landing = () => {
  return (
    <div className='landing-container'>
      <div className='grains-portal'>
        <p className='landing-portal-title'>Check out some 'saawheat' grains!</p>
        <Link to='grains' className='landing-link'>Connect</Link>
      </div>
      <div className='farmers-portal'>
        <p className='landing-portal-title'>Or perhaps you have some grains to peddle?</p>
        <div className='landing-btn-container'>
          <Link to='create-farmer' className='landing-link'>New Farm</Link>
          <Link to='farms' className='landing-link'>Existing Farm</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
