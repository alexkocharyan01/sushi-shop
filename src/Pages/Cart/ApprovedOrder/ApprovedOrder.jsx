import React, {useEffect, useState} from "react";
import './ApprovedOrder.scss'
import Nav from "../../Nav/Nav";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";

function ApprovedOrder() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const {t} = useTranslation();

    const handleClick = () => {
        navigate('/')
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    return (
        <div className='approved_order'>
            <Nav/>
            <div className="order">
                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 60 60" viewBox="0 0 60 60"
                     width="200">
                    <path
                        d="M30,6C16.7666016,6,6,16.7666016,6,30s10.7666016,24,24,24s24-10.7666016,24-24S43.2333984,6,30,6z M30,52  C17.8691406,52,8,42.1308594,8,30S17.8691406,8,30,8s22,9.8691406,22,22S42.1308594,52,30,52z"/>
                    <polygon
                        points="25.608 36.577 19.116 30.086 17.702 31.5 25.608 39.405 42.298 22.715 40.884 21.301"/>
                </svg>
                <h2>{t("OrderDone")}</h2>
                <h2>{t("OrderDone2")}</h2>
                <button onClick={handleClick}>{t("GoBack")}</button>
            </div>
            {
                loading &&
                <div className="spinner_block">
                    <CircularProgress style={{width: 100, height: 100, color: '#E50019'}}/>
                </div>
            }
        </div>
    )
}

export default ApprovedOrder
