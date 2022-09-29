import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {Alert, Dialog, DialogContent, DialogTitle} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Close} from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useDispatch, useSelector} from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {upDateSliderImage, clearData, upDateSlider} from './SlidersProductSlice';

const useStyles = makeStyles(() => ({
    dialog: {
        height: '68vh',
    }
}));

function SliderUpdateDialog({changeProduct, setChangeProduct, productData}) {
    const [imgData, setImgData] = useState(null);
    const [language, setLanguage] = useState('arm');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const classes = useStyles();

    const sliderImage = useSelector(((state) => state.createSliderInfo.upDataSLider.message))

    const dispatch = useDispatch();

    const {register, handleSubmit, watch, resetField} = useForm();

    const token = localStorage.getItem('ADMIN_TOKEN');

    const file = watch("image");

    const handleClose = () => {
        setChangeProduct(false)
        resetField('image')
        resetField('text')
        resetField('title')
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleChange2 = (event) => {
        setLanguage(event.target.value);
    }

    const onSubmit = (data) => {
        const formData = new FormData();

        const values = {
            id: productData.id,
            token,
            value: {
                text: data.text,
                title: data.title,
                language: data.language
            }
        }
        dispatch(upDateSlider(values))
        dispatch(clearData())

        if (file.length > 0) {
            formData.append('image', data.image[0]);
            const values = {
                id: productData.id,
                token,
                formData
            }
            dispatch(upDateSliderImage(values))
            dispatch(clearData())
        }
        setOpenSnackbar(true)
        setTimeout(() => {
            setOpenSnackbar(false)
            setChangeProduct(!changeProduct)
        }, 2000)
    }

    useEffect(() => {
        if (file && file.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(file[0]);
        } else {
            setImgData(null)
        }
    }, [file]);


    useEffect(() => {
        if (sliderImage === "success") {
            setTimeout(() => {
                setImgData(null)
            }, 3000)
        }
    }, [sliderImage, ImageData])


    useEffect(() => {
        if (!changeProduct) {
            resetField('image')
            resetField('text')
            resetField('title')
        }
    }, [changeProduct])

    return (
        <div>
            <Dialog
                open={changeProduct}
                fullWidth
                maxWidth="sm"
                classes={{paper: classes.dialog}}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    <div className="admin_dialog_button">
                        <button onClick={handleClose}>
                            <Close/>
                        </button>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="dialog_body">
                            <div className='type_lang_slc'>
                                <FormControl sx={{m: 1, minWidth: 120}}>
                                    <h4>Լեզու</h4>
                                    <Select
                                        value={language}
                                        onChange={handleChange2}
                                        displayEmpty
                                        name="language"
                                        inputProps={register('language', {
                                            required: true,
                                        })}
                                    >
                                        <MenuItem value="arm">Հայ</MenuItem>
                                        <MenuItem value='ru'>RU</MenuItem>
                                        <MenuItem value='eng'>ENG</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='name_price'>
                                <div className='product_name'>
                                    <h4>Վերնագիր</h4>
                                    <input type='text' defaultValue={productData.text}
                                           id="text"  {...register('text', {required: true})} />
                                    <h4>Տեքստ</h4>
                                    <input type='text' defaultValue={productData.title}
                                           id="title"  {...register('title', {required: true})} />
                                </div>
                            </div>
                            <div className="fileUpload">
                                <div className="pic">
                                    <input
                                        style={{display: "none"}}
                                        type="file"
                                        id="image"
                                        accept="application/png"
                                        {...register("image")}
                                    />
                                    <div className='addingPhoto'>
                                        <Button
                                            htmlFor="image"
                                            className="shapefile-icon"
                                            component="label"
                                        >
                                            <h4 className='addPhoto'>Ապրանքի տեսակը</h4>
                                            <AddAPhotoIcon/>
                                        </Button>
                                        <div className="prevPic">
                                            {imgData ? <img src={imgData} alt="" className="prevImg"/> :
                                                <img src={`${apiUrl}/${productData.image}`} alt="" className="prevImg"/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='saveBtn'>
                                <button type="submit">Պահպանել</button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}>
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="success" sx={{width: '100%'}}>
                        Սլայդերը փոխվել է
                    </Alert>
                </Snackbar>
            </Dialog>
        </div>
    )
}

export default SliderUpdateDialog
