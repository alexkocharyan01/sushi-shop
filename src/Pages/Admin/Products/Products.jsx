import React, {useState} from "react";
import "./Products.scss";
import Button from '@mui/material/Button';
import ProductDialog from './ProductDialog';
import ProductList from "./ProductList";

function Products() {
    const [open, setOpen] = useState(false);
    const [changes, setChanges] = useState(false);

    return (
        <div className="modal_product">
            <div className='modal_btn'>
                <Button variant="outlined" onClick={() => setOpen(true)}>
                    Ավելացնել նոր ապրանքներ
                </Button>
            </div>
            <ProductDialog open={open} setOpen={setOpen} setChanges={setChanges} changes={changes}/>
            <ProductList setChanges={setChanges} changes={changes}/>
        </div>
    )
}

export default Products;
