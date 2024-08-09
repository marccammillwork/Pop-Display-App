// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import ARMeasuringTool from './ARMeasuringTool';
import ARDisplayPreview from './ARDisplayPreview';
import ProjectCatalog from './ProjectCatalog';
import Communication from './Communication';
import NewWorkOrder from './NewWorkOrder';
import Navbar from './Navbar';
import ModelUpload from './ModelUpload';
import OrderTracking from './OrderTracking';
import OrderEntry from './OrderEntry'; // Import the new OrderEntry component
import ModelList from './ModelList'; // Import the ModelList component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  const handleLogin = (id, role) => {
    setIsLoggedIn(true);
    setCustomerId(id);
    setUserRole(role);
    console.log('Logged in user ID:', id);
    console.log('Logged in user role:', role);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
          <Route path="/ar-measurement" element={<ARMeasuringTool />} />
          <Route path="/ar-preview" element={<ARDisplayPreview />} />
          <Route path="/projects" element={<ProjectCatalog />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/new-work-order" element={<NewWorkOrder />} />
          {userRole === 'employee' && (
            <>
              <Route path="/model-upload" element={<ModelUpload />} />
              <Route path="/order-entry" element={<OrderEntry />} /> {/* Add route for OrderEntry */}
            </>
          )}
          <Route path="/order-tracking" element={<OrderTracking customerId={customerId} userRole={userRole} />} />
          <Route path="/models" element={<ModelList />} />
          <Route path="/" element={
            <div className="container">
              <div className="formContainer">
                <img src="/logo.png" alt="Logo" className="logo" />
                <h1 className="title">Welcome to CAM Millwork Design Portal</h1>
                <p className="description">Your one-stop solution for AR measuring, project management, and communication.</p>
                <div className="buttons">
                  <Link to="/signup" className="button">Sign Up</Link>
                  <Link to="/signin" className="button">Sign In</Link>
                  {isLoggedIn && <Link to="/dashboard" className="button">Dashboard</Link>}
                  {isLoggedIn && userRole === 'employee' && <Link to="/model-upload" className="button">Upload Model</Link>}
                  {isLoggedIn && userRole === 'employee' && <Link to="/order-entry" className="button">Enter Order</Link>} {/* Add button for Order Entry */}
                  {isLoggedIn && <Link to="/order-tracking" className="button">Track Orders</Link>}
                  {isLoggedIn && <Link to="/models" className="button">View Models</Link>}
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
