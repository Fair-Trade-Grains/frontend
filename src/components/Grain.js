import React from 'react';
import '../css/Grain.css';

const Grain = ({grain, farm}) => {
  return (
    <div className="grain-result">
      <h2>{grain.name}</h2>
      <div>
        <p>Protein: {grain.protein}</p>
        <p>Moisture: {grain.moisture}</p>
        <p>Test Weight: {grain.test_weight}</p>
        <p>Falling Number: {grain.falling_number}</p>
      </div>
      {farm &&
        <>
          <div>
            <h3>Farmer Name: {farm.name}</h3>
            <p>Location: {farm.region}</p>
          </div>
          <button>View Details!</button>
        </>
      }
    </div>
  )
}

export default Grain;
