import React, {useEffect} from 'react'
import AdminHeader from './AdminHeader/AdminHeader';
import Products from './Products/Products';
import "./Admin.scss"
import {useNavigate} from "react-router-dom";

function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('ADMIN_TOKEN')) {
            navigate("/admin-login");
        }
    }, [])

    return (
        <div className='admin_page'>
            <AdminHeader/>
            <Products/>
        </div>
    )
}

export default Admin
