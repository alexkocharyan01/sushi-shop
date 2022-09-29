import React, {useEffect, useState} from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import SliderProducts from './SliderProducts'
import SlidersDialog from './SlidersDialog';
import "./Sliders.scss";
import {useNavigate} from "react-router-dom";

function Sliders() {
    const [open, setOpen] = useState(false);
    const [change, setChange] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('ADMIN_TOKEN')) {
            navigate("/admin-login");
        }
    }, [])

    return (
        <div className='slider_page'>
            <AdminHeader/>
            <div className='sliders_container'>
                <div className='modal_btn'>
                    <button
                        onClick={() => setOpen(true)}
                    >
                        ԱՎԵԼԱՑՆԵԼ ՆՈՐ ՍԼԱՅԴ
                    </button>
                </div>
                <SliderProducts change={change} setChange={setChange}/>
                <SlidersDialog open={open} setOpen={setOpen} change={change} setChange={setChange}/>
            </div>
        </div>
    )
}

export default Sliders
