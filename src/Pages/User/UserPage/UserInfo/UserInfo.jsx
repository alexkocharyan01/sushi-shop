import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {useDispatch} from 'react-redux';
import {userInfoUpData} from '../UserPageSlice';
import './UserInfo.scss';

function UserInfo({data}) {
    const {t} = useTranslation();
    const [changeInfo, setChangeInfo] = useState(false);

    const token = localStorage.getItem('TOKEN');

    const {register, handleSubmit} = useForm();

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        const value = {
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone
            },
            token
        }
        dispatch(userInfoUpData(value))
        setChangeInfo(false)
    }

    return (
        <div className='UserInfo_component'>
            {data ? (
                <div>
                    <h3>{t("UserInfo")}</h3>
                    {
                        changeInfo ? (
                            <form className='change_info' onSubmit={handleSubmit(onSubmit)}>
                                <div className='form_div'>
                                    <p>{t("firstName")}</p>
                                    :
                                    <input
                                        type='text'
                                        defaultValue={data.firstName}
                                        id='firstName' {...register('firstName', {required: true})}
                                    />
                                </div>
                                <div className='form_div'>
                                    <p>{t("lastName")}</p>
                                    :
                                    <input
                                        type='text'
                                        defaultValue={data.lastName}
                                        id='lastName' {...register('lastName', {required: true})}
                                    />
                                </div>
                                <div className='form_div'>
                                    <p>{t("phone")}</p>
                                    :
                                    <input
                                        type='number'
                                        defaultValue={data.phone}
                                        id='phone' {...register('phone', {required: true})}
                                    />
                                </div>
                                <div className='form_button'>
                                    <button type="submit">{t('Save')}</button>
                                </div>
                            </form>
                        ) : (
                            <div className='info'>
                                <p>{t("firstName")}:<span> {data.firstName}</span></p>
                                <p>{t("lastName")}: <span>{data.lastName}</span></p>
                                <p>{t("phone")}: <span>{data.phone}</span></p>
                            </div>
                        )
                    }
                    <p>{t("email")}: <span>{data.email}</span></p>
                    <p>{t("Bonus2")}: <span>{data.bonus} {t("amd")}</span></p>
                    {
                        !changeInfo &&
                        <button
                            className='change_info_button'
                            onClick={() => setChangeInfo(true)}> {t("ChangeInfo")}</button>
                    }
                </div>
            ) : null}
        </div>
    )
}

export default UserInfo
