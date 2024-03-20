import React, { useState, useEffect } from 'react';
import { MenuItem, TextField, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { editRoom } from '../actions/hostelActions';
import { updateAccomodation } from '../actions/studentActions';
import { useSnackbar } from 'notistack';
import { listRoomDetails } from '../actions/hostelActions';
import { updateMaintenance } from '../actions/hostelActions';

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

const statuses = [
  { value: 'In Progress', label: 'Working On It' },
  { value: 'Completed', label: 'Resolved' },

];

const EditMaintenanceForm = ({ id, roomAvailable, accomStatus }) => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [status, setstatus] = useState(accomStatus);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const maintenanceUpdate = useSelector((state) => state.maintenanceUpdate);
  const { loading, error, success, maintenance } = maintenanceUpdate;

  const classes = useStyles();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateMaintenance(
        {
          
          status,
        },
        id
      )
    );
    if (error) {
        enqueueSnackbar(error, { variant: 'error' });

        
    }
  };

  useEffect(() => {
    if (success) {
      enqueueSnackbar("Maintenance Info Updated", { variant: 'success' });
    }

    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }, [navigate, success, error]);

  return (
    <div className={classes.fixedSize}>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Row>
          <Col>

          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              id="filled-select-currency"
              select
              label="Select"
              defaultValue="True"
              value={status}
              onChange={(e) => setstatus(e.target.value)}
              helperText="Update Status"
              variant="filled"
              fullWidth
            >
              {statuses.map((option) => (
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

export default EditMaintenanceForm;
