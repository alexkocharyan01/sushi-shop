import React, {useEffect, useState} from 'react';
import "./Login.scss"
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {adminChangePassword} from './AdminLoginSlice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import logo from "../../Assets/logo1.png";
import {useParams} from "react-router";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertError = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RecoverPass = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState({});
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);

    const passwordData = useSelector((state) => state.adminLogin.changePassword)

    const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,}$/);

    const dispatch = useDispatch()

    const code = useParams()

    const changePass = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }
    const saveChangePassword = () => {
        if (password.new_pass !== password.confirm_pass) {
            setError(true)
            return
        }
        if (password.new_pass === password.confirm_pass && password.new_pass.length < 6) {
            setPasswordLength(true);
            return
        }
        if (!passwordRegex.test(password.new_pass)) {
            setPasswordError(true);
            return
        }
        const value = {
            password,
            code
        }
        dispatch(adminChangePassword(value))
    }

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

        setError(false);
    };

    const handleClosePasswordSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPasswordError(false)
    };

    const handleClosePasswordLengthSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPasswordLength(false)
    };

    useEffect(() => {
        if (passwordData.message === "Success") {
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
                navigate('/admin-login')
            }, 3000)
        }
    }, [passwordData])

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false)
            }, [3000])
        }
    }, [error])

    useEffect(() => {
        if (passwordError) {
            setTimeout(() => {
                setPasswordError(false)
            }, 3000)
        }
    }, [passwordError])

    useEffect(() => {
        if (passwordLength) {
            setTimeout(() => {
                setPasswordError(false)
            }, [3000])
        }
    })

    return (
        <div className="login">
            <div className='login_box'>
                <div className='header header2'>
                    <div className='container'>
                        <NavLink to="/">
                            <img src={logo} className='logo' alt='logo'/>
                        </NavLink>
                    </div>
                </div>
                <div className="box">
                    <h2>Վերականգնել գաղտնաբառը</h2>
                    <div className="inputBox">
                        <input
                            placeholder='Նոր գաղտնաբառ'
                            type="password"
                            required=""
                            name="new_pass"
                            onChange={changePass}
                        />
                    </div>
                    <div className="inputBox">
                        <input
                            placeholder='Հաստատել գաղտնաբառը'
                            type="password"
                            required=""
                            name="confirm_pass"
                            onChange={changePass}
                        />
                    </div>
                    <button
                        className='button'
                        onClick={saveChangePassword}
                        type="button"
                    >Պահպանել
                    </button>
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
                    Գաղտնաբառը փոխվել է
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                open={error}
                autoHideDuration={3000}
                onClose={handleCloseErrorSnackbar}>
                <AlertError
                    onClose={handleCloseErrorSnackbar}
                    severity="error" sx={{width: '100%'}}>
                    Գաղտնաբառերը չեն համապատասխանում
                </AlertError>
            </Snackbar>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                open={passwordError}
                autoHideDuration={3000}
                onClose={handleClosePasswordSnackbar}>
                <Alert
                    onClose={handleClosePasswordSnackbar}
                    severity="error" sx={{width: '100%'}}>
                    Գախտնաբառը պետք է պարունակի տառ, թիվ, սիմվոլ
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
                    Գախտնաբառը պետք է առնվազն 8 նիշ լինի
                </Alert>
            </Snackbar>
        </div>
    )
}
export default RecoverPass;
