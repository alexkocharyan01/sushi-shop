import React, {useEffect, useState} from 'react';
import "./Login.scss"
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AdminForgotPassAsync, AdminLoginAsync, clearData} from './AdminLoginSlice';
import {useParams} from "react-router";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminLogin = () => {
    const [adminLogin, setAdminLogin] = useState({});
    const [open, setOpen] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [emailSendError, setEmailSendError] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const adminLoginData = useSelector((state) => state.adminLogin);

    const handleClick = () => {
        if (adminLoginData.PassworderrorMessage) {
            return
        }
        dispatch(AdminForgotPassAsync())
    }

    const errorHandleClick = () => {
        setLoginError(false);
    }

    const adminLoginInput = (e) => {
        setAdminLogin({
            ...adminLogin,
            [e.target.name]: e.target.value
        })
    }

    const login = () => {
        if (!adminLogin.email || !adminLogin.password) {
            setLoginError(true)
            return
        }
        dispatch(AdminLoginAsync(adminLogin))
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
        setOpen(false);
    };

    const emailSendErrorClcik = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setEmailSendError(false);
    };

    useEffect(() => {
        if (adminLoginData.data.message === "Success") {
            window.localStorage.setItem('ADMIN_TOKEN', adminLoginData.data.data.token)
            navigate('/admin-page')
            dispatch(clearData())
        }
    })

    useEffect(() => {
        if (adminLoginData.errorMessage !== '') {
            setLoginError(true)
        }
    }, [adminLoginData.errorMessage])

    useEffect(() => {
        setTimeout(() => {
            setLoginError(false)
        }, 3000)
    }, [loginError])

    useEffect(() => {
        if (localStorage.getItem('ADMIN_TOKEN')) {
            navigate("/admin-page");
        }
    }, [])

    useEffect(() => {
        if(adminLoginData.PassworderrorMessage){
            setEmailSendError(true)
        } else if(adminLoginData.passwordData.message) {
            setOpen(true)
        }
    }, [adminLoginData])

    return (
        <div className="login">
            <div className='login_box'>

                <div className="box">
                    <h2>??????????</h2>
                    <form action="client/src/Pages/Login/AdminLogin">
                        <div className="inputBox">
                            <input
                                className={!adminLogin.email && loginError ? 'error' : ''}
                                placeholder='????. ????????????'
                                type="text"
                                name="email"
                                onKeyDown={handleKeyDown}
                                onChange={adminLoginInput}
                            />
                        </div>
                        <div className="inputBox">
                            <input
                                className={!adminLogin.password && loginError ? 'error' : ''}
                                placeholder="????????????????????"
                                type="password"
                                name="password"
                                onKeyDown={handleKeyDown}
                                onChange={adminLoginInput}
                            />
                        </div>
                        <button
                            className='button'
                            type="button"
                            value="??????????"
                            onClick={() => login()}
                        >??????????
                        </button>
                        <div className="forgotpass">
                        <span

                            onClick={() => handleClick()}
                        >?????????????? ???? ?????????????????????</span>
                        </div>
                    </form>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                open={open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success" sx={{width: '100%'}}>
                    ?????????????? ?????? ?????????????? ?????? ??????? ????????????
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                open={loginError}
                autoHideDuration={3000}
                onClose={errorHandleClick}>
                <Alert
                    onClose={errorHandleClick}
                    severity="error" sx={{width: '100%'}}>
                    {!adminLogin.email && <p>???????????????????? ?????? ???? ????????????</p>}
                    {!adminLogin.password && <p>???????????????????? ?????? ????????????????????</p>}
                    {adminLoginData.errorMessage && <p>?????????????????????? ?????????????????? ???????? ????</p>}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                open={emailSendError}
                autoHideDuration={3000}
                onClose={emailSendErrorClcik}>
                <Alert
                    onClose={emailSendErrorClcik}
                    severity="error" sx={{width: '100%'}}>
                        Internal server error
                </Alert>
            </Snackbar>
        </div>
    )
}
export default AdminLogin;
