import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(() => ({
  dialog: {
    height: '68vh',
    backgroundColor: 'rgba(228, 241, 250, 0.91)'
  }
}));


function ProductListDialog({ product, open, setOpen, handleAddProduct, handleRemoveProduct, orderCount, addToCart }) {

  const apiUrl = process.env.REACT_APP_API_URL;

  const classes = useStyles();

  const closeDialog = () => {
    setOpen(false)
  }

  return (
    <Dialog
      className='dialog_details'
      open={open}
      fullWidth
      maxWidth="sm"
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle id="alert-dialog-slide-title">

        <button onClick={() => closeDialog()}>
          <CloseIcon />
        </button>
      </DialogTitle>
      <DialogContent>
        <div key={product.id} className="dialog_user_product_list_container">
          <div className='dialog_user_product_list'>
            <img src={`${apiUrl}/${product.image}`}  alt='img'/>
          </div>
          <div className='details_product'>
            <p className='pr_name'>{product.name}</p>
            <p className='pr_description'>{product.description}</p>
            <p className='pr_price'>{product.price} AMD</p>
          </div>
          <div className='dialog_add_cart'>
            <div>
              <button className='dialog_add_basket' onClick={() => addToCart(product)}>
                <AddShoppingCartIcon />
                <p>Add to cart</p>
              </button>
            </div>
            <div className='add_reduce'>
              <button
                onClick={() => handleRemoveProduct(product)}
              > - </button>
              {orderCount}
              <button
                onClick={() => handleAddProduct(product)}
              > + </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductListDialog
