import React, {useCallback, useEffect, useState} from 'react';
import "./ProductList.scss";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductListDialog from './ProductListDialog';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {userOrder} from '../Cart/CartSlice';
import {WithOutRegisterUserOrder} from '../Cart/WithOutRegisterUserSlice';
import {v4 as uuidv4} from 'uuid';

function ProductList({product, data}) {
    const [open, setOpen] = useState(false);
    const [cartProductList, setCartProductList] = useState([])
    const [minusCount, setMinusCount] = useState(false);
    const [orderCount, setOrderCount] = useState(1);

    const apiUrl = process.env.REACT_APP_API_URL;

    const dispatch = useDispatch()

    const {t} = useTranslation();

    const productData = useSelector(((state) => state.CartReducer.productData));
    const withOutRegisterProductData = useSelector(((state) => state.withOutRegisterCart.productData))

    const token = localStorage.getItem('TOKEN')
    const hash = localStorage.getItem('HASH')

    const handleRemoveProduct = (sushi) => {
        const ProductExist = data.data.find((item) => item.id === sushi.id);
        if (ProductExist) {
            setCartProductList({...ProductExist, quantity: orderCount - 1})
            setOrderCount(orderCount - 1);
        }
    }

    const handleAddProduct = (sushi) => {
        const ProductExist = data.data.find((item) => item.id === sushi.id);
        if (ProductExist) {
            setCartProductList({...ProductExist, quantity: orderCount + 1})
            setOrderCount(orderCount + 1);
        }
    }

    const addToCart = useCallback((product) => {
        if (productData && productData.find((item => item.product.id === product.id))) {
            return
        }

        if (withOutRegisterProductData && withOutRegisterProductData.find((item => item.product.id === product.id))) {
            return
        }

        if (token) {
            const values = {
                token,
                value: {
                    product: product.id,
                    quantity: orderCount
                }
            }
            dispatch(userOrder(values))
        } else {
            const values = {
                product: product.id,
                quantity: orderCount,
                hash: hash,
            }
            dispatch(WithOutRegisterUserOrder(values))
        }
    })

    useEffect(() => {
        if (orderCount === 1) {
            setMinusCount(true)
        }
        if (orderCount > 1) {
            setMinusCount(false)
        }
    }, [orderCount])

    useEffect(() => {
        if (!hash) {
            window.localStorage.setItem('HASH', uuidv4())
        }
    }, [])

    return (
        <div key={product.id} className="user_product_list_container">
            <div className='user_product_list'>
                <img src={`${apiUrl}/${product.image}`} alt='img'/>
            </div>
            <div className='product_info'>
                <p className='name'>{product.name}</p>
                <div className='details_price'>
                    <button onClick={() => setOpen(true)}>{t("details")}</button>
                    <p className='price'>{product.price} {t("amd")}</p>
                </div>
            </div>
            <div className='add_cart'>
                <div>
                    <button className='add_basket' onClick={() => addToCart(product)}>
                        <AddShoppingCartIcon/>
                        {/*<p>{t("addTocard")}</p>*/}
                    </button>
                </div>
                <div className='add_reduce'>
                    <button
                        disabled={minusCount}
                        onClick={() => handleRemoveProduct(product)}
                    > -
                    </button>
                    {orderCount}
                    <button onClick={() => handleAddProduct(product)}> +</button>
                </div>
            </div>
            <ProductListDialog product={product} open={open} setOpen={setOpen} handleAddProduct={handleAddProduct}
                               handleRemoveProduct={handleRemoveProduct} orderCount={orderCount} addToCart={addToCart}/>
        </div>
    )
}

export default ProductList
