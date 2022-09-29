import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getProducts, productDelete} from './ProdictsSlice';
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import "./Products.scss";
import ChangesDialog from './ChangesDialog';
import Bonus from './Bonus/Bonus';

const columns = [
    {id: 'type', label: 'Տեսակ', minWidth: 170},
    {id: 'name', label: 'Անվանում', minWidth: 100},
    {id: 'price', label: 'Գին', minWidth: 170},
    {id: 'description', label: 'Նկարագրություն', minWidth: 170},
    {id: 'image', label: 'Նկար', minWidth: 170},
    {id: 'update', label: 'Թարմացնել', minWidth: 170},
    {id: 'delete', label: 'Ջնջել', minWidth: 170},
];

function ProductList({setChanges, changes}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [changeProduct, setChangeProduct] = useState(false);
    const [productData, setProductData] = useState({})

    const apiUrl = process.env.REACT_APP_API_URL;

    const dispatch = useDispatch();

    const data = useSelector(((state) => state.addProduct.getData));
    const rows = data.data
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
        dispatch(productDelete(values))
        setChanges(!changes)
    }

    const editProduct = (row) => {
        setChangeProduct(!changeProduct)
        setProductData(row)
    }

    useEffect(() => {
        dispatch(getProducts(token))
    }, [changes, changeProduct])

    return (
        <div>
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
                                                    if (column.id === "type") {
                                                        return (
                                                            <TableCell key='1'>
                                                                {row.type}
                                                            </TableCell>
                                                        )
                                                    }
                                                }
                                                {
                                                    if (column.id === "name") {
                                                        return (
                                                            <TableCell key='2'>
                                                                {row.name}
                                                            </TableCell>
                                                        )
                                                    }
                                                }
                                                {
                                                    if (column.id === "price") {
                                                        return (
                                                            <TableCell key='3'>
                                                                {row.price}
                                                            </TableCell>
                                                        )
                                                    }
                                                }
                                                {
                                                    if (column.id === "description") {
                                                        return (
                                                            <TableCell key='4'>
                                                                {row.description}
                                                            </TableCell>
                                                        )
                                                    }
                                                }
                                                {
                                                    if (column.id === "delete") {
                                                        return (
                                                            <TableCell key='5'>
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
                                                            <TableCell key='6'>
                                                                <button className='update_del_btn'
                                                                        onClick={() => editProduct(row)}>
                                                                    <EditIcon/>
                                                                </button>
                                                            </TableCell>
                                                        )
                                                    }
                                                }
                                                {
                                                    if (column.id === "image") {
                                                        return (
                                                            <TableCell key='7'>
                                                                <img src={`${apiUrl}/${row.image}`} alt='img'/>
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
                <ChangesDialog changeProduct={changeProduct} setChangeProduct={setChangeProduct}
                               productData={productData}/>
                <TablePagination
                    rowsPerPageOptions={[15, 25, 35]}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    page={page}
                    count={rows !== undefined ? rows.length : 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <div className='bonus_container'>
                <Bonus/>
            </div>
        </div>
    )
}

export default ProductList
