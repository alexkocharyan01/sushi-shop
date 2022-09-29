import './App.scss';
import Home from './Pages/Home';
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './Pages/User/Login';
import AdminLogin from './Pages/Login/AdminLogin';
import ForgotPass from './Pages/Login/ForgotPass';
import RecoverPass from './Pages/Login/RecowerPass';
import Registration from './Pages/User/UserRegister/Register';
import Admin from './Pages/Admin/Admin';
import ChangePassword from './Pages/Admin/ChangePassword/ChangePassword';
import MailActivation from './Pages/User/MailActivation/MailActivation';
import Cart from './Pages/Cart/Cart';
import ForgotPassword from './Pages/User/ForgotPassword/ForgotPassword';
import UserChangePassword from './Pages/User/UserChangePassword/UserChangePassword';
import Sliders from './Pages/Admin/Sliders/Sliders';
import Orders from './Pages/Admin/Orders/Orders';
import UserPage from './Pages/User/UserPage/UserPage';
import CircularProgress from '@mui/material/CircularProgress';
import ApprovedOrder from "./Pages/Cart/ApprovedOrder/ApprovedOrder";
import OrderHistory from './Pages/Admin/Orders/OrderHistory/OrderHistory';
import NotFound from "./Pages/NotFound/NotFound";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    // console.log = console.warn = () => {};

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="admin-login" element={<AdminLogin/>}/>
                    <Route path="forgot-pass" element={<ForgotPass/>}/>
                    <Route path="forgot-password/:token" element={<ForgotPassword/>}/>
                    <Route path="registration" element={<Registration/>}/>
                    <Route path="recover-password" element={<RecoverPass/>}/>
                    <Route path="change-password" element={< ChangePassword/>}/>
                    <Route path='admin-page' element={<Admin/>}/>
                    <Route path='slider' element={<Sliders/>}/>
                    <Route path='admin-order-history' element={<OrderHistory/>}/>
                    <Route path='activation-account/:data' element={<MailActivation/>}/>
                    <Route path='card-page' element={<Cart/>}/>
                    <Route path='approved-order' element={<ApprovedOrder/>}/>
                    <Route path='user-change-password' element={<UserChangePassword/>}/>
                    <Route path='orders' element={<Orders/>}/>
                    <Route path='user-page' element={<UserPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
            {
                loading &&
                <div className="spinner_block">
                    <CircularProgress style={{width: 100, height: 100, color: '#E50019'}}/>
                </div>
            }
        </div>
    );
}

export default App;
