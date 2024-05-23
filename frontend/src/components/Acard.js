import React from 'react';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';

const Acard = ({number, paid, student_id, room, status, price, link1, showRed}) => {

    const isMobile = window.innerWidth <= 768; // Check if the screen width is less than or equal to 768 pixels
  
    const divStyle = {
      textAlign: 'center',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: isMobile ? "0" : "100px" // Set marginLeft to 0 for mobile screens
    };
  return (
    <div style={divStyle}>




<style>
  {`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: #f3f3f3;
  }
  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .card {
    width: 100%; /* Adjusted width to fit smaller screens */
    box-shadow: 0 10px 15px -5px rgba(0,0,0,.1), 0 5px 5px -5px rgba(0,0,0,.04); /* Reduced shadow for mobile */
    border-radius: 5px; /* Reduced border radius for mobile */
  }
  .card img {
    width: 100%;
    border-radius: 5px 5px 0 0; /* Reduced border radius for mobile */
  }
  .card-title {
    width: calc(100% - 20px); /* Adjusted width to fit smaller screens */
    background: #fff;
    padding: 5px; /* Reduced padding for mobile */
    position: relative; /* Changed position to relative for proper stacking */
    top: 0; /* Reset top position */
    transform: none; /* Reset transform */
    border-radius: 5px 5px 0 0; /* Reduced border radius for mobile */
    box-shadow: 0 10px 15px -5px rgba(0,0,0,.1), 0 5px 5px -5px rgba(0,0,0,.01); /* Reduced shadow for mobile */
  }
  .card-title h4 {
    font-family: 'Roboto', sans-serif;
  }
  .card-title h3 {
    font-weight: normal;
    font-family: 'Source Sans Pro', sans-serif;
  }
  .card-content {
    width: 100%;
    background: #fff;
    padding: 20px 10px; /* Adjusted padding for smaller screens */
    border-radius: 0 0 5px 5px; /* Reduced border radius for mobile */
  }
  .card-content-row {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #e2e8f0;
  }
  .card-content-col {
    width: 100%; /* Adjusted width for smaller screens */
    padding: 10px; /* Adjusted padding for smaller screens */
    font-family: 'Source Sans Pro', sans-serif;
  }
  .card-content-col .fa {
    font-size: 12px; /* Reduced font size for mobile */
    vertical-align: middle;
    margin-right: 5px; /* Reduced margin for mobile */
    color: #718096;
  }
  .card-content-user-info {
    width: 100%;
    padding: 5px; /* Reduced padding for mobile */
    display: flex;
    background: #f7fafc;
    border-radius: 0 0 5px 5px; /* Reduced border radius for mobile */
  }
  .card-content-user-info img {
    width: 30px; /* Reduced width for mobile */
    height: 30px; /* Reduced height for mobile */
    margin: 5px; /* Reduced margin for mobile */
    border-radius: 50%;
    vertical-align: middle;
  }
  .card-content-user-info h4 {
    font-family: 'Roboto', sans-serif;
  }
  .card-content-user-info p {
    font-family: 'Roboto', sans-serif;
  }
  .card-content-user-info .card-content-user-contact {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px; /* Adjusted padding for smaller screens */
  }
  @media only screen and (min-width: 768px) {
    /* Adjustments for larger screens */
    .card {
      width: 400px;
      border-radius: 10px;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04);
    }
    .card img {
      border-radius: 10px 10px 0 0;
    }
    .card-title {
      width: calc(100% - 40px);
      top: 170px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px;
      position: absolute;
      border-radius: 5px;
      box-shadow: 0 10px 15px -5px rgba(0,0,0,.1), 0 5px 5px -5px rgba(0,0,0,.01);
    }
    .card-content {
      border-radius: 0 0 10px 10px;
    }
    .card-content-user-info {
      border-radius: 0 0 10px 10px;
    }
    .card-content-user-info img {
      width: 60px;
      height: 60px;
      margin: 10px;
    }
  }
  `}
</style>


   {showRed? (



<Link to={link1}>
<div className="main" >
  <div className="card">
    <img src="https://d26tqmt1mjuqkn.cloudfront.net/_img_/509629103/8012510c6fcdfd63001cbd03498642ca313b0891/1200-0-60" alt="House Image" />
    <div className="card-title">
      <h4>Accomodation NO•</h4>
      <h4>{number}</h4>
      <h3>Price: ${price}</h3>
      <p>Status: <b>{status}</b></p>
    </div>
    <div className="card-content">
      <div className="card-content-row">
        <div className="card-content-col">
          <i className="fa fa-bed"></i>
          <b>Room No:</b> {room}
        </div>
        <div className="card-content-col">
          <i className="fa fa-money"></i>
          <b>Paid:</b> {paid}
        </div>
      </div>
      <div className="card-content-user-info">
        <img src="https://www.svgrepo.com/show/492688/avatar-boy.svg" alt="Agent" />
        <div className="card-content-user-contact">
          <h4>Student ID Number:</h4>
          <p>({student_id})</p>
        </div>
      </div>
    </div>
  </div>
</div>
</Link>

   ): (


    <Link to={link1}>

<div className="main" >
  <div className="card">
    <img src="https://d26tqmt1mjuqkn.cloudfront.net/_img_/509629103/8012510c6fcdfd63001cbd03498642ca313b0891/1200-0-60" alt="House Image" />
    <div className="card-title">
      <h4>Accomodation NO•</h4>
      <h4>{number}</h4>
      <h3>Price: ${price}</h3>
      <p>Status: <b>{status}</b></p>
    </div>
    <div className="card-content">
      <div className="card-content-row">
        <div className="card-content-col">
          <i className="fa fa-bed"></i>
          <b>Room No:</b> {room}
        </div>
        <div className="card-content-col">
          <i className="fa fa-money"></i>
          <b>Paid:</b> {paid}
        </div>
      </div>
      <div className="card-content-user-info">
        <img src="https://www.svgrepo.com/show/492688/avatar-boy.svg" alt="Agent" />
        <div className="card-content-user-contact">
          <h4>Student ID Number:</h4>
          <p>({student_id})</p>
        </div>
      </div>
    </div>
  </div>
</div>
</Link>
   )}




    </div>


  );
};

export default Acard;
