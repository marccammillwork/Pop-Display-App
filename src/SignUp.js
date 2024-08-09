// src/SignUp.js
import React, { useState } from 'react';
import { auth, db } from './firebase'; // Import the auth and db instances
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore'; // Import necessary Firestore methods

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('customer'); // Default to customer
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Define allowed employee domains
  const allowedEmployeeDomains = ['@cammillwork.com']; // Add more domains as needed

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(''); // Clear success message

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Check if the email is for an employee and validate domain
    if (accountType === 'employee') {
      if (!allowedEmployeeDomains.some(domain => email.endsWith(domain))) {
        setError(`Only emails ending with ${allowedEmployeeDomains.join(' or ')} are allowed for employees.`);
        return;
      }
    }

    try {
      // Create a new user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);

      // Add user to Firestore collection
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        role: accountType,
        createdAt: new Date().toISOString()
      });

      setSuccess('Account created successfully!');
    } catch (error) {
      console.error('Error during signup:', error.message);
      setError('Signup failed: ' + error.message);
    }
  };

  return (
    <div className="formContainer">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="form">
        <select
          className="input"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="employee">Employee</option>
        </select>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="input"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" className="button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
