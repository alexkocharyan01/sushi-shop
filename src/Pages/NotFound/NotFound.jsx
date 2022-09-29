import React from 'react';
import Nav from "../Nav/Nav";
import "./NotFound.scss";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const NotFound = () => {
    const navigate = useNavigate();

    const {t} = useTranslation();

    const handleClick = () => {
        navigate('/')
    }

    return (
        <div className="not_found">
            <Nav/>
            <div className="page">
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 64" width="200">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#010101" strokeMiterlimit="10"
                            strokeWidth="4"/>
                    <line x1="32" x2="32" y1="18" y2="38" fill="none" stroke="#010101" strokeMiterlimit="10"
                          strokeWidth="4"/>
                    <line x1="32" x2="32" y1="42" y2="46" fill="none" stroke="#010101" strokeMiterlimit="10"
                          strokeWidth="4"/>
                </svg>
                <h2>{t("Error")}</h2>
                <button onClick={() => handleClick()}> {t("GoBack")} </button>
            </div>
        </div>
    );
};

export default NotFound;
