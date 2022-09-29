import React, {useEffect, useState} from 'react';
import './OrderDialog.scss';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from "react-i18next";
import {order} from './CartSlice';
import {WithOutRegisterOrder} from './WithOutRegisterUserSlice';
import Snackbar from "@mui/material/Snackbar";
import {Alert} from '@mui/material';

function OrderDialog({userInfoData}) {
    const [bonusError, setBonusError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const token = localStorage.getItem("TOKEN");
    const hash = localStorage.getItem('HASH')

    const userInfo = useSelector(((state) => state.userInfo.data.data));

    const phoneRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[0-9]{3}[-\s\.]?[0-9]{3}$/im);

    const {t} = useTranslation()

    const dispatch = useDispatch()

    const {register, handleSubmit, setValue} = useForm();

    const onSubmit = (formData) => {

        if (!phoneRegex.test(formData.phone)) {
            setPhoneError(true)
            return
        }
        if (token) {
            if (userInfoData.bonus && formData.bonus > userInfoData.bonus) {
                setBonusError(true)
                return
            }
            const values = {
                data: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    address: formData.address,
                    bonus: formData.bonus
                },
                token
            }
            dispatch(order(values))
        } else {
            const values = {
                fullName: formData.fullName,
                phone: formData.phone,
                address: formData.address,
                hash: hash
            }
            dispatch(WithOutRegisterOrder(values))
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setBonusError(false);
    };

    const handleClosePhoneSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setPhoneError(false)
    };

    useEffect(() => {
        setTimeout(() => {
            setBonusError(false)
        }, 3000)
    }, [bonusError])

    useEffect(() => {
        if (phoneError) {
            setTimeout(() => {
                setPhoneError(false)
            }, 2000)
        }
    }, [phoneError])

    useEffect(() => {
        if (userInfo) {
            setValue("phone", userInfo.phone)
            setValue("fullName", userInfo.firstName + " " + userInfo.lastName)
        }
    }, [userInfo]);

    return (
        <div className='OrderDialog_component'>
            <form className='form_order' onSubmit={handleSubmit(onSubmit)}>
                <div className='form_container'>
                    <div className='name_component'>
                        {token && userInfo ? (
                            <div className='user_order_token'>
                                <div className="input_block">
                                    <label htmlFor='fullName'>{t("fullName")}</label>
                                    <input
                                        placeholder={t("fullName")}
                                        id="fullName" {...register('fullName', {required: true})}/>
                                </div>
                                <div className="input_block">
                                    <label htmlFor='address'>{t("Adress")}</label>
                                    <input placeholder={t("Adress")}
                                           id="address" {...register('address', {required: true})}/>

                                </div>
                                <div className="input_block">
                                    <label htmlFor='phone'>{t("phone")}</label>
                                    <input placeholder={t("phone")} type='number'
                                           id="phone" {...register('phone', {required: true})}/>
                                </div>
                                <div className="input_block">
                                    <label htmlFor='bonus'>{t("Bonus")}</label>
                                    <input defaultValue={0} placeholder={t("Bonus")} type='number'
                                           id="bonus" {...register('bonus', {required: true})}/>
                                </div>
                            </div>
                        ) : (
                            <div className='user_order_without_token'>
                                <input placeholder={t("fullName")}
                                       id="fullName" {...register('fullName', {required: true})}/>
                                <input placeholder={t("Adress")}
                                       id="address" {...register('address', {required: true})}/>
                                <input placeholder={t("phone")} type='number'
                                       id="phone" {...register('phone', {required: true})}/>
                            </div>
                        )}
                    </div>
                    <div className='send_message'>
                        <button type="submit">{t("Order")}</button>
                    </div>
                </div>
            </form>
            <div className='snackbar'>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={bonusError}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}>
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="warning" sx={{width: '100%'}}>
                        {t("bonusError")}
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
            </div>
        </div>
    )
}

export default OrderDialog
