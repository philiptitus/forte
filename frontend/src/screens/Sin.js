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


function SignIn () {

  
  const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const redirecter = location.search ? Number(location.search.split('=')[1]) : '/';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { error:errorLogin, loading:loadingLogin, userInfo:userInfoLogin, sucess:successLogin } = userLogin;
  const [errorer, setError] = useState('');
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo, success } = userRegister;
  const redirect =  '/login';


  const forgotPassword = useSelector((state) => state.forgotPassword);
  const {  success:successReset } = forgotPassword;


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

    const customStyles = {
      bodyBefore: {
        content: ' ',
        boxShadow: '0px 0px 100px black inset',
        width: '100%',
        height: '100%',
        display: 'block',
        top: 0,
        left: 0,
        position: 'fixed',
        backgroundColor: 'bisque',
      },
      login: {
        background: 'rgb(255,255,255)',
        background: '-moz-linear-gradient(top,  rgba(255,255,255,1) 0%, rgba(244,244,244,1) 100%)',
        background: '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(100%,rgba(244,244,244,1)))',
        background: '-webkit-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(244,244,244,1) 100%)',
        background: '-o-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(244,244,244,1) 100%)',
        background: '-ms-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(244,244,244,1) 100%)',
        background: 'linear-gradient(to bottom,  rgba(255,255,255,1) 0%,rgba(244,244,244,1) 100%)',
        filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#ffffff", endColorstr="#f4f4f4",GradientType=0 )',
        width: '300px',
        height: '270px',
        position: 'fixed',

        color: '#333',
        boxShadow: '0px 6px 8px rgba(0,0,0,0.5)',
      },
      loginBeforeAfter: {
        content: ' ',
        display: 'block',
        background: 'rgba(0,0,0,0.1)',
        position: 'absolute',
        width: '100px',
        height: '30px',
      },
      loginBefore: {
        marginTop: '-12px',
        marginLeft: '-45px',
        transform: 'rotate(-25deg)',
      },
      loginAfter: {
        marginTop: '-230px',
        marginLeft: '240px',
        transform: 'rotate(32deg)',
      },
      loginForm: {
        width: '70%',
        margin: '30px auto',
        textAlign: 'center',
      },
      loginFormH1: {
        fontFamily: "'Open Sans Condensed', sans-serif",
        fontSize: '18px',
        textTransform: 'uppercase',
        marginBottom: '20px',
      },
      loginFormInput: {
        width: '100%',
        height: '25px',
        borderRadius: '5px',
        border: '1px solid #e1e1e1',
        marginBottom: '10px',
        textIndent: '10px',
        outline: 'none',
        transition: 'box-shadow 1s',
      },
      loginFormButton: {
        width: '100%',
        height: '30px',
        marginTop: '10px',
        borderRadius: '5px',
        background: 'linear-gradient(to bottom, rgba(224,243,250,1) 0%, rgba(216,240,252,1) 50%, rgba(184,226,246,1) 51%, rgba(182,223,253,1) 100%)',
        border: '1px solid #b6dffd',
        color: 'black',
        textTransform: 'uppercase',
        boxShadow: '0px 1px 1px 0px rgba(0,0,0,0.7)',
        textShadow: '0px 1px 1px white',
        fontSize: '12px',
      },
      loginFormButtonHover: {
        textShadow: '0px 0px 1px gray',
      },
      loginFormButtonActive: {
        background: 'linear-gradient(to bottom, rgba(162,215,252,1) 0%, rgba(164,219,244,1) 49%, rgba(194,231,250,1) 50%, rgba(203,235,247,1) 100%)',
        marginTop: '10px',
        boxShadow: '0px 1px 1px 0px rgba(0,0,0,0.7) inset',
      },
    };

    return (
<div>

{loading || loadingLogin ? 
  (
    <Row className='justify-content-center align-items-center'>

    <Loader/>
    </Row> 
  ):(
    
    <div>

<Snackbar 
          
          open={success}
          message={<span style={{ color: 'green' }}>"You Can Now Log In"</span>}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />

<Snackbar 
          
          open={errorLogin}
          message={<span style={{ color: '#ff0000' }}>{errorLogin}</span>}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />

  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
  <div style={customStyles.bodyBefore}></div>
  <div id="login" style={customStyles.login}>
    <form style={customStyles.loginForm} onSubmit={LoginHandler}>
      <h1 style={customStyles.loginFormH1}>Sign In</h1>
      <input type="email" required="true"  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  style={customStyles.loginFormInput} />
      <input type="password" required="true" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)} style={customStyles.loginFormInput} />
      <button style={customStyles.loginFormButton} type='submit'>Sign in</button>
      <Link to='/forgot-password'>
        <button className="submit" align="center" style={customStyles.loginFormButton}>
           Forgot Password</button></Link>
           <Link to='/reg'>
        <button className="submit" align="center" style={customStyles.loginFormButton}>
           Create Account</button></Link>

    </form>
  </div>
</div>
</div>



  )
}
</div>
    );
  }

export default SignIn;
