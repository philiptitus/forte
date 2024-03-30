import React from 'react';
import { Link } from 'react-router-dom';

function Bcard({id, resolved, student_id, date, status, description, link1}) {
  return (
    <div>

<style>
        {`

*, :before, :after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  html,
  body {
    width: 100vw;
    height: 100vh;
  }
  
  .site-wrapper {
    max-width: 960px;
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
    padding: 0;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
  }
  
  .container {
    width: 97%;
    padding: 3% 1.5%;
  }
  
  .info-card {
    max-width: 18.57142857rem;
    position: relative;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    border: 1.61803398875px solid #999;
    border-radius: 6.472135955px;
    padding: 20px;
    background-color: linear-gradient(#fff, #2f2f2f);
    margin: 4vh auto auto auto;
    box-shadow: 1.61803398875px 3.61803398875px 4.61803398875px #ccc;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: baseline;
  }
  
  .info-card__header {
    text-align: left;
  }
  
  .info-card__title {
    color:  rgb(139, 0, 139); 
    font-weight: bold;
    font-size: 18.61803398875px;
    letter-spacing: 0.01803398875px;
    margin-bottom: 10.1803398875px;
    margin-top: 10.61803398875px;
    text-transform: capitalize;
  }
  
  .info-card .info-card__counter {
    position: absolute;
    top: -24.61803398875px;
    right: -24.61803398875px;
    background-color: rgb(255, 0, 255);
    padding: 32.61803398875px;
    border-radius: 100%;
    width: 24.61803398875px;
    height: 24.61803398875px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .info-card .info-card__counter span {
    font-size: 26.61803398875px;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    color: #fff;
    font-weight: bolder;
  }
  
  .info-card:hover .info-card__counter span {
    -moz-transform: rotate(360deg);
    -moz-transition-duration: 0.5s;
    -moz-transition-timing-function: ease-in-out;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -webkit-transition-duration: 0.5s;
    -webkit-transition-timing-function: ease-in-out;
  }
  
  .info-card__entry {
    border-bottom: 1.61803398875px double rgba(0, 0, 0, 0.19);
    margin-bottom: 10.61803398875px;
    margin-top: 0;
  }
  
  .info-card__sub-title {
    margin-bottom: 8.61803398875px;
    margin-top: 8.61803398875px;
    font-weight: 800;
    font-size: 16.61803398875px;
    letter-spacing: 0.61803398875px / 2.16;
    font-weight: 800;
    color: #a8a8a8;
  }
  
  .info-card__content ul {
    margin-left: auto;
    margin-bottom: 22.61803398875px;
    margin-top: 0;
    margin-left: 26px;
    list-style-type: square;
    color: #ccc;
  }
  
  .info-card__content li a {
    display: block;
    margin-bottom: 6.61803398875px;
    text-decoration: none;
    color: magenta;
    background: transparent; 
  }
  
  .info-card__content li:hover a { text-decoration: underline; }
  
  .info-card__content li:last-child a { border: none; }
  
  .info-card__content span {
    font-weight: lighter;
    font-size: 14.61803398875px;
  }
  
  .info-card__entry:last-child {
    border-bottom: none;
  }
  
  .info-card__content .info-card__social {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  .info-card__social li a {
    display: block;
    width: 30px;
    height: 35px;
    border: none;
    margin-right: 10px;
  }
  
  .info-card__social li:last-child a { margin-right: auto; }
  
  .info-card__social li span {
    background: url('https://learn.shayhowe.com/assets/images/share/share.svg') no-repeat 0 0;
    border: 0.1px solid transparent;
    width: 100%;
    height: 100%;
    display: block;
  }
  
  .info-card .twitter { background-position: 0 0; }
  .info-card .fb { background-position: -30px 0; }
  .info-card .google { background-position: -60px 0; }
  
  .info-card li:hover .twitter { background-position: 0 -30px; }
  .info-card li:hover .fb { background-position: -30px -30px; }
  .info-card li:hover .google { background-position: -60px -30px; }
  
  
  @media screen and (max-width: 768px) {
    .info-card__title,
    .info-card__sub-title,
    .info-card__content span {
      font-size: 85%;
    }
    
    .info-card { 
      max-width: 16.618rem; 
    }
  }
  
  .animate * {
    -webkit-transition: all linear 3s;
    transition: all linear 3s;
    -moz-transition: all linear 3s;
  }

   `}
      </style>

<Link to={link1}>
    <section className="container">
      <aside className="info-card">
        <header className="info-card__header">
          <h4 className="info-card__title">{date}</h4>
        </header>

        <main className="info-card__content">
          <div className="info-card__counter"><span>{id}</span></div>
          <div className="info-card__entry">
            <h5 className="info-card__sub-title">Details</h5>
            <ul>
              <li>
                <a href="#"><span>Resolved: {resolved}</span></a>
              </li>
              <li>
                <a href="#"><span>Status: {status}</span></a>
              </li>

{ description &&             <li>
                <a href="#"><span>Description: {description}</span></a>
              </li>}

            </ul>
          </div>

          <h5 className="info-card__sub-title">STUDENT ID:</h5>
          <ul className="info-card__social">
            <h5>{student_id}</h5>
</ul>
        </main>
      </aside>
    </section>
    </Link>

    </div>


  );
}

export default Bcard;
