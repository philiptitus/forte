import React from 'react';
import "../css/Loader.css"

const Loader = () => {
  return (
    <div className="loading" style={{ color:"green" }}>
      <div className="loading" style={{ color:"green" }}>Loading&hellip;</div>
    </div>
  );
};

export default Loader;