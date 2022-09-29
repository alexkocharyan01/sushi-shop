import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import './ContactUs.scss';
import {useDispatch, useSelector} from "react-redux";
import {clearData, sendMessage} from './ContactUsSlice';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import footer_img from "../../Assets/footer_img.png";
import {useTranslation} from "react-i18next";
import Footer from "../Footer/Footer";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ContactUs() {
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [open, setOpen] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const phoneRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[0-9]{3}[-\s\.]?[0-9]{3}$/im);

    const {register, handleSubmit, resetField, formState: {errors}} = useForm()

    const dispatch = useDispatch();

    const {t} = useTranslation();

    const data = useSelector(((state) => state.sendMessage))

    const onSubmit = (data) => {
        if (!phoneRegex.test(data.phone)) {
            setPhoneError(true)
            return
        }
        const values = {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            text: data.text
        }
        dispatch(sendMessage(values))
        setOpen(true)
        setOpenSnackbar(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setOpen(false)
    };

    const handleClosePhoneSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPhoneError(false)
    };

    useEffect(() => {
        if (data.data && data.data.message === 'Success!!') {
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
                setOpen(false)
                resetField('firstName')
                resetField('lastName')
                resetField('phone')
                resetField('email')
                resetField('text')
                dispatch(clearData())
            }, 1000);
        }
    }, [open])

    return (
        <div className='contact_us_block'>
            <div className='container'>
                <div className='contact_page'>
                    <h2>{t("contact")}</h2>
                    <div className='message_container'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='form_container'>
                                <div className='name_component'>
                                    <input placeholder={t("firstName")} className={errors.firstName ? 'error' : ''}
                                           id="firstName" {...register('firstName', {required: true})} />
                                    <input placeholder={t("lastName")} className={errors.lastName ? 'error' : ''}
                                           id="lastName" {...register('lastName', {required: true})} />
                                </div>
                                <div className='mail_component'>
                                    <input placeholder={t("phone")} type='number'
                                           className={errors.phone ? 'error' : ''}
                                           id="phone" {...register('phone', {required: true})} />
                                    <input placeholder={t("email")} type='email' className={errors.email ? 'error' : ''}
                                           id="email" {...register('email', {required: true})} />
                                </div>
                                <div className='message_component'>
                                    <textarea placeholder={t("message")}
                                              className={errors.text ? 'error_textarea' : 'message_input'}
                                              id="text" {...register('text', {required: true})} />
                                </div>
                                <div className='send_message'>
                                    <button type="submit">{t("send")}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='contact_info'></div>
                </div>
                <div className='contact_WitSM'>
                    <h3>{t("contactus")}</h3>
                    <div className='contact_phone'>
                        <p className='phone'>{t("phone")}</p>
                        <p className='number'>+374 77 77 11 77</p>
                        <p className='number'>+374 98 77 11 77</p>
                    </div>
                    <div className='contact_email'>
                        <p className='email'>{t("email")}</p>
                        <a href='client/src/Pages/Contact/ContactUs#'> sushiClub@gmail.com</a>
                    </div>
                    <div className='sm_icons'>
                        <a href='client/src/Pages/Contact/ContactUs#'><FacebookIcon sx={{color: '#CCCFD1'}}/></a>
                        <a href='client/src/Pages/Contact/ContactUs#'><InstagramIcon sx={{color: '#CCCFd1'}}/> </a>
                    </div>
                </div>
            </div>
            <div className='footer_img'><img src={footer_img} alt='img'/></div>
            <Footer absolute={true}/>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert severity="success">{t("MessageSend")}</Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                open={phoneError}
                autoHideDuration={5000}
                onClose={handleClosePhoneSnackbar}>
                <Alert
                    onClose={handleClosePhoneSnackbar}
                    severity="error" sx={{width: '100%'}}>
                    {t("phoneInfo")}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ContactUs
