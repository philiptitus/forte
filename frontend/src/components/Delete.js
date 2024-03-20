import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../actions/userAction';
import { logout } from '../actions/userAction';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import {  Snackbar } from '@mui/material';


// Styled components for custom styling
const Container = styled(Grid)({
  textAlign: 'center',
  padding: '50px',
});

const AnimatedContainer = styled(Container)({
  animation: 'bounceInDown 0.8s ease',
});

const AnimatedButton = styled(Button)({
  animation: 'pulse 1.5s infinite',
});

function Delete() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accountDelete = useSelector((state) => state.accountDelete);
  const { success: successDelete, error } = accountDelete;

  useEffect(() => {
    // Redirect to another page after successful account deletion
    if (successDelete) {
      dispatch(logout());
      navigate('/login');
      window.location.reload();
    }
  }, [dispatch, successDelete]);

  const deleteHandler = () => {
    dispatch(deleteAccount());
  };

  return (
    <AnimatedContainer container justifyContent="center" alignItems="center">
                  <Snackbar 
        open={error}
        message={error}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <Grid item xs={12} sx={{ marginBottom: '20px' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          We're sad to see you go...
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: '30px' }}>
        <Typography variant="body1" color="textSecondary">
          Are you sure you want to delete your account?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AnimatedButton
          variant="contained"
          color="error"
          onClick={deleteHandler}
          startIcon={<CheckIcon />}
          sx={{ animationDelay: '0.5s' }}
        >
          Yes, Delete My Account
        </AnimatedButton>
      </Grid>
    </AnimatedContainer>
  );
}

export default Delete;
