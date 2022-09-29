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
import {addSliderInfo, clearData} from './SlidersProductSlice';

const useStyles = makeStyles(() => ({
    dialog: {
        height: '68vh',
    }
}));

function SlidersDialog({open, setOpen, change, setChange}) {
    const [imgData, setImgData] = useState(null);
    const [language, setLanguage] = useState('arm');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const data = useSelector(((state) => state.createSliderInfo.data))

    const {register, handleSubmit, watch, resetField} = useForm();

    const token = localStorage.getItem('ADMIN_TOKEN');

    const file = watch("image");

    const handleClose = () => {
        setOpen(false)
        setImgData(null)
        resetField('image')
        resetField('text')
    }

    const handleChange = (event) => {
        setLanguage(event.target.value);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        formData.append('text', data.text);
        formData.append('language', data.language);
        formData.append('title', data.title);
        const values = {
            formData,
            token
        }
        setChange(!change)
        setOpenSnackbar(false)
        dispatch(addSliderInfo(values))
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
        if (data.message === "Success") {
            setOpenSnackbar(true);
            setTimeout(() => {
                setChange(!change)
                setOpen(false)
                setImgData(null)
                resetField('image')
                resetField('text')
                resetField('title')
                setOpenSnackbar(false)
                dispatch(clearData())
            }, 1000);
        }
    }, [data.message, open])

    return (
        <div>
            <Dialog
                open={open}
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
                                        onChange={handleChange}
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
                                    <input type='text' id="text" {...register('text', {required: true})} />
                                </div>
                                <div className='product_text'>
                                    <h4>Տեքստ</h4>
                                    <input type='text' id="title" {...register('title', {required: true})} />
                                </div>
                            </div>

                            <div className="fileUpload">
                                <div className="pic">
                                    <input
                                        style={{display: "none"}}
                                        type="file"
                                        id="image"
                                        accept="application/png"
                                        {...register("image", {required: true})}

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
                                            <img src={imgData} alt="" className="prevImg"/>
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
                        Սլայդերը ստեղծվել է
                    </Alert>
                </Snackbar>
            </Dialog>
        </div>
    )
}

export default SlidersDialog
