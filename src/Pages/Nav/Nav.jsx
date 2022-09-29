import React, {useEffect, useState} from "react";
import logo from '../../Assets/logo1.png';
import {NavLink, useNavigate} from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import CallIcon from '@mui/icons-material/Call';
import "./Nav.scss"
import UserHeader from "../User/UserHeader/UserHeader";
import {useDispatch, useSelector} from "react-redux";
import {filterProducts, pageLenguage} from "../Main/ProductsFilterSlice";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {userOrderGet} from "../Cart/CartSlice";
import {WithOutRegisterUserOrderGet} from "../Cart/WithOutRegisterUserSlice";
import CircularProgress from "@mui/material/CircularProgress";

function Nav({showSignUp = true, showLogin = true}) {
    const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'))
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const {t, i18n} = useTranslation();

    const token = localStorage.getItem('TOKEN')
    const hash = localStorage.getItem('HASH')

    const productData = useSelector(((state) => state.CartReducer.productData))
    const data = useSelector(((state) => state.filterProducts))
    const message = useSelector(((state) => state.CartReducer.message))
    const withOutRegisterMessage = useSelector(((state) => state.withOutRegisterCart.message))
    const withOutRegisterProductData = useSelector(((state) => state.withOutRegisterCart.productData))

    const handleClick = () => {
        navigate('/login')
    }
    const handleClick_SignUp = () => {
        navigate('/registration')
    }

    const handleChange = (event) => {
        setLanguage(event)
    }

    useEffect(() => {
        const value = {
            type: data.productType,
            language: language
        }
        dispatch(pageLenguage(language))
        i18n.changeLanguage(language);
        dispatch(filterProducts(value))
    }, [language])

    useEffect(() => {
        if (token) {
            dispatch(userOrderGet(token))
        } else {
            dispatch(WithOutRegisterUserOrderGet(hash))
        }
    }, [message, withOutRegisterMessage])

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [language])

    return (
        <div className="navbar">
            <div className="container">
                <ul className="nav">
                    <div className="logo_phone">
                        <div className="logo">
                            <NavLink to="/">
                                <img src={logo} alt='img'/>
                            </NavLink>
                        </div>
                        <div className="phoneNumber">
                            <a href="tel:+1-555-555-1212"> +374 77 11 77 11</a>
                            <CallIcon className="call_icon" sx={{color: '#ccc'}}/>
                        </div>
                    </div>

                    <div className="header_icons">
                        {token ?
                            <UserHeader setLoading={setLoading}/>
                            :
                            <div className="login_component">

                                {showLogin && <button
                                    onClick={handleClick}
                                    className="login_icon"><LoginIcon sx={{color: '#ccc'}}/></button>}
                                {showLogin && <button
                                    onClick={handleClick}
                                    className="login_btn">{t("login")}</button>}
                                {showSignUp && <button
                                    onClick={handleClick_SignUp}
                                    className="signup_btn">{t("singup")}</button>}
                            </div>
                        }
                        <div className="language">
                            <select defaultValue={language} onChange={(e) => handleChange(e.target.value)}>
                                <option value='arm'>ՀԱՅ</option>
                                <option value='ru'>PY</option>
                                <option value='eng'>ENG</option>
                            </select>
                        </div>
                        <div className="cart">
                            <NavLink to='/card-page'>
                                <ShoppingCartIcon sx={{color: '#ccc'}}/>
                                {token ?
                                    <span
                                        className={productData && productData.length > 0 ? 'span' : 'none'}>
                                        {productData && productData.length > 0 && productData.length}
                                    </span>
                                    :
                                    <span
                                        className={withOutRegisterProductData && withOutRegisterProductData.length > 0 ? 'span' : 'none'}>
                                        {withOutRegisterProductData && withOutRegisterProductData.length > 0 && withOutRegisterProductData.length}
                                    </span>
                                }
                            </NavLink>
                        </div>
                    </div>
                </ul>
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

export default Nav;
