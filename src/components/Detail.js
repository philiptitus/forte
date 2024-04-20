import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Row, Col } from 'react-bootstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Popup from '../components/PopUp';
import EditAccomodationForm from './EditAccomodationForm';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';




const FireNav = styled(List)`
  .MuiListItemButton-root {
    padding-left: 24px;
    padding-right: 24px;
  }
  .MuiListItemIcon-root {
    min-width: 0;
    margin-right: 16px;
  }
  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;

  
  


    
  
  
export default function Detail({accomodationId, acc,d1, d2, d3, d4, d5, d6 , d7, d8, d9, icon1, icon2, icon3, icon4, icon5, icon6, icon7, link1, isScreen, showRed=false}) {
  const [open, setOpen] = React.useState(true);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };


  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `/api/students/pay/${accomodationId}/`,
        {}, // No data needed in this case, customize if needed
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
  
      // Handle successful response from the API
      console.log(response.data);
    } catch (error) {
      // Handle errors appropriately, e.g., display an error message
      console.error(error);
    }
  };
  

  return (

    <div className='container text-center' style={{

        alignItems:"center", 
        alignContent:"center"
    }}>
    <Row className='justify-content-center'>
    <Box >
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'grey' },
          },
        })}
      >
<Link to={link1}>
        <Paper elevation={0} sx={{ minWidth: 256 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a">

{ showRed &&  <ListItemIcon sx={{ fontSize: 20 }}>🔥 New!</ListItemIcon>
              }
              <ListItemText
                sx={{ my: 0 }}
                primary={d1}
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 126 }}>
                <ListItemIcon>
                  <AccountCircleIcon color="success" />
                </ListItemIcon>
                <Row>
                    <Col>
                    <ListItemText
                  primary={d9}
                  primaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}
                />
                    </Col>
                    <Col>
                    <ListItemText
                  primary={d2}
                  primaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}
                />
                    </Col>
                </Row>

              </ListItemButton>

              {!isScreen && 

<Link to={link1}>
<Tooltip title="View">
  <IconButton
    size="large"
    sx={{
      '& svg': {
        color: 'rgba(255,255,255,0.8)',
        transition: '0.2s',
        transform: 'translateX(0) rotate(0)',
      },
      '&:hover, &:focus': {
        bgcolor: 'unset',
        '& svg:first-of-type': {
          transform: 'translateX(-4px) rotate(-20deg)',
        },
        '& svg:last-of-type': {
          right: 0,
          opacity: 1,
        },
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        height: '80%',
        display: 'block',
        left: 0,
        width: '1px',
        bgcolor: 'divider',
      },
    }}
  >

    <VisibilityIcon />


    <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
    </IconButton>
</Tooltip>
</Link>
              
              }


            </ListItem>
            <Divider />
            <Box
sx={{
  bgcolor: open && showRed ? 'red' : 'green',
  pb: open ? 2 : 0,
}}

>

              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                }}
              >
                <ListItemText
                  primary="INFORMATION"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px',
                  }}
                  secondary={d3}
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: '16px',
                    color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                  }}
                />
              </ListItemButton>

                  <ListItemButton
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                  >



                  </ListItemButton>

                  <ListItemButton
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {icon2}
                    </ListItemIcon>

                    <ListItemText
                      primary={d4}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                  </ListItemButton>

{d5 &&

<ListItemButton
sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
>
<ListItemIcon sx={{ color: 'inherit' }}>
  {icon3}
</ListItemIcon>
<ListItemText
  primary={d5}
  primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
/>
</ListItemButton>


}

{d6 && 

<ListItemButton
sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
>
<ListItemIcon sx={{ color: 'inherit' }}>
  {icon4}
</ListItemIcon>
<ListItemText
  primary={d6}
  primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
/>
</ListItemButton>


}



    {d7 && 

    
<ListItemButton
sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
>
<ListItemIcon sx={{ color: 'inherit' }}>
  {icon5}
</ListItemIcon>
<ListItemText
  primary={d7}
  primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
/>
</ListItemButton>



    
    }

{d8 && 

<ListItemButton
sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
>
<ListItemIcon sx={{ color: 'inherit' }}>
  {icon6}
</ListItemIcon>
<ListItemText
  primary={d8}
  primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
/>

</ListItemButton>

}
{isScreen && (
  <div>
      <button type='button' style={{ backgroundColor: "red" }} className='btn' onClick={handleCheckout}>
        Checkout
      </button>
      <form action={`http://127.0.0.1:8000/api/students/pay/${accomodationId}/`} method='POST'>
          <button type='submit'  style={{backgroundColor:"red" }} className='btn'>
                          PAY
                      </button>

          </form>
          <Popup
               component={<EditAccomodationForm id={accomodationId} roomNumber={acc.room} accomStatus={acc.status} />}
               icon={EditIcon}
             />

  </div>




)}


 

            </Box>
          </FireNav>
        </Paper>
        </Link>


      </ThemeProvider>
    </Box>
    </Row>
    </div>
  );
}