import React, {useEffect} from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import Order from './Order/Order';
import './Orders.scss';
import {useNavigate} from "react-router-dom";

function Orders() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('ADMIN_TOKEN')) {
            navigate("/admin-login");
        }
    }, [])

    return (
        <div className='admin_orders_page'>
            <AdminHeader/>
            <div className='orders_container'>
                <div className='admin_order'>
                    <Order/>
                </div>
            </div>
        </div>
    )
}

export default Orders
