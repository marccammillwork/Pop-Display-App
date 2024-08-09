// src/ModelList.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Import the db instance
import { collection, getDocs } from 'firebase/firestore';

const ModelList = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'models')); // Use the db alias
        const modelData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setModels(modelData);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="modelList">
      <h2>Model List</h2>
      {models.map(model => (
        <div key={model.id} className="modelItem">
          <h3>{model.name}</h3>
          <p>{model.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ModelList;
