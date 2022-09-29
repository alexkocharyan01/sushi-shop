import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {getSliderInfo, SliderInfoDelete} from './SlidersProductSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SliderUpdateDialog from './SliderUpdateDialog';

const columns = [
    {id: 'text', label: 'Վերնագիր', minWidth: 100},
    {id: 'title', label: 'Տեքստ', minWidth: 100},
    {id: 'image', label: 'Նկար', minWidth: 170},
    {id: 'update', label: 'Թարմացնել', minWidth: 170},
    {id: 'delete', label: 'Ջնջել', minWidth: 170},
];

function SliderProducts({change, setChange}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [changeProduct, setChangeProduct] = useState(false);
    const [productData, setProductData] = useState({})

    const apiUrl = process.env.REACT_APP_API_URL;

    const data = useSelector(((state) => state.createSliderInfo.getData))

    const dispatch = useDispatch()

    const token = localStorage.getItem('ADMIN_TOKEN');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteProductClick = (id) => {
        const values = {
            id,
            token
        }
        dispatch(SliderInfoDelete(values))
        setChange(!change)
    }

    const editProduct = (row) => {
        setChangeProduct(!changeProduct)
        setProductData(row)
    }

    useEffect(() => {
        dispatch(getSliderInfo())
    }, [change, changeProduct])

    const row = data.data

    return (
        <>
            <Paper sx={{width: "100%"}}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{top: 57, minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data && data.data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                {
                                                    if (column.id === "text") {
                                                        return (
                                                            <TableCell key='1'>
                                                                <p>{row.text}</p>
                                                            </TableCell>
                                                        )
                                                    }
                                                }
                                                {
                                                    if (column.id === "title") {
                                                        return (
                                                            <TableCell key='2'>
                                                                <p>{row.title}</p>
                                                            </TableCell>
                                                        )
                                                    }
                                                }
                                                {
                                                    if (column.id === "image") {
                                                        return (
                                                            <TableCell key='3'>
                                                                <img src={`${apiUrl}/${row.image}`} alt='img'/>
                                                            </TableCell>
                                                        )
                                                    }
                                                }
                                                {
                                                    if (column.id === "delete") {
                                                        return (
                                                            <TableCell key='4'>
                                                                <button className='update_del_btn'
                                                                        onClick={() => deleteProductClick(row.id)}>
                                                                    <DeleteForeverIcon/>
                                                                </button>
                                                            </TableCell>
                                                        )
                                                    }
                                                }
                                                {
                                                    if (column.id === "update") {
                                                        return (
                                                            <TableCell key='5'>
                                                                <button className='update_del_btn'
                                                                        onClick={() => editProduct(row)}>
                                                                    <EditIcon/>
                                                                </button>
                                                            </TableCell>
                                                        )
                                                    }
                                                }
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <SliderUpdateDialog changeProduct={changeProduct} setChangeProduct={setChangeProduct}
                                    productData={productData}/>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    page={page}
                    count={row !== undefined ? row.length : 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    )
}

export default SliderProducts
