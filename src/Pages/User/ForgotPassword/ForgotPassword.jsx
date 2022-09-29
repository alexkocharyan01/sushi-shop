import React, {useEffect, useState} from 'react';
import './ForgotPassword.scss';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from "react-router";
import {clearData, userChangePassword} from '../UserLoginSlice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useTranslation} from "react-i18next";
import Nav from '../../Nav/Nav';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertChange = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ForgotPassword() {
    const [newPasswordinput, setNewPasswordINput] = useState({});
    const [errorMessage, setErrorMessage] = useState('')
    const [open, setOpen] = useState(false)
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [password, setPassword] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {t} = useTranslation();

    const data = useParams();

    const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,}$/);

    const newpassword = (e) => {
        setNewPasswordINput({
            ...newPasswordinput,
            [e.target.name]: e.target.value
        })
    }

    const savePassword = () => {

        if (newPasswordinput.new_pass === newPasswordinput.confirm_pass && newPasswordinput.new_pass.length < 6) {
            setPasswordLength(true);
            return
        }

        if (!passwordRegex.test(newPasswordinput.new_pass)) {
            setPassword(true)
            return
        }

        if (newPasswordinput.new_pass && newPasswordinput.confirm_pass) {
            if (newPasswordinput.new_pass === newPasswordinput.confirm_pass) {
                const values = {
                    new_pass: newPasswordinput.new_pass,
                    confirm_pass: newPasswordinput.confirm_pass,
                    data: data.token
                }
                dispatch(userChangePassword(values))
                setOpenChangePassword(true);
            } else {
                setOpen(true);
                setErrorMessage(t("passwordError"))
                setTimeout(() => {
                    setOpen(false)
                }, 2000)
            }
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenChangePassword(false);
    };

    const handleClosePasswordSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPassword(false)
    };

    const handleClosePasswordLengthSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPasswordLength(false)
    };

    useEffect(() => {
        if (openChangePassword) {
            setTimeout(() => {
                setOpenChangePassword(false);
            }, 2000)
            setTimeout(() => {
                navigate('/login')
                dispatch(clearData())
            }, 3000)
        }
    }, [openChangePassword])

    useEffect(() => {
        if (password) {
            setTimeout(() => {
                setPassword(false)
            }, 3000)
        }
    }, [password])

    useEffect(() => {
        if (passwordLength) {
            setTimeout(() => {
                passwordLength(false)
            }, [3000])
        }
    }, [passwordLength])

    return (
        <>
            <Nav/>
            <div className="login">
                <div className='login_box'>
                    <div className="box">
                        <h2>{t("ChangePassword")}</h2>
                        <form action="client/src/Pages/User/ForgotPassword/ForgotPassword">
                            <div class="inputBox">
                                <input
                                    placeholder={t("Password")}
                                    name='new_pass'
                                    type="password"
                                    onChange={newpassword}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    placeholder={t("ConfirmPassword")}
                                    type="password"
                                    name='confirm_pass'
                                    onChange={newpassword}
                                />
                            </div>
                            <button
                                className='button'
                                type="button"
                                onClick={() => savePassword()}
                            >{t("Save")}</button>
                        </form>
                    </div>
                </div>
                <div>
                    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center',}} open={open}
                              autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        autoHideDuration={6000}
                        open={openChangePassword}
                        onClose={handleClose2}>
                        <AlertChange onClose={handleClose2} severity="success" sx={{width: '100%'}}>
                            {t("changedPassword")}
                        </AlertChange>
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
            </div>
        </>
    )
}

export default ForgotPassword;
