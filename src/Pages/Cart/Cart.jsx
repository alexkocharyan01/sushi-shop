import React, {useEffect, useState} from 'react'
import Nav from '../Nav/Nav'
import {useDispatch, useSelector} from "react-redux";
import './Cart.scss';
import OneCart from './OneCart';
import OrderDialog from './OrderDialog';
import img1 from "../../Assets/image2.png";
import cart from "../../Assets/empty-cart.png";
import {userInfo} from '../User/UserPage/UserPageSlice';
import {useTranslation} from "react-i18next";
import {orders, userOrderGet} from './CartSlice';
import {WithOutRegisterUserOrderGet} from './WithOutRegisterUserSlice';
import {useNavigate} from "react-router-dom";
import Footer from "../Footer/Footer";
import CircularProgress from "@mui/material/CircularProgress";

function Cart() {
    const [productCount, setProductCount] = useState(false)
    const [product, setProduct] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    const data = useSelector(((state) => state.CartReducer.productData))
    const deleteMessage = useSelector(((state) => state.CartReducer.deleteMessage))
    const message = useSelector(((state) => state.CartReducer.message))
    const orderStatus = useSelector(((state) => state.CartReducer.orderStatus))
    const userInfoData = useSelector(((state) => state.userInfo.data.data));
    const noRegisterData = useSelector(((state) => state.withOutRegisterCart.productData))
    const withOutRegisterDeleteMessage = useSelector(((state) => state.withOutRegisterCart.deleteMessage))
    const withOutRegisterMessage = useSelector(((state) => state.withOutRegisterCart.message))
    const withOutRegisterOrderStatus = useSelector(((state) => state.withOutRegisterCart.orderStatus))

    const token = localStorage.getItem("TOKEN")
    const hash = localStorage.getItem('HASH')

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const {t} = useTranslation();

    const handleClick = () => {
        navigate('/')
    }

    useEffect(() => {
        if (token) {
            setProduct(data)
        } else {
            setProduct(noRegisterData)
        }
    }, [data, productCount, noRegisterData])

    useEffect(() => {
        if (product) {
            setTotalPrice(
                product.reduce((prevValue, currentValue) => prevValue + currentValue.quantity * currentValue.product.price, 0)
            )
        }
    }, [product, productCount])

    useEffect(() => {
        if (token) {
            dispatch(userInfo(token))
        }
    }, [productCount])

    useEffect(() => {
        if (token) {
            dispatch(userOrderGet(token))
        } else {
            dispatch(WithOutRegisterUserOrderGet(hash))
        }
    }, [deleteMessage, withOutRegisterDeleteMessage, message, withOutRegisterMessage, productCount, token, hash])

    useEffect(() => {
        if (token) {
            dispatch(orders(token))
        }
    }, [productCount])

    useEffect(() => {
        if (orderStatus || withOutRegisterOrderStatus) {
            navigate('/approved-order')
        }
    }, [orderStatus, withOutRegisterOrderStatus])

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    return (
        <div className='cart_component'>
            <Nav/>
            <div className='products_list'>
                <div className='product_list_container'>
                    {product && product.length > 0 ?
                        (
                            <div>
                                <div className="wrapper">
                                    <div className='cart_container'>
                                        <div className='products_name'>
                                            <p className='image2 text'>{t("Image")} </p>
                                            <p className='name2 text'>{t("ProductName")} </p>
                                            <p className='price2 text'>{t("Price")} </p>
                                            <p className='total2 text'> {t("Total")}</p>
                                            <p className='quantity2 text'> {t("Quantity")}</p>
                                            <p className='action2 text'> {t("Action")}</p>
                                        </div>
                                        {product.map((product) => {
                                            return (
                                                <OneCart key={product.id} product={product} list={product} data={data}
                                                         setProduct1={setProduct} productCount={productCount}
                                                         setProductCount={setProductCount}
                                                         noRegisterData={noRegisterData}/>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={token ? 'total_price' : 'total_price total_price2'}>
                                    {token ?
                                        <p className='bonus_p'>
                                            {t("accumulatedBonus")}
                                            {" "}
                                            {userInfoData ? userInfoData.bonus : 0}
                                            {" "}
                                            {t("amd")}
                                            {" "}
                                            {t("Bonus")}
                                        </p>
                                        :
                                        null}

                                    <div className='delivery'>
                                        <h2 className='total_pr'>
                                            {t("TotalPrice")} <span> {totalPrice} </span>
                                        </h2>
                                        <p>{t("DeliveryinErevan")}</p>
                                        <p>{t("DeliveryOutErevan")}</p>
                                    </div>
                                </div>
                                <OrderDialog userInfoData={userInfoData}/>
                                <div className='back_img'>
                                    <img src={img1} alt='img'/>
                                </div>
                            </div>
                        ) : (
                            <div className="order">
                                <img src={cart} alt="cart"/>
                                <h2>{t("noOrder")}</h2>
                                <button onClick={handleClick}>{t("GoBack")}</button>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer absolute={true}/>
            {
                loading &&
                <div className="spinner_block">
                    <CircularProgress style={{width: 100, height: 100, color: '#E50019'}}/>
                </div>
            }
        </div>
    )
}

export default Cart
