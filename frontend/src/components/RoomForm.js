import React, { useState, useEffect } from 'react';
import { MenuItem, TextField, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { editRoom } from '../actions/hostelActions';
import { useSnackbar } from 'notistack';
import { listRoomDetails } from '../actions/hostelActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column', // Stack items vertically
    flexWrap: 'wrap', // Wrap items to next line when they exceed container width
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fixedSize: {
    width: '100%', // Adjust as needed
    height: '100%', // Adjust as needed
  },
}));

const availables = [
  { value: 'True', label: 'Room Is Available' },
  { value: 'False', label: 'Room Is not Available For Now' },
];

const RoomForm = ({ id, roomNumber, roomAvailable }) => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [room_number, setRoomNumber] = useState(roomNumber);
  const [isAvailable, setIsAvailable] = useState(roomAvailable);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const roomEdit = useSelector((state) => state.roomEdit);
  const { loading, error, success, room } = roomEdit;

  const classes = useStyles();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editRoom(
        {
          room_number,
          isAvailable,
        },
        id
      )
    );
    if (error) {
        enqueueSnackbar(error, { variant: 'error' });

        
    }
  };

//   useEffect(() => {
//     if (success) {
//       enqueueSnackbar("Room Info Updated", { variant: 'success' });
//     }
//     if (error) {
//       enqueueSnackbar(error, { variant: 'error' });
//     }
//   }, [navigate, success, error]);

  return (
    <div className={classes.fixedSize}>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Row>
          <Col>
            <TextField
              id="filled-select-currency"
              select
              label="Select"
              defaultValue="True"
              value={isAvailable}
              onChange={(e) => setIsAvailable(e.target.value)}
              helperText="Room Availability"
              variant="filled"
              fullWidth
            >
              {availables.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default RoomForm;
