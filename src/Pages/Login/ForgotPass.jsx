import React, {useState} from 'react';
import "./Login.scss"
import {useDispatch} from 'react-redux';
import {forgotPassword} from '../User/UserLoginSlice';
import {useNavigate, useParams} from 'react-router';
import {useTranslation} from "react-i18next";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Nav from '../Nav/Nav';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ForgotPass = () => {
    const [inputValue, setInputValue] = useState('');
    const [send, setSend] = useState(false)

    const {token} = useParams();

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {t} = useTranslation();

    const sendemail = (e) => {
        setInputValue(e.target.value)
    }

    const recoverpassword = () => {
        const values = {
            email: inputValue,
            token: token
        }
        if (inputValue !== '') {
            dispatch(forgotPassword(values))
            setSend(true)
            // setTimeout(() => {
            //     navigate('/login')
            // }, 500)
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSend(false);
    };

    return (
        <>
            <Nav/>
            <div className="login">
                <div className='login_box'>
                    <div className="box">
                        <h2>{t("Forgotpassword")}</h2>
                        <div className="inputBox">
                            <input
                                placeholder={t("email")}
                                type="text"
                                onChange={sendemail}
                            />
                        </div>
                        <button
                            className='sned_email'
                            onClick={() => recoverpassword()}
                        >
                            {t("send")}
                        </button>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={send}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}>
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="success" sx={{width: '100%'}}>
                        {t("emailSend")}
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}
export default ForgotPass;
