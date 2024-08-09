import React from 'react';

const NewWorkOrder = () => {
  return (
    <div className="container">
      <div className="formContainer">
        <h1 className="title">New Work Order</h1>
        <form className="form">
          <input type="text" placeholder="Description" className="input" />
          <button type="submit" className="button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewWorkOrder;
