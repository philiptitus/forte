import React from 'react';

const AdminCard = () => {
  return (
<div>

<style>
        {`

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.container {
  width: 100%;
  height: 100%;
  padding: 0px 8%;
}

.container h1 {
  text-align: center;
  padding-top: 10%;
  margin-bottom: 60px;
  font-weight: 600;
  position: relative;
}

.container h1::after {
  content: '';
  background: red;
  width: 100px;
  height: 5px;
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 30px;
}

.service {
  text-align: center;
  padding: 25px 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  background: transparent;
  transition: transform 0.5s, background 0.5s;
}

.service i {
  font-size: 40px;
  margin-bottom: 10px;
  color: red;
}

.service h2 {
  font-weight: 600;
  margin-bottom: 8px;
}

.service:hover {
  background: red;
  color: #fff;
  transform: scale(1.05);
}

.service:hover i {
  color: #fff;
}
           `}
      </style>

    <div className="container">
      <h1>Our Services</h1>
      <div className="row">
        <div className="service">
          <i className="fas fa-user"></i>
          <h2>User Management</h2>
          <p>
Easily Manage Your staff and students under search. You Can View All Their Relevant info incase of anything.
          </p>
        </div>
        <div className="service">
          <i className="fas fa-cogs"></i>
          <h2>Staff Management</h2>
          <p>
Easily add staff to help in day to day hostel management
          </p>
        </div>
        <div className="service">
          <i className="fab fa-house"></i>
          <h2>Room Management</h2>
          <p>
We Provide a room numbering system for you to easily keep track of which room has students and easily move students who wish to change rooms
          </p>
        </div>
        <div className="service">
          <i className="fas fa-database"></i>
          <h2>Data Management</h2>
          <p>
We Keep Track of all Previous Accomodations and Payments made to your hostel
          </p>
        </div>
        <div className="service">
          <i className="fas fa-question"></i>
          <h2>Complains and Maintenance</h2>
          <p>
Students In Your hostel can make complains and maintenance request which the general hostel staff can see and attend to immediately while easily updating the student on the progress
          </p>
        </div>
        <div className="service">
          <i className="fas fa-clock"></i>
          <h2>Reminders</h2>
          <p>
Our system will mae timely reminders to students when their accomodatioon rent is due to renew one. It also cancels late accomodations automatically and clears expired ones
          </p>
        </div>
        <div className="service">
          <i className="fas fa-money-check-alt"></i>
          <h2>Payments</h2>
          <p>
All Your Payments are handled by stripe you can easily track them there but you can also track them here under the payments tab
          </p>
        </div>

      </div>
    </div>
    </div>

  );
};

export default AdminCard;
