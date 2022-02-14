import React, { useEffect, useState } from 'react';
import '../css/GrainResults.css';
import Search from './Search'
import Grain from './Grain'
import data from '../mockData'
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

// const GET_GRAINS = gql`
//   query {
//     allGrains {
//       name
//       id
//       moisture
//       fallingNumber
//       protein
//       testWeight
//       farmersNotes
//       farmerId
//     }
//   }
// `;

const GetFarmers = () => {

  const { loading, error, data } = useQuery(GET_FARMERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allFarmers.reduce((list, farm) => {
    farm.grains.map(grain => {
      list.push(<Grain key={grain.id} grain={grain} farm={farm} />)
    })
    return list
  }, [])
}

const GrainResults = () => {

  // need to fetch all grains from server and setState with setGrains
  // need to fetch all farms with just .id, .name & .region

  // get rid of dummy data
  // connect here and farmersResults
  // also connect in profile views

  const [grains, setGrains] = useState([])
  const [farms, setFarms] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])

  const grainCards = grains.map(grain => {
    let farm = farms.find(farm => grain.farm_id === farm.id)
    return (
      <Grain key={grain.id} grain={grain} farm={farm}/>
      )
  })

  const filteredCards = filtered.map(grain => {
    let farm = farms.find(farm => grain.farm_id === farm.id)
    return (
      <Grain key={grain.id} grain={grain} farm={farm}/>
    )
  })

  useEffect(() => {
    setFarms(data.farms)
    setGrains(data.grains)
  }, [])

  const handleChange = (searchText) => {
    const grainsFiltered = grains.filter(grain => grain.name.toLowerCase().includes(searchText))
    // console.log(grainsFiltered)
    setFiltered(grainsFiltered)
    setSearch(searchText)
    // console.log(grains)
  }

  return (
    <div className="grain-browse-view">
      <Search handleChange={handleChange} />
      <section className="grains-container">
        <GetFarmers />
        {(search && !filteredCards.length) && <p>No grains match the current search. Please start over!</p>}
        {search ? filteredCards :
          (grains && farms) ? grainCards : <p className='loading-message'>Loading . . .</p>
        }
      </section>
    </div>
  )
}

export default GrainResults;
