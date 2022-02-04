import React from 'react';
import '../css/FarmerProfile.css';
import Grain from './Grain'
import data from '../mockData'
import wheatField from '../assets/wheatField.png'

const FarmerProfile = () => {
  const farm = data.farms[0]
  const grainCards = data.grains.filter(grain => grain.farm_id === farm.id)
    .map(grain => {
      return (
        <Grain grain={grain}/>
      )
  })

  return (
    <section>
      <div className="farmer-view-header">
        <h2>{farm.name}</h2>
        <p>{farm.region}</p>
      </div>
      <div className="farmer-view-body">
        <div className="farmer-info-container">
          <img src={wheatField} alt="wheat field ready for harvest under a cloudy blue sky"/>
          <article>
            <p>{farm.bio}</p>
            <p>{farm.email}</p>
            <p>{farm.business_phone}</p>
            <p>{farm.address}</p>
          </article>
        </div>
        <div className="farmer-grain-container">
          {grainCards ? grainCards : <p>Loading . . .</p>}
        </div>
      </div>
    </section>
  )
}

export default FarmerProfile;
