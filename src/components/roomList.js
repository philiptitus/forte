import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText, ListItemIcon, Divider, Chip, IconButton } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { green, red } from '@material-ui/core/colors';
import { useSnackbar } from 'notistack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';

import axios from 'axios';
import Loader from './Loader2';
import { deleteRoom } from '../actions/hostelActions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#f9f9f9',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
  },
  roomNumber: {
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
  capacity: {
    fontStyle: 'italic',
    marginRight: theme.spacing(1),
  },
  availabilityChip: {
    marginLeft: 'auto',
  },
}));

const RoomList = () => {
    const classes = useStyles();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const dispatch = useDispatch();

    const roomDelete = useSelector((state) => state.roomDelete);
    const { loading: loadingRoom, error: errorRoom, success:successRoom } = roomDelete;
    
  
  
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
  
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const roomCreate = useSelector((state) => state.roomCreate);
    const {   success:successRoomCreate } = roomCreate;
    
  
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
          const response = await axios.get(`/api/hostels/rooms/?name=${searchText}&page=${page}`, config);
          setRooms(response.data.results);
          setTotalPages(response.data.total_pages);
        } catch (error) {
          console.error('Error fetching Rooms:', error);
        } finally {
          setLoading(false);
        }
      }; 
  
      fetchData();
    }, [page, searchText, successRoomCreate]);
  
    const handleLoadMore = () => {
      setPage((prevPage) => prevPage + 1);
    };
  
    const handleSearch = (e) => {
      setSearchText(e.target.value);
      setPage(1); // Reset page when searching
    };

    const handleDeleteRoom = (roomId) => {
      // Implement delete room functionality
      dispatch(
        deleteRoom(roomId)



      )

      console.log('Deleting room with ID:', roomId);
    };
  
    const handleViewRoom = (roomId) => {
      // Navigate to the room detail page
      navigate(`/room/${roomId}`);
    };

    const handleButtonClick = (word) => {
      setSearchText(word);
    };
  
  

    useEffect(() => {
        if (loadingRoom) {
          enqueueSnackbar("Deleting Room..", { variant: 'success' });
        }
        if (successRoom) {
          enqueueSnackbar("Room(s) Removed", { variant: 'success' });
          window.location.reload();

        }
        if (errorRoom) {
          enqueueSnackbar(errorRoom, { variant: 'error' });
        }
        
        
      }, [navigate, loadingRoom, successRoom, errorRoom]);
    
  
    return (
      <div className={classes.root}>
                    <Snackbar 
        open={rooms.length === 0 && !loading && searchText}
        message="No results found"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
        <Typography variant="h6" gutterBottom>
          HOSTEL ROOMS
        </Typography>
        <input
            type='search'
            placeholder='Search For Rooms'
            value={searchText}
            onChange={handleSearch}
            style={{
              width: '50%',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid black',
              color: 'black', // Adjust text color as needed
              background: 'white', // Adjust background color as needed
            }}
          />

        <List>

          {loading ? (
            <Loader/>
          ): rooms.length > 0 ? (

            rooms.map((room, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    <RoomIcon />
                  </ListItemIcon> 
                  <ListItemText
                    primary={
                      <span className={classes.roomNumber}>
                        Room {room.id}
                      </span>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.capacity}
                          color="textPrimary"
                        >
                          Capacity: {room.capacity}
                        </Typography>
                        <Chip
                          label={room.isAvailable ? 'Available' : 'Not Available'}
                          className={classes.availabilityChip}
                          style={{ backgroundColor: room.isAvailable ? green[500] : red[500] }}
                          size="small"
                        />
                        <div style={{ marginLeft: 'auto' }}>
                          <IconButton onClick={() => handleViewRoom(room.id)}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteRoom(room.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))

          ):(

            <div>
            <Typography variant="h5" style={{ color: "red", fontSize:"small" }}>NOTHING FOUND</Typography>
          </div>

          )

        }

{rooms.length > 9 &&

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
        </List>
        {loading && <Loader />}
      </div>
    );
  };
  
  export default RoomList;