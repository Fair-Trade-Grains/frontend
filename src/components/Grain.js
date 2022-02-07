import React from 'react';
import '../css/Grain.css';
import { useNavigate } from 'react-router'


const Grain = ({ grain, farm }) => {
  
  const navigate = useNavigate()

  const navigateToProfile = (event) => {
    event.preventDefault()
    navigate(`/farms/${event.target.id}`)
  }

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
        <button id={farm.id} onClick={(event) => {navigateToProfile(event)}}>View Details!</button>
        </>
      }
    </div>
  )
}

export default Grain;
