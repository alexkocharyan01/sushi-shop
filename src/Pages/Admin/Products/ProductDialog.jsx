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
import {addProducts, clearData} from './ProdictsSlice';
import Snackbar from "@mui/material/Snackbar";

const useStyles = makeStyles(() => ({
    dialog: {
        height: '68vh',
    }
}));

function ProductDialog({open, setOpen, setChanges, changes}) {
    const [imgData, setImgData] = useState(null);
    const [type, setType] = useState('maki');
    const [language, setLanguage] = useState('arm');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const classes = useStyles();

    const dispatch = useDispatch();

    const data = useSelector(((state) => state.addProduct.data))

    const {register, handleSubmit, watch, resetField} = useForm();

    const token = localStorage.getItem('ADMIN_TOKEN');

    const file = watch("image");

    const handleClose = () => {
        setOpen(false)
        setImgData(null)
        resetField('image')
        resetField('name')
        resetField('price')
        resetField('description')
    }

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const handleChange2 = (event) => {
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
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('language', data.language);
        formData.append('type', data.type);

        const values = {
            formData,
            token
        }

        dispatch(addProducts(values))
        setChanges(!changes)
        setOpenSnackbar(false)
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
                setChanges(!changes)
                setOpen(false)
                setImgData(null)
                resetField('image')
                resetField('name')
                resetField('price')
                resetField('description')
                setOpenSnackbar(false);
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
                                        onChange={handleChange2}
                                        displayEmpty
                                        name="language"
                                        inputProps={register('language', {
                                            required: true,
                                        })}
                                    >
                                        <MenuItem value="arm">Հայ</MenuItem>
                                        <MenuItem value='ru'>Ru</MenuItem>
                                        <MenuItem value='eng'>ENG</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{m: 1, minWidth: 120}}>
                                    <h4>Տեսակը</h4>
                                    <Select
                                        value={type}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={register('type', {
                                            required: true,
                                        })}
                                        name="type"
                                    >
                                        <MenuItem value='maki'>ՄԱԿԻ</MenuItem>
                                        <MenuItem value='roll'>ՌՈԼԼ</MenuItem>
                                        <MenuItem value='sashimi'>ՍԱՇԻՄԻ</MenuItem>
                                        <MenuItem value='sushi'>ՍՈՒՇԻ</MenuItem>
                                        <MenuItem value='set'>ՍԵԹ</MenuItem>
                                        <MenuItem value='salad'>ԱՂՑԱՆ</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='name_price'>
                                <div className='product_name'>
                                    <h4>Անվանումը</h4>
                                    <input type='text' id="name" {...register('name', {required: true})} />
                                </div>
                                <div className='product_price'>
                                    <h4>Գինը</h4>
                                    <input type='text' id="price" {...register('price', {required: true})} />
                                </div>
                            </div>
                            <div className='description'>
                                <h4>Նկարագրություն</h4>
                                <textarea placeholder='Write description'
                                          id="description" {...register('description', {required: true})}></textarea>
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
                                            <h4 className='addPhoto'>Ավելացնել լուսանկար</h4>
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
                        Ապրանքը ավելացված է
                    </Alert>
                </Snackbar>
            </Dialog>
        </div>
    )
}

export default ProductDialog
