import React, { useState, useEffect } from 'react';
import { Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate()

  const signinHandler = () => {
    navigate('/sin')
    window.location.reload();
    
  };


  const signup = () => {
    navigate('/reg')
    window.location.reload();
    
  };



  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
      }, [navigate,userInfo]);
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
    }}>

      <style>
        {`
          body {
            background: rgba(0, 0, 0, 0.9);
            margin: 0;
            color: #fff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          .showcase {
            position: relative;
            height: 100vh; /* Default height for desktop/laptops */
          }
          
          /* Media query for mobile devices */
          @media (max-width: 768px) {
            .showcase {
              height: 50vh; /* Adjusted height for mobile devices */
            }
          }
          
          
          .showcase::after {
            content: '';
            height: 100%; /* Changed to 100% to cover the entire height of .showcase */
            width: 100%;
            background-image: url(https://image.ibb.co/gzOBup/showcase.jpg);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            display: block;
            filter: blur(10px);
            -webkit-filter: blur(10px);
            transition: all 1000ms;
          }
          
          /* Other CSS rules remain the same */
          
          
          .showcase:hover::after {
            filter: blur(0px);
            -webkit-filter: blur(0px);
          }
          
          .showcase:hover .content {
            filter: blur(2px);
            -webkit-filter: blur(2px);
          }
          
          .content {
            position: absolute;
            z-index: 1;
            top: 10%;
            left: 50%;
            margin-top: 105px;
            margin-left: -145px;
            width: 300px;
            height: 350px;
            text-align: center;
            transition: all 1000ms;
          }
          
          .content .logo {
            height: 180px;
            width: 180px;
          }
          
          .content .title {
            font-size: 2.2rem;
            margin-top: 1rem;
          }
          
          .content .text {
            line-height: 1.7;
            margin-top: 1rem;
          }
          
          .container {
            max-width: 960px;
            margin: auto;
            overflow: hidden;
            padding: 4rem 1rem;
          }
          
          .grid-3 {
            display: grid;
            grid-gap: 20px;
            grid-template-columns: repeat(3, 1fr);
          }
          
          .grid-2 {
            display: grid;
            grid-gap: 20px;
            grid-template-columns: repeat(2, 1fr);
          }
          
          .center {
            text-align: center;
            margin: auto;
          }
          
          .bg-light {
            background: #f4f4f4;
            color: #333;
          }
          
          .bg-dark {
            background: #333;
            color: #f4f4f4;
          }
          
          footer {
            padding: 2.2rem;
          }
          
          footer p {
            margin: 0;
          }
          
          /* Small Screens */
          @media (max-width: 560px) {
            .showcase::after {
              height: 50vh;
            }
          
            .content {
              top: 5%;
              margin-top: 5px;
            }
          
            .content .logo {
              height: 140px;
              width: 140px;
            }
          
            .content .text {
              display: none;
            }
          
            .grid-3,
            .grid-2 {
              grid-template-columns: 1fr;
            }
          
            .services div {
              border-bottom: #333 dashed 1px;
              padding: 1.2rem 1rem;
            }
          }
          
          /* Landscape */
          @media (max-height: 500px) {
            .content .title,
            .content .text {
              display: none;
            }
          
            .content {
              top: 0;
            }
          }
        `}
      </style>
      <header className="showcase" style={{
        marginBottom:"0px"
      }}>
        <div className="content">
          <img src="https://www.svgrepo.com/show/217004/bunk-bed-hotel.svg" className="logo" alt="Forte Logo" />
          <h1 className="title">Welcome to Forte</h1>
          <p className="text">Your ultimate solution for student hostel management</p>
        </div>

      </header>
      <Container style={{
        backgroundColor:"black"
      }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" onClick={signinHandler}>
                Sign In
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={signup}>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Container>
      {/* Services */}
      <section className="services"
      style={{
        backgroundColor:"black",
        marginTop:"0px"
      }}
      >
        <div className="container grid-3 center">
          <div>
            <i className="fas fa-bed fa-3x"></i>
            <h3>Hostel Management</h3>
            <p>Efficiently manage all aspects of your student hostels</p>
          </div>
          <div>
            <i className="fas fa-search fa-3x"></i>
            <h3>Find Accommodation</h3>
            <p>Students can easily find available hostel accommodations</p>
          </div>
          <div>
            <i className="fas fa-user-graduate fa-3x"></i>
            <h3>Student Services</h3>
            <p>Additional services and support for students seeking accommodation</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about bg-light">
        <div className="container">
          <div className="grid-2">
            <div className="center">
              <i className="fas fa-building fa-10x"></i>
            </div>
            <div>
              <h3>About Forte</h3>
              <p>Forte is a comprehensive hostel management system designed to streamline the process for both hostel managers and students. Our platform ensures efficient hostel management while making it convenient for students to find suitable accommodation.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="center bg-dark">
        <p>Forte by <a href='https://mrphilip.pythonanywhere.com/'
        style={{
          color:"white"
        }}
        >Philip</a> &copy; 2024</p>
      </footer>
    </div>
  );
}

export default LandingPage;
