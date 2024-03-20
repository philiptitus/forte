import { useEffect, useState } from "react";
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Loader from '../components/Loader2'
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FlagIcon from '@mui/icons-material/Flag';
import BuildIcon from '@mui/icons-material/Build';
import CheckIcon from '@mui/icons-material/Check';
import { deleteNotice } from "../actions/hostelActions";
import { logout } from '../actions/userAction'
import { getUserDetails } from "../actions/userAction";


function FolderList({ type, detail , id}) {


const dispatch = useDispatch()
  
  const deleteHandler = (noticeId) => {
    dispatch(deleteNotice(noticeId));

    window.location.reload();

  };
  let iconComponent;

  // Conditional check for the icon based on the notification type
  if (type === 'maintenance') {
    iconComponent = <BuildIcon />;
  } else if (type === 'complaints') {
    iconComponent = <FlagIcon />;
  } else if (type === 'payment') {
    iconComponent = <AttachMoneyIcon />;
  } else if (type === 'accomodation') {
    iconComponent = <AirlineSeatIndividualSuiteIcon />;
  } else if (type === 'account') {
    iconComponent = <AccountCircleIcon />;
  } else {
    iconComponent = null; // Provide a default icon or leave it blank if needed
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            {iconComponent} {/* Render the appropriate icon */}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={type} secondary={detail} />
        <ListItemAvatar onClick={() => deleteHandler(id)}>
          <Avatar style={{ backgroundColor: 'green' }} >
            <CheckIcon   style={{ color: 'white' }}  />
          </Avatar>
        </ListItemAvatar>
      </ListItem>
    </List>
  );
}

function Test() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const noticeDelete = useSelector((state) => state.noticeDelete);
    const { success, error } = noticeDelete;



    const navigate = useNavigate();

    const dispatch = useDispatch();






    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const [hasExpired, setHasExpired] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    
    const expirationTime = userInfo?.expiration_time

    const userDetails = useSelector((state) => state.userDetails);
    const {  user } = userDetails;



useEffect(() => {
  if (!userInfo) {
    navigate("/login")
  }
    }, [navigate,userInfo]);

    
    const logoutHandler = () => {
      dispatch(logout())
      navigate('/login')
      window.location.reload();
      
    };
    
      
    useEffect(() => {
      // Parse the expiration time string into components
      if (userInfo) {
        
      const [, year, month, day, hour, minute, second] = expirationTime.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
    
      // Create a Date object with the parsed components
      const expirationDateTime = new Date(year, month - 1, day, hour, minute, second);
    
      // Update the state with the expiration time
      setCurrentTime(new Date());
      setHasExpired(expirationDateTime < new Date());
    
      // Set up a timer to update the current time every second
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
      // Clean up the interval on component unmount
      return () => clearInterval(timer);
    }
    
    }, [expirationTime]); // Run effect whenever expirationTime changes
    
    
    
    useEffect(() => {
      if (hasExpired) {
        logoutHandler()
      }
        }, [navigate, hasExpired]);
      
      

    useEffect(() => {
        const fetchData = async () => {
          try {
            const config = {
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
              },
            };
            setLoading(true);
            const response = await axios.get(`/api/students/notifications/?name=${searchText}&page=${page}`, config);
            setNotifications((prevPosts) => [...prevPosts, ...response.data.results]);
            setTotalPages(response.data.total_pages);
          } catch (error) {
            console.error('Error fetching posts:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [page, searchText, success]);
    
      const handleLoadMore = () => {
        // Increment the page to fetch the next set of posts
        setPage((prevPage) => prevPage + 1);
      };
    

    return (
        <div className="container">
<br/>
<br/>
<br/>
<h5>Notifications</h5>

            <div>
        <Row>
          {notifications.length < 1  && (
          <h6 variant='success'>Nothing Here</h6>
          )}
          {notifications.map((notification) => (
          <ul key={notification.id} sm={12} md={6} lg={4} xl={3}>

          <FolderList
          type={notification.notification_type}
          detail={notification.message}
          id={notification.id}
          
          />
          </ul>

          ))}
          
        </Row>
        {notifications.length > 9 &&

<Row className='justify-content-center'>
<IconButton
  style={{ 
    backgroundColor:"black",
    color: 'green',
    maxWidth:"40px"
  
  }}
    
  onClick={handleLoadMore}
  disabled={loading || page >= totalPages}
>
  <KeyboardArrowDownIcon />
</IconButton>
</Row>

}
{loading && <Loader/>}
            </div>
        </div>
    );
}

export default Test;
