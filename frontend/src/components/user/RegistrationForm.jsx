import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!firstName || !lastName) {
      setError('Both first and last names are required.');
      return;
    }

    // Prepare data to send to the server
    const userData = {
      firstName,
      lastName
    };

    try {
      const response = await fetch('http://localhost:3001/user/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('data:', data);
      if (response.ok) {
        console.log('Registration successful', data);
        navigate('/'); // navigate user to homepage upon successful registration
      } else {
        throw new Error(data.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error.message);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default RegistrationForm;
