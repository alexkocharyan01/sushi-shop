import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';
import {changeCount, cartDelete} from "./CartSlice";
import {WithOutRegisterCartDelete, WithOutRegisterChangecartCount} from "./WithOutRegisterUserSlice";

export default function OneCart({product, data, productCount, setProductCount, noRegisterData}) {
    const [orderCount, setOrderCount] = useState(1);
    const [decrementValue, setDecrementValue] = useState(false)

    const token = localStorage.getItem("TOKEN");
    const hash = localStorage.getItem('HASH')

    const dispatch = useDispatch();

    const handleDeleteClick = (product) => {
        if (token) {
            const values = {
                id: product.id,
                token
            }
            dispatch(cartDelete(values))
        } else {
            const value = {
                id: product.id,
                hash: hash
            }
            dispatch(WithOutRegisterCartDelete(value))
        }
    };

    const handleAddToCart = (product) => {
        if (token) {
            const ProductExist = data.find((item) => item.id === product.id);
            if (ProductExist) {
                const value = {
                    id: product.id,
                    quantity: orderCount + 1,
                    token
                }
                dispatch(changeCount(value));
            }
        } else {
            const ProductExist = noRegisterData.find((item) => item.id === product.id);
            if (ProductExist) {
                const value = {
                    id: product.id,
                    quantity: orderCount + 1,
                    hash: hash
                }
                dispatch(WithOutRegisterChangecartCount(value))
            }
        }
        setOrderCount(orderCount + 1)
        setProductCount(!productCount);
    };

    const handleRemoveProduct = (product) => {

        if (token) {
            const ProductExist = data.find((item) => item.id === product.id);
            if (ProductExist) {
                const value = {
                    id: product.id,
                    quantity: orderCount - 1,
                    token
                }
                dispatch(changeCount(value))
            }
        } else {
            const ProductExist = noRegisterData.find((item) => item.id === product.id);
            if (ProductExist) {
                const value = {
                    id: product.id,
                    quantity: orderCount - 1,
                    hash: hash
                }
                dispatch(WithOutRegisterChangecartCount(value))
            }
        }
        setProductCount(!productCount);
        setOrderCount(orderCount - 1)
    };

    useEffect(() => {
        setOrderCount(product.quantity);
    }, []);

    useEffect(() => {
        if (orderCount === 1) {
            setDecrementValue(true)
        }
        if (orderCount > 1) {
            setDecrementValue(false)
        }
    }, [orderCount])

    return (
        <div className="one_cart_component" key={product.product.id}>
            <div className="one_cart_component_img text">
                <img src={`http://localhost:3000/${product.product.image}`} alt='img'/>
            </div>
            <div className="one_cart_component_name2 text"><p>{product.product.name}</p></div>
            <div className="one_cart_component_price2 text"><p> {product.product.price}</p></div>
            <div className="one_cart_component_quantity2 text"><p> {product.product.price * orderCount}</p></div>
            <div className="one_cart_component_count text">
                <div>
                    <button disabled={decrementValue} onClick={() => handleRemoveProduct(product)}>-</button>
                    <p> {orderCount}</p>
                    <button onClick={() => handleAddToCart(product)}>+</button>
                </div>
            </div>
            <div className="one_cart_component_remove text">
                <button onClick={() => handleDeleteClick(product)}><ClearIcon/></button>
            </div>
        </div>
    );
}
