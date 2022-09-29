import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import {useTranslation} from "react-i18next";
import './MailActivation.scss'

function MailActivation() {
    const [statusMessage, setStatusMessage] = useState({})

    const apiUrl = process.env.REACT_APP_API_URL;

    const {data} = useParams();

    const {t} = useTranslation();

    const navigate = useNavigate()

    useEffect(() => {
        axios.post(`${apiUrl}/auth/active`, {data}).then(res => setStatusMessage(res));
    }, [])

    const handleCLick = () => {
        navigate('/login')
    }

    const handleCLick2 = () => {
        navigate('/')
    }

    return (
        <div className='mail_activation'>
            {statusMessage.statusText && statusMessage.statusText === "Created" ?
                (
                    <div className='activation_block'>
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 60 60" viewBox="0 0 60 60"
                             width="200">
                            <path
                                d="M30,6C16.7666016,6,6,16.7666016,6,30s10.7666016,24,24,24s24-10.7666016,24-24S43.2333984,6,30,6z M30,52  C17.8691406,52,8,42.1308594,8,30S17.8691406,8,30,8s22,9.8691406,22,22S42.1308594,52,30,52z"/>
                            <polygon
                                points="25.608 36.577 19.116 30.086 17.702 31.5 25.608 39.405 42.298 22.715 40.884 21.301"/>
                        </svg>
                        <h2>{t("RegisterDone")}</h2>
                        <button
                            onClick={() => handleCLick()}
                        > {t("goToLogin")} </button>
                    </div>
                ) : (
                    <div className='activation_block'>
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 64" width="200">
                            <circle cx="32" cy="32" r="28" fill="none" stroke="#010101" strokeMiterlimit="10"
                                    strokeWidth="4"/>
                            <line x1="32" x2="32" y1="18" y2="38" fill="none" stroke="#010101" strokeMiterlimit="10"
                                  strokeWidth="4"/>
                            <line x1="32" x2="32" y1="42" y2="46" fill="none" stroke="#010101" strokeMiterlimit="10"
                                  strokeWidth="4"/>
                        </svg>
                        <h2>{t("Error")}</h2>
                        <button
                            onClick={() => handleCLick2()}
                        > {t("GoBack")} </button>
                    </div>
                )
            }
        </div>
    )
}

export default MailActivation
