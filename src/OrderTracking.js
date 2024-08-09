// src/OrderTracking.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Import the db instance
import { collection, getDocs, query, where } from 'firebase/firestore';

const OrderTracking = ({ customerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersQuery = query(collection(db, 'orders'), where('customerId', '==', customerId));
        const querySnapshot = await getDocs(ordersQuery);
        const orderData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(orderData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (customerId) {
      fetchOrders();
    }
  }, [customerId]);

  return (
    <div className="orderTracking">
      <h2>Order Tracking</h2>
      {orders.map(order => (
        <div key={order.id} className="orderItem">
          <h3>Order ID: {order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Details: {order.details}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderTracking;
