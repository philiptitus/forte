import { Container } from 'react-bootstrap';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import { Navigate } from 'react-router-dom'; // Import the Navigate component
import Home from './screens/Home';
import Login from './screens/Login';
import SearchScreen from './screens/Search';
import { SnackbarProvider } from 'notistack';
import Profile from './screens/Profile';
import ProfileOthers from './screens/ProfileOthers';
import Hostels from './screens/Hostels';
import Empty from './screens/404';
import MaintenanceDetail from './screens/Maintenance';
import NewAccomodation from './screens/NewAccomodation';
import PasswordResetRequest from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import Test from './screens/Test';
import Payments from './screens/Payments';
import Footer from './components/Footer';
import Hostel from './screens/Hostel';
import {Row} from 'react-bootstrap';
import OTPScreen from './screens/OTPScreen';
import CreateHostel from './screens/CreateHostel';
import CreateRoom from './screens/CreateRoom';
import RoomScreen from './screens/Room';
import ComplaintDetail from './screens/Complaint';
import OldAccommodation from './screens/OldAccomodation';
import RegisterStaff from './screens/RegisterStaff';
import HostelDelete from './screens/hostelDelete';
import AccommodationForm from './components/AccomodationForm';
import SignIn from './screens/Sin';
import LandingPage from './screens/LandingPage';
import NavBar from './components/NavBar';
import Reg from './screens/Reg';
function App() {
  return (
    <Router>
      <SnackbarProvider maxSnack={1}>
        {/* <Sidebar /> */}
        <NavBar/>

        <main className='py-4'>
          <Container
          style={{
            marginLeft:"40px"
          }}
          >
          {/* <Row  style={{ textAlign:"center" }} className='justify-content-center'>
          <h6 style={{ color:"green",fontFamily: "'Playfair Display', serif", marginLeft:"32px" , marginTop:"50px"}}>FORTE - Hostel Management Systems</h6>
</Row> */}
            <Routes> 
              <Route path='/' element={< Home/>} />
              <Route path='/login' element={<SignIn />} />
              <Route path='/sin' element={<SignIn />} />
              <Route path='/reg' element={<Reg />} />

              <Route path='/forte' element={<LandingPage />} />


              <Route path='/register' element={<RegisterStaff />} />

              <Route path='/search' element={<SearchScreen />} />
              <Route path='/payments' element={<Payments />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/user/:id' element={<ProfileOthers />} />
              <Route path='/Hostels' element={<Hostels />} />
              <Route path='/notifications' element={<Test />} />
              <Route path='/new' element={<NewAccomodation />} />
              <Route path='/hostelaccomodation/:id' element={<AccommodationForm />} />

              <Route path='/newhostel' element={<CreateHostel />} />
              <Route path='/newroom' element={<CreateRoom />} />
              <Route path='/room/:id' element={<RoomScreen />} />
              <Route path='/maintenance/:id' element={<MaintenanceDetail />} />
              <Route path='/complaint/:id' element={<ComplaintDetail />} />
              <Route path='/accom/:id' element={<OldAccommodation />} />
              <Route path='/delete' element={<HostelDelete />} />



              <Route path='/hostel/:id' element={<Hostel />} />
              <Route path='/forgot-password' element={<PasswordResetRequest />} />
              <Route path='/password-reset-confirm/:uid/:token' element={<ResetPassword/>}/>
              <Route path='/404' element={<Empty />} /> {/* Custom 404 route */}
              <Route path='*' element={<Navigate to="/404" />} /> {/* Catch-all route for 404 */}
              <Route path='/verify' element={<OTPScreen />} />

            </Routes>
          </Container>

        </main>
      </SnackbarProvider>
    </Router>
    
  );

}

export default App;
