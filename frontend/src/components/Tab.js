import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Row } from 'react-bootstrap';
import ProfileComponents from '../components/ProfileComponents';
import { Divider } from '@mui/material';

export default function LabTabs({ id, showReviews = false, showRequests = false , showPopUp =false,showMaintenance =true, showComplain = true}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: '100%', typography: 'body1'  }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Divider/>

          <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="white" centered>
            {showComplain && <Tab  style={{
              margin:"8px"
            }} label="Complains" value="1" />}
            {showMaintenance && <Tab style={{
              margin:"8px"
            }}label="Maintenances" value="2" />}
            {showReviews  && <Tab style={{
              margin:"8px"
            }} label="Reviews" value="3" />}

            {showRequests && <Tab label="Reviews" value="5" /> }
          </TabList>
        </Box>
        {showComplain &&
                <TabPanel value="1">
                <ProfileComponents showComplain={true} id={id} showPopUp={showPopUp}/>
      
              </TabPanel>
        }

        {showMaintenance &&

<TabPanel value="2">
        
<ProfileComponents showMaintenance={true} id={id} showPopUp={showPopUp}/>
</TabPanel>
        
        }

        {showReviews && (
          <TabPanel value="3">
            <Row className='justify-content-center'>
              <ProfileComponents showReviews={true} id={id} showPopUp={true}/>
            </Row>
          </TabPanel>
        )}
        <TabPanel value="4"></TabPanel>
        {showRequests && 
                <TabPanel value="5">
<h6>k</h6>
                </TabPanel>


        }
      </TabContext>
    </Box>
  );
}
