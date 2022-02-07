import React from 'react';
import '../css/FarmerProfile.css';
import { useParams } from 'react-router'
import Grain from './Grain'
import data from '../mockData'
import wheatField from '../assets/wheatField.png'

const FarmerProfile = () => {

  const { farmID } = useParams()
  
  const farm = data.farms.find(farm => farm.id === Number(farmID))
 
  const grainCards = data.grains.filter(grain => grain.farm_id === Number(farmID))
    .map(grain => {
      return (
        <Grain key={grain.id} grain={grain}/>
      )
    })

  return (
    <div className="farm-profile-container">
      {!farm ? <p className="profile-error">{`404: Sorry, no farm with and id of '${farmID}' exists.`}</p> :
        <section>
          <div className="farmer-view-header">
            <h2 className="farm-name">{farm.name}</h2>
            <p className='farm-region'>Region: {farm.region}</p>
          </div>
          <div className="farmer-view-body">
            <div className="farmer-info-container">
              <img src={wheatField} alt="wheat field ready for harvest under a cloudy blue sky" />
              <article className="farmer-info">
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
      }
    </div>
  )
}

export default FarmerProfile;
