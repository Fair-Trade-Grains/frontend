import React, { useEffect, useState } from 'react';
import '../css/FarmerResults.css';
import Search from './Search'
import data from '../mockData'

const FarmerResults = () => {

  const [farms, setFarms] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])

  const farmCards = farms.map(farm => {
    return (
      <div key={farm.id} className="farm-result">
        <p>{farm.name}</p>
        <p>{farm.region}</p>
        <button className='view-farm-btn'>View this Farm</button>
      </div>
      )
  })

  const filteredCards = filtered.map(farm => {
    return (
      <div key={farm.id} className="farm-result">
        <p>{farm.name}</p>
        <p>{farm.region}</p>
        <button className='view-farm-btn'>View this Farm</button>
      </div>
    )
  })

  useEffect(() => {
    setFarms(data.farms)
  }, [])

  const handleChange = (searchText) => {
    const farmsFiltered = farms.filter(farm => farm.name.toLowerCase().includes(searchText))
    setFiltered(farmsFiltered)
    setSearch(searchText)
  }

  return (
    <div className="farm-browse-view">
      <Search handleChange={handleChange}/>
      <section className="farms-container">
        {(search && !filteredCards.length) && <p>No farms match the current search. Please start over!</p>}
        {search ? filteredCards :
          farms ? farmCards : <p className='loading-message'>Loading . . .</p>
        }
      </section>
    </div>
  )
}

export default FarmerResults;
