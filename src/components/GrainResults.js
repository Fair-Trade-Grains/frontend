import React, { useEffect, useState } from 'react';
import '../css/GrainResults.css';
import Search from './Search'
import Grain from './Grain'
import { useQuery, gql } from '@apollo/client';

const GET_FARMERS = gql`
  query {
    allFarmers {
      name
      id
      region
      grains {
        name
        id
        moisture
        fallingNumber
        protein
        testWeight
        farmersNotes
        farmerId
      }
    }
  }
`;

const GrainResults = () => {

  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])

  const { loading, error, data } = useQuery(GET_FARMERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const grainCards = data.allFarmers.reduce((list, farm) => {
    farm.grains.map(grain => {
      list.push(<Grain key={grain.id} grain={grain} farm={farm} />)
    })
    return list
  }, [])

  const filteredCards = filtered.map(grain => {
    let farm = grainCards.find(farm => grain.farm_id === farm.id)
    return (
      <Grain key={grain.id} grain={grain} farm={farm}/>
    )
  })

  const handleChange = (searchText) => {
    const filteredList = data.allFarmers.reduce((filteredList, farm) => {
      farm.grains.map(grain => {
        if(grain.name.toLowerCase().includes(searchText)){
          filteredList.push(grain)
        }
      })
      return filteredList
    }, [])
    setFiltered(filteredList)
    setSearch(searchText)
  }

  return (
    <div className="grain-browse-view">
      <Search handleChange={handleChange} />
      <section className="grains-container">
        {(search && !filteredCards.length) && <p>No grains match the current search. Please start over!</p>}
        {search ? filteredCards : grainCards}
      </section>
    </div>
  )
}

export default GrainResults;
