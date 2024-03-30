import React from 'react';

const StudentCard = () => {
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
  background: #303ef7;
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
  color: #303ef7;
}

.service h2 {
  font-weight: 600;
  margin-bottom: 8px;
}

.service:hover {
  background: #303ef7;
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
          <i className="fas fa-laptop-code"></i>
          <h2>Online Booking</h2>
          <p>
  Students Can Now Easily Book Accomodations at any of our enlisted Hostels
          </p>
        </div>
        <div className="service">
          <i className="fas fa-money"></i>
          <h2>Payments</h2>
          <p>
We Handle All Our Payments Safely Through Stripe
          </p>
        </div>
        <div className="service">
          <i className="fab fa-sketch"></i>
          <h2>Complains & Maintenance</h2>
          <p>
Easily Send In Your Complains and maintenance requests to your current hostel manager under your profile
          </p>
        </div>
        <div className="service">
          <i className="fas fa-database"></i>
          <h2>Accomodation History</h2>
          <p>
We keep Track Of All your Previous Accomodations And Payments Incase You Need To Refer in Future
          </p>
        </div>
        <div className="service">
          <i className="fas fa-mobile-alt"></i>
          <h2>App Convenience</h2>
          <p>
This System Is Designed For Ease Of Convenience Even In Mobile phones
          </p>
        </div>
        <div className="service">
          <i className="fas fa-heart"></i>
          <h2>Reminders</h2>
          <p>
We will send you timely reminders when your rent is due
          </p>
        </div>
        <div className="service">
          <i className="fas fa-star"></i>
          <h2>Ratings</h2>
          <p>
Our Ratings System Helps other students pic the right hostel. Please Be sure to rate your Hostel once you finish your accomodation under Profile --> Reviews
          </p>
        </div>
        <div className="service">
          <i className="fas fa-support"></i>
          <h2>Support</h2>
          <p>
for any more questions visit : <a href='https://mrphilip.pythonanywhere.com/'>My Website</a>
          </p>
        </div>
      </div>
    </div>
    </div>

  );
};

export default StudentCard;
