import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Landing.css';

const Landing = () => {
  return (
    <div>
      <div className='grains-portal'>
        <Link to='grains'>Check out these grains </Link>
      </div>
      <div className='farmers-portal'>
        <p> Or perhaps you have some grains to peddle? </p>
        <Link to='create-farmer'>New Profile</Link>
        <Link to='farms'>Existing Profile</Link>
      </div>
    </div>
  )
}

export default Landing;
