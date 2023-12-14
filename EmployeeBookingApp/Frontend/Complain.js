import React, { useState } from 'react';
import './Complain.css';

const Complain = () => {
 const [complainText, setComplainText] = useState('');
 const [message, setMessage] = useState('');

 const handleSubmit = () => {
    //add comment for the describing the process each
    setMessage('');
    if (!complainText) {
      setMessage('Please enter a complaint before submitting.');
      return;
    }
    //call api for adding the complaint
    fetch('api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ complainText }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setMessage('Your complaint has been successfully submitted.');
          setComplainText('');
        } else {
          setMessage('Something went wrong while submitting your complaint.');
        }
      })
      .catch((error) => {
        setMessage('Something went wrong while submitting your complaint.');
      });
 };

 return (
    <div className="complain-container">
      <h2>Submit Your Complaint</h2>
      <textarea
        className="complain-input"
        placeholder="Write your complaint here..."
        value={complainText}
        onChange={(e) => setComplainText(e.target.value)}
      />
      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
      {message && <p className="message">{message}</p>}
    </div>
 );
};

export default Complain;