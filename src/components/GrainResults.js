import React, { useEffect, useState } from 'react';
import '../css/GrainResults.css';
import Search from './Search'
import Grain from './Grain'
<<<<<<< HEAD
import { useQuery, gql } from '@apollo/client';
=======
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
>>>>>>> beta

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

<<<<<<< HEAD
=======
  // get rid of dummy data
  // connect here and farmersResults
  // also connect in profile views

  const [grains, setGrains] = useState([])
  const [farms, setFarms] = useState([])
>>>>>>> beta
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
    let farm = data.allFarmers.find(farm => `${grain.farmerId}` === farm.id)
    console.log(farm)
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
    console.log(filteredList, '<<<<filteredList')
    console.log(data.allFarmers)
  }

  return (
    <div className="grain-browse-view">
      <Search handleChange={handleChange} />
      <section className="grains-container">
        <GetFarmers />
        {(search && !filteredCards.length) && <p>No grains match the current search. Please start over!</p>}
        {search ? filteredCards : grainCards}
      </section>
    </div>
  )
}

export default GrainResults;
