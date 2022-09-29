import React, {useEffect, useState} from 'react';
import "./Login.scss"
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {clearLoginData, userLoginAsync, clearErrorMessage} from './UserLoginSlice';
import {useTranslation} from "react-i18next";
import Nav from '../Nav/Nav';
import Snackbar from "@mui/material/Snackbar";
import {Alert} from '@mui/material';

function Login() {
    const [userLogin, setuserLogin] = useState({});
    const [loginError, setLoginError] = useState(false);
    const [open, setOpen] = useState(false)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {t} = useTranslation();

    const userLoginData = useSelector(((state) => state.userLogin))

    const adminLoginInput = (e) => {
        setuserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        navigate('/forgot-pass')
    }

    const login = () => {
        if (!userLogin.email || !userLogin.password) {
            setLoginError(true)
            return
        }
        dispatch(userLoginAsync(userLogin))
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            login();
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLoginError(false);
    };

    const handleCloseInfoSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    useEffect(() => {
        if (userLoginData.data.message === "Success") {
            window.localStorage.setItem('TOKEN', userLoginData.data.data.token)
            setTimeout(() => {
                navigate('/')
                dispatch(clearLoginData())
            }, 1000)
        }
        if (userLoginData.data.message === "Please check your email!!!") {
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 2000)
        }
        if (userLoginData.errorMessage) {
            setLoginError(true)
            dispatch(clearErrorMessage())
            setTimeout(() => {
                setLoginError(false)
            }, [1000])
        }
    }, [userLoginData.data, userLoginData.errorMessage])

    useEffect(() => {
        if (localStorage.getItem('TOKEN')) {
            navigate("/user-change-password");
        }
    }, [])

    return (
        <>
            <Nav showLogin={false}/>
            <div className="login">
                <div className='login_box'>
                    <div className="box">
                        <h2>{t("login")}</h2>
                        <form action="client/src/Pages/User/Login">
                            <div className="inputBox">
                                <input
                                    placeholder={t("Username")}
                                    name='email'
                                    type="email"
                                    onKeyDown={handleKeyDown}
                                    onChange={adminLoginInput}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    placeholder={t("Password")}
                                    type="password"
                                    name='password'
                                    onKeyDown={handleKeyDown}
                                    onChange={adminLoginInput}
                                />
                            </div>
                            <button
                                className='button'
                                type="button"
                                value="Log In"
                                onClick={() => login()}
                            >{t("login")}</button>
                            <div className="forgotpass">
                        <span
                            onClick={handleClick}
                        >{t("Forgotpassword")}</span>
                            </div>
                        </form>
                    </div>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                        open={loginError}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}>
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity="error" sx={{width: '100%'}}>
                            {t("loginError")}
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleCloseInfoSnackbar}>
                        <Alert
                            onClose={handleCloseInfoSnackbar}
                            severity="info" sx={{width: '100%'}}>
                            {t("loginEmailActive")}
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </>
    )
}

export default Login;
