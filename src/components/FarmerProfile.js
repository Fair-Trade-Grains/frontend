import React, { useState } from 'react';
import '../css/FarmerProfile.css';
import { useParams, useNavigate } from 'react-router';
import Grain from './Grain';
import { useQuery, gql } from '@apollo/client';
import ReactModal from 'react-modal';
import NewEmailForm from './NewEmailForm';

export const GET_FARMERS = gql`
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

ReactModal.setAppElement('#root');

const FarmerProfile = () => {

  const navigate = useNavigate();
  const { farmID } = useParams();
  const [isOpen, setIsOpen] = useState(false)

  const { loading, error, data } = useQuery(GET_FARMERS);

  if (loading) return <p className='loading-message'>Loading...</p>;
  if (error) return <p>Error: Unable to connect to the server, please try again later.</p>;

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

  const handleOpenModal = () => {
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  return (
    <div className='farm-profile-container'>
      {window.location.href.includes('farms') && <button onClick={() => { navigate('/grains') }}>Return to List of Grains</button>}
      {!farm ? <p className='profile-error'>{`404: Sorry, no farm with and id of '${farmID}' exists.`}</p> :
        <section className='profile-container'>
          <div className='farmer-view-header'>
            <h2 className='farm-name'>{farm.name}</h2>
            <p className='farm-region'>Region: {farm.region}</p>
          </div>
          <div className="farmer-view-body">
            <div className="farmer-info-container">
              <img className='profile-pic' src={farm.photoUrl} alt={farm.name} />
              <article className='farmer-bio'>
                <p>{farm.bio}</p>
              </article>
              <article className='farmer-info'>
                <p className='invitation'>Reach out to us at:</p>
                <p>{farm.email}</p>
                <p>{farm.phone}</p>
                <p>{farm.address}</p>
                {window.location.href.includes('farms') && <button className='email-btn' onClick={() => { handleOpenModal() }}>Send an Email Now</button>}
              </article>
            </div>
            <div className='farmer-grain-container'>
              <h2 className='farm-name'>Our grains</h2>
              {grainCards ? grainCards : <p>Loading . . .</p>}
            </div>
          </div>
          <ReactModal isOpen={isOpen} className='email-modal-container'>
            <button onClick={() => { handleCloseModal() }} className='close-modal-btn'>Close</button>
            <NewEmailForm farmEmail={farm.email}/>
          </ReactModal>
        </section>
      }
    </div>
  );
}

export default FarmerProfile;
