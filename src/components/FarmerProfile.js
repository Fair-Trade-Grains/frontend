import React from 'react';
import '../css/FarmerProfile.css';
import { useParams, useNavigate } from 'react-router';
import Grain from './Grain';
import wheatField from '../assets/wheatField.png';
import { useQuery, gql } from '@apollo/client';

const GET_FARMERS = gql`
  query {
    allFarmers {
      name
      id
      email
      phone
      address
      region
      bio
      photoUrl
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

const FarmerProfile = () => {

  const navigate = useNavigate();
  const { farmID } = useParams();

  const { loading, error, data } = useQuery(GET_FARMERS);

  if (loading) return <p className='loading-message'>Loading...</p>;
  if (error) return <p>Error: Unable to connect to server, try again later.</p>;

  let farm = false;
  let grainCards = false;
  let validPath = data.allFarmers.some(farm => farm.id === farmID);

  if (validPath) {
    farm = data.allFarmers.find(farm => farm.id === farmID);
    grainCards = farm.grains.map(grain => {
      return (
        <Grain key={grain.id} grain={grain} stub={'grain-card-stub'} />
      );
    });
  }

  return (
    <div className='farm-profile-container'>
      {window.location.href.includes('farms') && <button onClick={() => { navigate('/grains') }}>Return to List of Grains</button>}
      {!farm ? <p className='profile-error'>{`404: Sorry, no farm with and id of '${farmID}' exists.`}</p> :
        <section>
          <div className='farmer-view-header'>
            <h2 className='farm-name'>{farm.name}</h2>
            <p className='farm-region'>Region: {farm.region}</p>
          </div>
          <div className='farmer-view-body'>
            <div className='farmer-info-container'>
              <img src={wheatField} alt='wheat field ready for harvest under a cloudy blue sky' />
              <article className='farmer-bio'>
                <p>{farm.bio}</p>
              </article>
              <article className='farmer-info'>
                <p className='invitation'>Reach out to us at:</p>
                <p>{farm.email}</p>
                <p>{farm.phone}</p>
                <p>{farm.address}</p>
              </article>
            </div>
            <div className='farmer-grain-container'>
              <h2 className='farm-name'>Our grains</h2>
              {grainCards ? grainCards : <p>Loading . . .</p>}
            </div>
          </div>
        </section>
      }
    </div>
  );
}

export default FarmerProfile;
