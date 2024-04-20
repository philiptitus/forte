import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userAction'
import { LinkContainer } from 'react-router-bootstrap';
import { createAccomodation } from '../actions/studentActions';
import { useNavigate, useLocation } from 'react-router-dom';
import { ACCOMODATION_CREATE_RESET } from '../constants/studentConstants';
import { getUserDetails } from '../actions/userAction';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

const Sidebar = () => {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const sidebarRef = useRef(null);
  const accomodationCreate = useSelector((state) => state.accomodationCreate);
  const { success, loading, error, post } = accomodationCreate;

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  

  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
    window.location.reload();
    
  };

  const submitHandler = () => {
    navigate('/new')
  };



  const handleCloseSidebar = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        const closeButton = document.querySelector('#menuToggle input');
        if (closeButton) {
          closeButton.click();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {

    dispatch(getUserDetails('profile'))
    dispatch({ type: ACCOMODATION_CREATE_RESET });


  }, [dispatch, navigate, userInfo, success, post]);


  
  return (
    <nav role="navigation">
      <style>
        {`
/*
* Made by Erik Terwan
* 24th of November 2015
* MIT License
*
*
* If you are thinking of using this in
* production code, beware of the browser
* prefixes.
*/



#menuToggle
{
  display: block;
  position: relative;
  backgroundColor:"green";

  top: 30px;
  left: 50px;
  
  z-index: 1;
  
  -webkit-user-select: none;
  user-select: none;
}

#menuToggle a
{
  text-decoration: none;
  color: green;
  
  transition: color 0.3s ease;
}

#menuToggle a:hover
{
  color: tomato;
}


#menuToggle input
{
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;
  
  cursor: pointer;
  
  opacity: 0; /* hide this */
  z-index: 2; /* and place it over the hamburger */
  
  -webkit-touch-callout: none;
}

/*
 * Just a quick hamburger
 */
#menuToggle span
{
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  
  background: green;
  border-radius: 3px;
  
  z-index: 1;
  
  transform-origin: 4px 0px;
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
}

#menuToggle span:first-child
{
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2)
{
  transform-origin: 0% 100%;
}

/* 
 * Transform all the slices of hamburger
 * into a crossmark.
 */
#menuToggle input:checked ~ span
{
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
  background: red;
}

/*
 * But let's hide the middle one.
 */
#menuToggle input:checked ~ span:nth-last-child(3)
{
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

/*
 * Ohyeah and the last one should go the other direction
 */
#menuToggle input:checked ~ span:nth-last-child(2)
{
  transform: rotate(-45deg) translate(0, -1px);
}

/*
 * Make this absolute positioned
 * at the top left of the screen
 */
#menu
{
  position: absolute;
  width: 300px;
  margin: -100px 0 0 -50px;
  padding: 50px;
  padding-top: 125px;
  
  background: #ededed;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */
  
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
}

#menu li
{
  padding: 10px 0;
  font-size: 22px;
}

/*
 * And let's slide it in from the left
 */
#menuToggle input:checked ~ ul
{
  transform: none;
}
        `}
      </style>


      <ClickAwayListener onClickAway={handleClickAway}>

      <div id="menuToggle" style={{ position:"fixed" }}>
        {userInfo &&
          <input type="checkbox" checked={open} onChange={() => setOpen(!open)} />
    
        }

        <span></span>
        <span></span>
        <span></span>
        {  userInfo &&
                  <ul id="menu" style={{ backgroundColor:"white",  }}>

{user?.user_type === "student" &&  !user?.hostel && 

  <a style={{ fontSize:"small" }}>
    <li  style={{ fontSize:"medium" }} onClick={submitHandler}><i className="fas fa-plus"></i>New Accomodation</li>
  </a>
}

                  <Link to='/profile'><a><li><i className="fas fa-user"></i>My Profile</li></a></Link>
                    <a href="#"><li><i className="fas fa-home"></i>Home</li></a>
                    <Link to='/Hostels'><a><li><i className="fas fa-hotel"></i>Hostels</li></a></Link>

                    {user?.user_type === "admin" &&  user?.hostel && 

                    <Link to='/search'><a><li><i className="fas fa-search"></i>Search</li></a></Link>

        }

{user?.user_type === "admin" &&    <Link to='/payments'><a><li><i className="fas fa-wallet"></i>Payments</li></a></Link>
}
{user?.user_type === "student" &&    <Link to='/payments'><a><li><i className="fas fa-wallet"></i>Payments</li></a></Link>
}

                    <Link to='/notifications'><a href="#"><li><i className="fas fa-heart"></i>Notifications</li></a></Link>
                    <a><li onClick={logoutHandler}><i className="fas fa-sign-out-alt"></i>Log Out</li></a>
          
                  </ul>

        
}


      </div>
      
      </ClickAwayListener>


    </nav>
  );
};

export default Sidebar;

