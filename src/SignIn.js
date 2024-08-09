// src/SignIn.js
import React, { useState } from 'react';
import { auth, db } from './firebase'; // Import db for Firestore access
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // Attempt to sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      const role = userData.role; // Get the user's role from Firestore

      onLogin(user.uid, role);

      // Redirect to home page upon successful login
      navigate('/'); // Redirect to the home page or desired route
    } catch (error) {
      console.error('Error during sign-in:', error.message);
      setError('Sign-in failed: ' + error.message);
    }
  };

  return (
    <div className="formContainer">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn} className="form">
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="button">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
