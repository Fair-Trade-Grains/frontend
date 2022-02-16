import React, { useState } from 'react';
import '../css/NewEmailForm.css';
import { gql, useMutation } from '@apollo/client';

const CREATE_EMAIL = gql`
mutation ContactFarmer($input: ContactFarmerInput!){
  contactFarmer (input: $input) {
      response 
    }
  }
`;

const NewEmailForm = ({ farmEmail }) => {

  const [senderEmail, setSenderEmail] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [invalidField, setInvalidField] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [contactFarmer, { data, loading, error }] = useMutation(CREATE_EMAIL);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (senderEmail && emailBody) {
      setInvalidField(false);
      const newEmail = {
        farmer: farmEmail,
        sender: senderEmail,
        message: emailBody
      }
      contactFarmer({ variables: { input: newEmail } });
      setSuccessMessage('Congrats, your message sent! 🌾 The seeds have been sown!');
      clearInputs();
    } else {
      setInvalidField(true);
    }
  }

  const clearInputs = () => {
    setSenderEmail('');
    setEmailBody('');
    setInvalidField(false);
    setTimeout(() => { setSuccessMessage('') }, 3000);
  }

  return (
    <div className='new-email-modal'>
      <form className='new-email-form'>
        <label htmlFor='sender'>Your email address:</label>
        <input
          className='new-email-input'
          type='text'
          placeholder='example@gmail.com'
          id='sender'
          name='sender'
          value={senderEmail}
          onChange={event => setSenderEmail(event.target.value)}
          required
        />
        <label htmlFor='email'>What would you like to say?</label>
        <textarea className='new-email-input'
          id='email'
          placeholder='Introduce yourself and get those grains!'
          name='email'
          rows='6'
          value={emailBody}
          onChange={event => setEmailBody(event.target.value)}
          required
        ></textarea>
        <button onClick={e => { handleSubmit(e) }} type='submit'>Submit</button>
        {invalidField && <p className='form-invalid-input-msg'>Both fields are required.</p>}
        {successMessage && <p className='form-invalid-input-msg'>{successMessage}</p>}
      </form>
    </div>
  );
}

export default NewEmailForm;