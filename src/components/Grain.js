import React from 'react';
import '../css/Grain.css';
import { useNavigate } from 'react-router';
import wheatIcon from '../assets/wheat.svg';
import statsIcon from '../assets/stats.svg';
import barnIcon from '../assets/barn.svg';
import { gql, useMutation } from '@apollo/client';
import { GET_FARMERS } from './FarmerProfile';

const DELETE_GRAIN = gql`
mutation DeleteGrain($input: DeleteGrainInput!){
  deleteGrain (input: $input) {
      response
    }
  }
`;

const Grain = ({ grain, farm, stub }) => {

  const navigate = useNavigate();

  const [deleteGrain, { data, loading, error }] = useMutation(DELETE_GRAIN, {
    refetchQueries: [
      GET_FARMERS
    ]
  });

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const navigateToProfile = (event) => {
    event.preventDefault();
    navigate(`/farms/${event.target.id}`);
  }

  return (
    <div className={`grain-result ${stub}`}>
      <div className='grain-name'>
        <img className='wheat-icon' src={wheatIcon} />
        <h2>{grain.name}</h2>
      </div>
      <div className='grain-stats'>
        <img className='stats-icon' src={statsIcon} />
        <div>
          <p>Protein: {grain.protein}</p>
          <p>Moisture: {grain.moisture}</p>
          <p>Test Weight: {grain.testWeight}</p>
          <p>Falling Number: {grain.fallingNumber}</p>
        </div>
      </div>
      {farm &&
        <>
          <div className='farmer-stats'>
            <img className='barn-icon' src={barnIcon} />
            <div>
              <h3>{farm.name}</h3>
              <p>{farm.region}</p>
            </div>
          </div>
          <button className='view-farm-btn' id={farm.id} onClick={(event) => { navigateToProfile(event) }}>View Details!</button>
        </>
      }
      {window.location.href.includes('new-grain') && <button className='delete-grain-btn' onClick={e => {
        e.preventDefault();
        deleteGrain({ variables: { input: { id: grain.id } } });
      }} type='submit'>Delete Grain</button>}
    </div>
  );
}

export default Grain;
