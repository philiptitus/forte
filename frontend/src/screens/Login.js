import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from '../actions/userAction';
import { useSnackbar } from 'notistack';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from "axios"
import { Row } from 'react-bootstrap'
import {  Typography, Snackbar } from '@mui/material';
import Loader from '../components/Loader2';




function LoginScreen() {
  const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const redirect =  '/login';
  const redirecter = location.search ? Number(location.search.split('=')[1]) : '/';

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [user_type, setuser_Type] = useState('');
  const [Id_number, setId_number] = useState('');


  const [guardianName, setGuardianName] = useState('');
  const [guardianContact, setGuardianContact] = useState('');
  const [guardian2Name, setGuardian2Name] = useState('');
  const [guardian2Contact, setGuardian2Contact] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo, success } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { error:errorLogin, loading:loadingLogin, userInfo:userInfoLogin, sucess:successLogin } = userLogin;

  const [errorer, setError] = useState('');


  const forgotPassword = useSelector((state) => state.forgotPassword);
  const {  success:successReset } = forgotPassword;



  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar("The Passwords Did not Match ! ", { variant: 'error' })
    } else {
      try {
        await dispatch(register(name, email, password, gender, user_type, Id_number));
        {success && navigate(redirect) }
        
      } catch (error) {
        
        enqueueSnackbar(error, { variant: 'error' })
      }
    }
  };

  const LoginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [dispatch, navigate, userInfo, redirect]);

  useEffect(() => {
    if (userInfoLogin) {
      navigate(redirecter);
    }
  }, [dispatch, navigate, userInfoLogin, redirecter]);





  
  const cssStyles = `
  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Jost', sans-serif;
    background: linear-gradient(to bottom, #00ff00, #000000);
  }
  
  .main{

    width: ;
    height: 530px;
    background: green;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 5px 20px 50px #000;
  }
  #chk{
    display: none;
  }
  .signup{
    position: relative;
    width:100%;
    height: 100%;
  }
  label{
    color: #fff;
    font-size: 2.3em;
    justify-content: center;
    display: flex;
    margin: 60px;
    font-weight: bold;
    cursor: pointer;
    transition: .5s ease-in-out;
  }
  .sign{

    margin: 30px;



  }
  input{
    width: 60%;
    height: 20px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
  }
  button{
    width: 30%;
    height: 50px;
    margin: 30px auto;
    justify-content: center;
    display: block;
    color: green;
    background: white;
    font-size: 0.8em;
    font-weight: bold;
    margin-top: 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: .2s ease-in;
    cursor: pointer;
  }
  button:hover{
    background: grey;
  }
  .login{
    height: 460px;
    background: #eee;
    border-radius: 10% / 10%;
    transform: translateY(-180px);
    transition: .8s ease-in-out;z
  }
  .login label{
    color: green;
    transform: scale(.6);
  }
  
  #chk:checked ~ .login{
    transform: translateY(-500px);
  }
  #chk:checked ~ .login label{
    transform: scale(1);  
  }
  #chk:checked ~ .signup label{
    transform: scale(.6);
  }
  `;

  return (

    <>
      <style>{cssStyles}</style>




{loading || loadingLogin ? (
  <div>
    <Row className='justify-content-center align-items-center'>

      <Loader/>
      </Row>

  </div>
):  (
  

  <div className="main">
          <Row className='justify-content-center'>

          <Snackbar 
          
  open={errorLogin}
  message={<span style={{ color: '#ff0000' }}>{errorLogin}</span>}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
/>

<Snackbar 
          
          open={success}
          message={<span style={{ color: 'green' }}>"You Can Now Log In"</span>}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />

<Snackbar 
  open={error}
  message={<span style={{ color: '#ff0000' }}>{error}</span>}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
/>

  </Row>

  <input type="checkbox" id="chk" aria-hidden="true" />

  <div className="signup">
  <form onSubmit={submitHandler}>
    {/* <h3 style={{ alignItems: "center", textAlign: "center", color: "white", fontFamily: "'Georgia', 'Times New Roman', serif" }}>GALL</h3> */}

    <label htmlFor="chk" aria-hidden="true" className='sign'>
      Sign up
    </label>
    <input className="un" type="name" align="center" required="true" placeholder="Enter User Name"
     value={name}
      onChange={(e) => setName(e.target.value)}
      
      />
    <input className="un"  required="true" type="email" align="center" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input 
  className="un" 
  type="number" 
  required="true"
  placeholder="Enter Your ID NO" 
  value={Id_number} 
  onInput={(e) => {
    // Remove leading zeros and non-numeric characters
    let input = e.target.value.replace(/^0+/, '').replace(/\D/g, '');
    // Ensure the input has at most 8 digits
    input = input.slice(0, 8);
    // Update the state with the validated ID number
    setId_number(input);

    // Display error message if the input is not 8 digits
    const errorMessage = input.length !== 8 ? 'ID number must be exactly 8 digits' : '';
    setError(errorMessage);
  }} 
/>

<Row className='justify-content-center align-items-center'

style={{
textAlign:"center",
marginLeft:"102px",
marginRight:"102px"


}}
>

    <select style={{ textAlign:"center", alignItems:"center" }}  className="un" required="true" align="right" value={user_type} onChange={(e) => setuser_Type(e.target.value)}>
  <option value="">Select Account Type</option>
  <option value="admin">Admin</option>
  <option value="student">Student</option>
</select>


<br/>
<br/>
<select className="un" required="true" align="center" value={gender} onChange={(e) => setGender(e.target.value)}>
  <option value="">Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>
</Row>

    <input className="pass" type="password" align="center" required="true" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <input className="pass" type="password" align="center" required="true" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
    <button className="submit" align="center" type='submit'>Sign up</button>
    <div className='googleContainer'>
      <div id="signInDiv" className='gsignIn'></div>
    </div>
  </form>
</div>


  <div className="login">
  <form className="form1"
onSubmit={LoginHandler}

>            <label htmlFor="chk" aria-hidden="true">
        Login
      </label>
      <input className="un" type="email" required="true" align="center" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
  <input className="pass" type="password" required="true" align="center" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
<button className="submit" align="center" type='submit'>Login</button>
<Link to='/forgot-password'><button className="submit" align="center"> Forgot Password</button></Link>

    </form>
    <div className='googleContainer'>
          <div id="signInDiv" className='gsignIn'></div>
      </div>
  </div>
</div>

) }


    </>
  );
}

export default LoginScreen;
