import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useForm} from "react-hook-form";
import './UserChangePassword.scss'
import {clearData, userChangePassword} from './UserChangePasswordSlice';
import {useTranslation} from "react-i18next";
import {clearUpDataMessage, userInfo} from '../UserPage/UserPageSlice';
import UserInfo from '../UserPage/UserInfo/UserInfo';
import Nav from '../../Nav/Nav';
import Footer from "../../Footer/Footer";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorAlert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserChangePassword() {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [password, setPassword] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);

    const changePassword = useSelector(((state) => state.userChangePassword.changePassword));
    const data = useSelector(((state) => state.userInfo.data));
    const userInfoUpdata = useSelector(((state) => state.userInfo.upData));

    const {t} = useTranslation();

    const token = localStorage.getItem('TOKEN')

    const {register, handleSubmit} = useForm();

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,}$/);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleCloseErrorSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false)
    };

    const onSubmit = (data) => {

        if (data.newPassword === data.confirmPassword && data.newPassword.length < 8) {
            setPasswordLength(true);
            return
        }

        if (data.newPassword !== data.confirmPassword) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000)
        }

        if (!passwordRegex.test(data.newPassword)) {
            setPassword(true)
            return
        }

        const values = {
            token,
            pass: {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword
            }
        }
        dispatch(userChangePassword(values))
    }

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
        if (changePassword.message === 'success') {
            setOpen(true)
            setTimeout(() => {
                navigate('/home')
                dispatch(clearData())
            }, 2000)
        }
    }, [changePassword])

    useEffect(() => {
        dispatch(userInfo(token))
        setTimeout(() => {
            dispatch(clearUpDataMessage())
        }, 100)
    }, [userInfoUpdata])

    useEffect(() => {
        if (!localStorage.getItem('TOKEN')) {
            navigate("/login");
        }
    }, [])

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
            <div className="user_change_password change_pass">
                <div className='user_change_password_box'>
                    <div className='userPage_container'>
                        <UserInfo data={data.data}/>
                    </div>
                    <div className="user_box">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2>{t("ChangePassword")}</h2>
                            <div className="inputBox">
                                <input
                                    placeholder={t("OldPassword")}
                                    type="password"
                                    id='oldPassword'
                                    {...register("oldPassword", {required: true})}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    placeholder={t("newPassword")}
                                    type="password"
                                    id='newPassword'
                                    {...register("newPassword", {required: true})}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    placeholder={t("ConfirmPassword")}
                                    type="password"
                                    id='confirmPassword'
                                    {...register("confirmPassword", {required: true})}
                                />
                            </div>
                            <button
                                className='button'
                                type='submit'
                            >
                                {t("Save")}
                            </button>
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
                        {t("changedPassword")}
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={error}
                    autoHideDuration={3000}
                    onClose={handleCloseErrorSnackbar}>
                    <ErrorAlert
                        onClose={handleCloseErrorSnackbar}
                        severity="error" sx={{width: '100%'}}>
                        {t("passwordError")}
                    </ErrorAlert>
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
                <Footer absolute={true}/>
            </div>
        </>
    )
}

export default UserChangePassword
