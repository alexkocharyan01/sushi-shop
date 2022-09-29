import React, {useEffect, useState} from 'react';
import "./Register.scss";
import {useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {clearData, clearErrorMessage, userRegisterAsync} from './UserSlice';
import Snackbar from "@mui/material/Snackbar";
import {Alert} from '@mui/material';
import {useTranslation} from "react-i18next";
import Nav from '../../Nav/Nav';

function Registration() {
    const [registerError, setRegisterError] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);

    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm();

    const dispatch = useDispatch()

    const {t} = useTranslation()

    const data = useSelector(((state) => state.userRegister))

    const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,}$/);
    const phoneRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[0-9]{3}[-\s\.]?[0-9]{3}$/im);

    const onSubmit = (data) => {
        if (data.password === data.password && data.confirmPassword.length < 6) {
            setPasswordLength(true);
            return
        }
        if (!passwordRegex.test(data.password)) {
            setPassword(true)
            return
        }
        if (!phoneRegex.test(data.phone)) {
            setPhoneError(true)
            return
        }
        const values = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: data.password,
            confirmPassword: data.confirmPassword,
        }
        dispatch(userRegisterAsync(values))
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setRegisterSuccess(false);
    };

    const handleCloseSnackbar2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setRegisterError(false)
    };

    const handleClosePasswordSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPassword(false)
    };

    const handleClosePhoneSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPhoneError(false)
    };

    const handleClosePasswordLengthSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPasswordLength(false)
    };

    useEffect(() => {
        if (data.errorMessage) {
            if (data.errorMessage === "Password and confirm-password do not match") {
                setRegisterError(true)
                setPasswordError(true)
            } else if (data.errorMessage === "User with that email already exists") {
                setRegisterError(true)
                setEmailError(true)
            }
            setTimeout(() => {
                setEmailError(false)
                setRegisterError(false)
                setPasswordError(false)
                dispatch(clearData())
                dispatch(clearErrorMessage())
            }, 2000)
        }
    }, [data.errorMessage])

    useEffect(() => {
        if (data.data.message) {
            setRegisterSuccess(true);
            setTimeout(() => {
                setRegisterSuccess(false);
                navigate('/login')
                dispatch(clearData())
            }, 2000)
        }
    }, [data.data.message])

    useEffect(() => {
        if (localStorage.getItem('TOKEN')) {
            navigate("/user-change-password");
        }
    }, [])

    useEffect(() => {

        if (password) {
            setTimeout(() => {
                setPassword(false)
            }, 3000)
        }

        if (phoneError) {
            setTimeout(() => {
                setPhoneError(false)
            }, 3000)
        }
    }, [password, phoneError])

    useEffect(() => {
        if (passwordLength) {
            setTimeout(() => {
                setPasswordLength(false)
            }, [3000])
        }
    }, [passwordLength])

    return (
        <>
            <Nav showSignUp={false}/>
            <div className="login">
                <div className='login_box'>
                    <div className="box">
                        <h2>{t("createAccount")}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="inputBox">
                                <input
                                    className={errors.firstName ? 'error' : ''}
                                    placeholder={t("firstName")}
                                    type="text"
                                    id="firstName"
                                    {...register("firstName", {required: true})}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    className={errors.lastName ? 'error' : ''}
                                    placeholder={t("lastName")}
                                    type="text"
                                    id="lastName"
                                    {...register("lastName", {required: true})}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    className={errors.email ? 'error' : ''}
                                    placeholder={t("email")}
                                    type="email"
                                    id="email"
                                    {...register("email", {required: true})}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    className={errors.phone ? 'error' : ''}
                                    placeholder={t("phone")}
                                    type="number"
                                    id="phone"
                                    {...register("phone", {required: true})}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    className={errors.password ? 'error' : ''}
                                    placeholder={t("Password")}
                                    type="password"
                                    id="password"
                                    {...register("password", {required: true})}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    className={errors.confirmPassword ? 'error' : ''}
                                    placeholder={t("ConfirmPassword")}
                                    type="password"
                                    id="confirmPassword"
                                    {...register("confirmPassword", {required: true})}
                                />
                            </div>
                            <button type="submit">{t("createAccount")}</button>
                        </form>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={registerSuccess}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}>
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="success" sx={{width: '100%'}}>
                        {t("loginEmailActive")}
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={registerError}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar2}>
                    <Alert
                        onClose={handleCloseSnackbar2}
                        severity="error" sx={{width: '100%'}}>
                        {passwordError ? <p>{t("passwordNotMatch")}</p> : null}
                        {emailError ? <p>{t("emailError")}</p> : null}
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={password}
                    autoHideDuration={3000}
                    onClose={handleClosePasswordSnackbar}>
                    <Alert
                        onClose={handleClosePasswordSnackbar}
                        severity="error" sx={{width: '100%'}}>
                        {t("passwordInfo")}
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={phoneError}
                    autoHideDuration={3000}
                    onClose={handleClosePhoneSnackbar}>
                    <Alert
                        onClose={handleClosePhoneSnackbar}
                        severity="error" sx={{width: '100%'}}>
                        {t("phoneInfo")}
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={passwordLength}
                    autoHideDuration={3000}
                    onClose={handleClosePasswordLengthSnackbar}>
                    <Alert
                        onClose={handleClosePasswordLengthSnackbar}
                        severity="error" sx={{width: '100%'}}>
                        {t("passwordLength")}
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}

export default Registration;
