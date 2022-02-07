import React, { useState } from 'react'
import ReactModal from 'react-modal'
import {useParams} from 'react-router'
import '../css/UpdateFarmerProfile.css'
import NewGrainForm from './NewGrainForm'

ReactModal.setAppElement('#root')

const UpdateFarmerProfile = () => {

  const { farmID } = useParams()
  const [showModal, setShowModal] = useState(false)

  const handleOpendModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="update-farmer-view">
      <button onClick={() => { handleOpendModal() }}>Open Modal</button>
      <ReactModal isOpen={showModal}>
        <button onClick={() => { handleCloseModal() }}>Close Modal</button>
      </ReactModal>
    </div>
  )
}

export default UpdateFarmerProfile