import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import '../css/UpdateFarmerProfile.css';
import NewGrainForm from './NewGrainForm';
import FarmerProfile from './FarmerProfile';
import { useParams } from 'react-router';

ReactModal.setAppElement('#root');

const UpdateFarmerProfile = () => {

  const { farmID } = useParams();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div className='update-farmer-view'>
      <div className='nav-btn-container'>
        <Link to='/farms' className='update-farmer-nav-btn'>Return to Farm List</Link>
        <button onClick={() => { handleOpenModal() }} className='update-farmer-nav-btn'>Add a New Grain</button>
      </div>
      <section className='farmer-details-container'>
        <FarmerProfile />
      </section>
      <ReactModal isOpen={showModal} className='new-grain-modal'>
        <button onClick={() => { handleCloseModal() }} className="close-modal-btn">Close</button>
        <NewGrainForm farmId={farmID} closeModal={handleCloseModal}/>
      </ReactModal>
    </div>
  );
}

export default UpdateFarmerProfile;
