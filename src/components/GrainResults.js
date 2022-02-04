import React, { useEffect, useState } from 'react';
import '../css/GrainResults.css';
import Search from './Search'
import Grain from './Grain'
import data from '../mockData'

const GrainResults = () => {

  // need to fetch all grains from server and setState with setGrains
  // need to fetch all farms with just .name & .region
  
  const [grains, setGrains] = useState([])
  const [farms, setFarms] = useState([])
  
  const grainCards = grains.map(grain => {
    let farm = farms.find(farm => grain.farm_id === farm.id)
    return (
      <Grain key={grain.id} grain={grain} farm={farm}/>
      )
    })
    
  useEffect(() => {
    setFarms(data.farms)
    setGrains(data.grains)
  })

  return (
    <div className="grain-browse-view">
      <Search />
      <section className="grains-container">
          { (grains && farms) ? grainCards : <p className='loading-message'>Loading . . .</p>}
      </section>  
    </div>
  )
}

export default GrainResults;
