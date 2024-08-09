// src/OrderEntry.js
import React, { useState } from 'react';
import { db, auth } from './firebase'; // Ensure you import auth and db from firebase
import { collection, addDoc } from 'firebase/firestore';

const OrderEntry = () => {
  const [orderId, setOrderId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [status, setStatus] = useState('pending');
  const [items, setItems] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!orderId || !customerId || !items) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('You must be logged in to add an order.');
        return;
      }

      const itemsArray = items.split(',').map(item => item.trim());

      await addDoc(collection(db, 'orders'), {
        orderId,
        customerId,
        employeeId: user.uid,
        status,
        items: itemsArray,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setSuccess('Order added successfully!');
      setOrderId('');
      setCustomerId('');
      setStatus('pending');
      setItems('');
    } catch (error) {
      console.error('Error adding order:', error);
      setError('Error adding order: ' + error.message);
    }
  };

  return (
    <div className="orderEntry">
      <h2>Enter New Order</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="text"
          placeholder="Items (comma-separated)"
          value={items}
          onChange={(e) => setItems(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" className="button">Add Order</button>
      </form>
    </div>
  );
};

export default OrderEntry;

