import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'
import '../css/FarmerResults.css';
import Search from './Search';
import { useQuery, gql } from '@apollo/client';

const GET_FARMERS = gql`
  query {
    allFarmers {
      name
      id
      region
    }
  }
`;

const FarmerResults = () => {

  const navigate = useNavigate()

  const [farms, setFarms] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])

  const { loading, error, data } = useQuery(GET_FARMERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const farmCards = data.allFarmers.map(farm => {
    return (
      <div key={farm.id} className="farm-result">
        <p>{farm.name}</p>
        <p>{farm.region}</p>
        <button className='view-farm-btn' id={farm.id} onClick={(event) => {navigateToProfile(event)}}>View Profile / Update Grains</button>
      </div>
    )
  })

  const filteredCards = filtered.map(farm => {
    return (
      <div key={farm.id} className="farm-result">
        <p>{farm.name}</p>
        <p>{farm.region}</p>
        <button className='view-farm-btn' id={farm.id} onClick={(event) => {navigateToProfile(event)}}>View Profile / Update Grains</button>
      </div>
    )
  })

  const handleChange = (searchText) => {
    const farmsFiltered = farms.filter(farm => farm.name.toLowerCase().includes(searchText))
    setFiltered(farmsFiltered)
    setSearch(searchText)
  }

  const navigateToProfile = (event) => {
    event.preventDefault()
    navigate(`/new-grain/${event.target.id}`)
  }

  // useEffect(() => {
  //   setFarms(data.allFarmers)
  // }, [])

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
