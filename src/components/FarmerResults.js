import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../css/FarmerResults.css';
import Search from './Search';
import barnIcon from '../assets/barn.svg';
import mapIcon from '../assets/map.svg';
import { useQuery, gql } from '@apollo/client';

export const GET_FARMERS = gql`
  query {
    allFarmers {
      name
      id
      region
    }
  }
`;

const FarmerResults = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  const { loading, error, data } = useQuery(GET_FARMERS);

  if (loading) return <p className='loading-message'>Loading...</p>;
  if (error) return <p>Error: Unable to connect to the server, please try again later.</p>;

  const farmCards = data.allFarmers.map(farm => {
    return (
      <div key={farm.id} className="farm-result">
        <div className='farm-name'>
          <img className='barn-icon' src={barnIcon} />
          <p>{farm.name}</p>
        </div>
        <div className='farm-results-region'>
          <img className='map-icon' src={mapIcon} />
          <p>{farm.region}</p>
        </div>
        <button className='view-farm-btn' id={farm.id} onClick={(event) => {navigateToProfile(event)}}>View Profile / Update Grains</button>
      </div>
    );
  });

  const filteredCards = filtered.map(farm => {
    return (
      <div key={farm.id} className="farm-result">
      <div className='farm-name'>
        <img className='barn-icon' src={barnIcon} />
        <p>{farm.name}</p>
      </div>
      <div className='farm-results-region'>
        <img className='map-icon' src={mapIcon} />
        <p>{farm.region}</p>
      </div>
        <button className='view-farm-btn' id={farm.id} onClick={(event) => {navigateToProfile(event)}}>View Profile / Update Grains</button>
      </div>
    );
  });

  const handleChange = (searchText) => {
    const farmsFiltered = data.allFarmers.filter(farm => farm.name.toLowerCase().includes(searchText));
    setFiltered(farmsFiltered);
    setSearch(searchText);
  }

  const navigateToProfile = (event) => {
    event.preventDefault();
    navigate(`/new-grain/${event.target.id}`);
  }

  return (
    <div className='farm-browse-view'>
      <Search handleChange={handleChange} />
      <section className='farms-container'>
        {(search && !filteredCards.length) && <p>No farms match the current search. Please start over!</p>}
        {search ? filteredCards : farmCards}
      </section>
    </div>
  );
}

export default FarmerResults;
