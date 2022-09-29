import React, {useEffect, useState} from 'react';
import "./ChangePassword.scss"
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useForm} from "react-hook-form";
import {adminChangePassword, clearData} from './ChangePasswordSlice';
import AdminHeader from "../AdminHeader/AdminHeader";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChangePassword = () => {
    const [open, setOpen] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false)

    const {register, handleSubmit} = useForm();

    const navigate = useNavigate();

    const passwordStatus = useSelector(((state) => state.adminChangePassword.data))

    const dispatch = useDispatch()

    const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,}$/);

    const token = localStorage.getItem('ADMIN_TOKEN');

    const handleChange = (data) => {
        if (data.newPassword === data.confirmPassword && data.newPassword.length < 6) {
            setPasswordLength(true);
        }
        if (!passwordRegex.test(data.newPassword)) {
            setPasswordError(true);
            return
        }
        const values = {
            token,
            value: {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword
            }
        }
        dispatch(adminChangePassword(values))
        dispatch(clearData())
    }

    const handleClosePasswordSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPasswordError(false)
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleClosePasswordLengthSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPasswordLength(false)
    };

    useEffect(() => {
        if (passwordStatus.message === "Success") {
            setOpen(true);
            setTimeout(() => {
                navigate('/admin-page')
                setOpen(false);
            }, 3000)
        }
        dispatch(clearData())
    }, [passwordStatus])

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
                <div className="header2">
                    <AdminHeader/>
                </div>
                <div className="box">
                    <form onSubmit={handleSubmit(handleChange)}>
                        <h2>Փոխել գաղտնաբառը</h2>
                        <div className="inputBox">
                            <input
                                placeholder='Հին Գաղտնաբառ'
                                type="password"
                                id='oldPassword'
                                {...register("oldPassword", {required: true})}
                            />
                        </div>
                        <div className="inputBox">
                            <input
                                placeholder='Նոր Գաղտնաբառ'
                                type="password"
                                id='newPassword'
                                {...register("newPassword", {required: true})}
                            />
                        </div>
                        <div className="inputBox">
                            <input
                                placeholder='Հաստատել գաղտնաբառը'
                                type="password"
                                id='confirmPassword'
                                {...register("confirmPassword", {required: true})}
                            />
                        </div>
                        <button
                            className='button'
                            type='submit'>Պահպանել
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
                    Գաղտնաբառը հաջողությամբ փոխվեց
                </Alert>
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
export default ChangePassword;
