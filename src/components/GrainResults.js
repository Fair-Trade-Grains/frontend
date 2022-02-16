import React, { useState } from 'react';
import '../css/GrainResults.css';
import Search from './Search';
import Grain from './Grain';
import { useQuery, gql } from '@apollo/client';
import ReactModal from 'react-modal';
import usdaRegionMap from '../assets/usdaRegionMap.png';

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

ReactModal.setAppElement('#root');

const GrainResults = () => {

  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

  const { loading, error, data } = useQuery(GET_FARMERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: Unable to connect to the server, please try again later.</p>;

  const grainCards = data.allFarmers.reduce((list, farm) => {
    farm.grains.map(grain => {
      list.push(<Grain key={grain.id} grain={grain} farm={farm} />);
    });
    return list;
  }, []);

  const filteredCards = filtered.map(grain => {
    let farm = data.allFarmers.find(farm => `${grain.farmerId}` === farm.id);
    return (
      <Grain key={grain.id} grain={grain} farm={farm} />
    );
  });

  const handleOpenModal = () => {
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  const handleChange = (searchText) => {
    const filteredList = data.allFarmers.reduce((filteredList, farm) => {
      farm.grains.map(grain => {
        if (grain.name.toLowerCase().includes(searchText)) {
          filteredList.push(grain);
        }
      })
      return filteredList;
    }, []);
    setFiltered(filteredList);
    setSearch(searchText);
  };

  return (
    <div className='grain-browse-view'>
      <button className='grains-map-modal-btn' onClick={() => {handleOpenModal()}}>See map of the regions!</button>
      <Search handleChange={handleChange} />
      <section className='grains-container'>
        {(search && !filteredCards.length) && <p className='grains-search-error-msg'>No grains match the current search. Please start over!</p>}
        {search ? filteredCards : grainCards}
      </section>
      <ReactModal isOpen={isOpen} className='map-modal-container'>
        <button onClick={() => {handleCloseModal()}} className='close-modal-btn'>Close</button>
        <img className='usda-region-map' src={usdaRegionMap} alt='USDA Agriculture Regions Map' />
      </ReactModal>
    </div>
  );
}

export default GrainResults;
