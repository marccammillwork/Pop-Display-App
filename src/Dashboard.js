import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="formContainer">
        <h1 className="title">Dashboard</h1>
        <ul className="form">
          <li><Link to="/ar-measurement" className="link">AR Measuring Tool</Link></li>
          <li><Link to="/ar-preview" className="link">AR Display Preview</Link></li>
          <li><Link to="/projects" className="link">Project Catalog</Link></li>
          <li><Link to="/communication" className="link">Communication</Link></li>
          <li><Link to="/new-work-order" className="link">New Work Order</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
