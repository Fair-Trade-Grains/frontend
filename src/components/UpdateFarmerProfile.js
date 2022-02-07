import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { Link } from 'react-router-dom'
import '../css/UpdateFarmerProfile.css'
import NewGrainForm from './NewGrainForm'
import FarmerProfile from './FarmerProfile'

ReactModal.setAppElement('#root')

const UpdateFarmerProfile = () => {

  const [showModal, setShowModal] = useState(false)

  const handleOpendModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="update-farmer-view">
      <div className="nav-btn-container">
        <Link to="/farms" className="update-farmer-nav-btn">Return to Farm List</Link>
        <button onClick={() => { handleOpendModal() }} className="update-farmer-nav-btn">Add a New Grain</button>
      </div>
      <section className="farmer-details-container">
        <FarmerProfile />
      </section>
      <ReactModal isOpen={showModal}>
        <button onClick={() => { handleCloseModal() }} className="update-farmer-nav-btn">Close</button>
        <NewGrainForm />
      </ReactModal>
    </div>
  )
}

export default UpdateFarmerProfile