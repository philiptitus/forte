
import React, { useState } from 'react';

export default function AForm({
  forgotScreen = true,
  resetScreen = false,
  value,
  onChange,
  value2,
  onChange2,
  onSubmit,
  value3,
  onChange3,
}) {
  const styles = `
    /* Add Material-UI based styles */
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

    #form {
      position: relative;
      background: #f0f0f0; /* Light gray background */
      max-width: 400px;
      margin: auto;
      padding: 25px;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    #form * {
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
    }

    #form legend {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 10px;
      color: #4caf50; /* Green legend text color */
    }

    input[type='password'],
    input[type='email'],
    input[type='submit'] {
      width: 100%;
      display: block;
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #4caf50; /* Green border */
      border-radius: 4px;
      box-sizing: border-box;
    }

    input[type='submit'] {
      background-color: #4caf50; /* Green button background color */
      color: #fff; /* White button text color */
      cursor: pointer;
    }

    input[type='submit']:hover {
      background-color: #45a049; /* Darker green on hover */
    }
  `;

  const Submission = (e) => {
    onSubmit(); // Call the onSubmit function passed as a prop
  };

  return (
    <div id='form' className='_form'>
      <style>{styles}</style>

      {resetScreen && (
        <form action='#' name='addUser' onSubmit={Submission}>
          <fieldset>
            <legend>PASSWORD</legend>
            <input
              type='password'
              name='password'
              placeholder=' New password'
              value={value2}
              onChange={onChange2}
            />
          </fieldset>
          <fieldset>
            <legend>PASSWORD</legend>
            <input
              type='password'
              name='confirm_password'
              placeholder=' Confirm password'
              value={value3}
              onChange={onChange3}
            />
          </fieldset>
          <input type='submit' name='submit' value='SET NEW PASSWORD' />
        </form>
      )}

      {forgotScreen && (
        <form action='#' name='addUser' onSubmit={Submission}>
          <fieldset>
            <legend>EMAIL</legend>
            <input
              type='email'
              name='email'
              placeholder=' Enter Registered Email'
              value={value}
              onChange={onChange}
            />
          </fieldset>
          <input
            type='submit'
            name='submit'
            value='SEND PASSWORD RESET LINK'
          />
        </form>
      )}
    </div>
  );
}

