import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {orders} from '../../Cart/CartSlice';
import Nav from '../../Nav/Nav';
import UserOrderHistory from './UserOrderHistory';
import './UserPage.scss'
import {userInfo} from './UserPageSlice';
import {useNavigate} from "react-router-dom";
import Footer from "../../Footer/Footer";

function UserPage() {
    const [userData, setUserData] = useState(false)

    const orderHisory = useSelector(((state) => state.CartReducer.ordersData))

    const dispatch = useDispatch()

    const token = localStorage.getItem("TOKEN")

    const navigate = useNavigate();


    useEffect(() => {
        dispatch(userInfo(token))
    }, [userData])

    useEffect(() => {
        dispatch(orders(token))
    }, [userData])

    useEffect(() => {
        if (!localStorage.getItem('TOKEN')) {
            navigate("/login");
        }
    }, [])

    return (
        <div className='userPage'>
            <Nav/>
            <div className='order_history'>
                <UserOrderHistory orderHisory={orderHisory}/>
            </div>
            <Footer />
        </div>
    )
}

export default UserPage
