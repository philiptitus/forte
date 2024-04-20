import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { 
    reviewsListReducer, 
    complaintDetailsReducer, 
    complaintUpdateReducer,
    reviewDeleteReducer,
    paymentsListReducer,
    accomodationCreateReducer, 
    maintenanceCreateReducer, 
    complaintCreateReducer,
    notificationsListReducer, 
    reviewCreateReducer,
    accomodationDetailsReducer,
    accomodationUpdateReducer,
    complaintsListReducer,
    maintenanceListReducer,
    maintenanceDetailsReducer
    



} from './reducers/studentReducers'
import { 
notificationListReducer, 
roomListReducer,
hostelCreateReducer, 
roomDeleteReducer,
roomCreateReducer,
roomDetailsReducer,
hostelDeleteReducer,
hostelDetailsReducer,
hostelListReducer,
roomEditReducer,
hostelEditReducer,
noticeDeleteReducer,
maintenanceUpdateReducer
} from './reducers/hostelReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    userLoginReducer,
     userRegisterReducer,
      userDetailsReducer, 
      userUpdateProfileReducer,
       userListReducer,
        userUpdateReducer, 
        accountDeleteReducer,
        resetPasswordReducer,
        forgotPasswordReducer,
        staffRemoveReducer,
        getOtpReducer,
        verifyOtpReducer
    } from './reducers/userReducers'


const reducer = combineReducers(
    {
        reviewsList: reviewsListReducer,
        complaintDetail: complaintDetailsReducer,
        accomodationDetail:accomodationDetailsReducer,
        paymentList:paymentsListReducer,
        reviewDelete: reviewDeleteReducer,
        accomodationCreate: accomodationCreateReducer,
        complaintUpdate: complaintUpdateReducer,
        maintenanceCreate: maintenanceCreateReducer,
        complaintCreate: complaintCreateReducer,
        reviewCreate:reviewCreateReducer,
        notificationList:notificationsListReducer,
        accomodationUpdate:accomodationUpdateReducer,
        complaintsList:complaintsListReducer,
        maintenanceList:maintenanceListReducer,
        maintenanceDetail:maintenanceDetailsReducer,
        maintenanceUpdate:maintenanceUpdateReducer,


        
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userList: userListReducer,
        userUpdateProfile:userUpdateProfileReducer,
        userUpdate: userUpdateReducer,
        accountDelete:accountDeleteReducer,
        forgotPassword:forgotPasswordReducer,
        resetPassword:resetPasswordReducer,
        getOtp:getOtpReducer,
        verifyOtp:verifyOtpReducer,
        staffRemove:staffRemoveReducer,

        notificationList:notificationListReducer,
        roomList:roomListReducer,
        hostelList:hostelListReducer,
        hostelDetail:hostelDetailsReducer,
        roomDetail:roomDetailsReducer,
        hostelCreate:hostelCreateReducer,
        noticeDelete:noticeDeleteReducer,
        roomDelete:roomDeleteReducer,
        hostelDelete:hostelDeleteReducer,
        roomCreate:roomCreateReducer,
        roomEdit:roomEditReducer,
        hostelEdit:hostelEditReducer,





    }
)






const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


    
// const data = [
//     { icon: <People />, label: 'Authentication' },
//     { icon: <Dns />, label: 'Database' },
//     { icon: <PermMedia />, label: 'Storage' },
//     { icon: <Public />, label: 'Hosting' },
//   ];


const initialstate = {

    userLogin: { userInfo: userInfoFromStorage }

}

const middleware = [thunk]
const store = createStore(reducer, initialstate, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store