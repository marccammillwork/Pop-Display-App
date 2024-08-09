// src/ModelUpload.js
import React, { useState } from 'react';
import { db, storage, auth } from './firebase'; // Import auth to get the current user
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ModelUpload = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpload = async () => {
    setError('');
    setSuccess('');

    if (!name || !description || !file) {
      setError('Please fill in all fields and select a file.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('You must be logged in to upload a model.');
        return;
      }

      // Use the current user's ID in the storage path
      const storageRef = ref(storage, `models/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      // Store metadata in Firestore, associating it with the user
      await addDoc(collection(db, 'models'), {
        name,
        description,
        fileUrl: downloadURL,
        userId: user.uid, // Store the user ID for reference
        uploadedAt: new Date().toISOString(),
      });

      setSuccess('Model uploaded successfully!');
      setName(''); // Clear the form fields
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading model:', error);
      setError('Error uploading model: ' + error.message);
    }
  };

  return (
    <div className="modelUpload">
      <h2>Upload Model</h2>
      <input
        type="text"
        placeholder="Model Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Model Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ModelUpload;
