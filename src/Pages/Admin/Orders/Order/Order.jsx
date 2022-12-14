import React, {useEffect, useState} from 'react';
import "./Order.scss";
import {useDispatch, useSelector} from 'react-redux';
import {adminOrder, ChackOrder, clearData} from './OrderSlice';
import moment from 'moment';
import 'moment-timezone';

function Order() {
    const [fetch, setFetch] = useState(false);

    const orders = useSelector(((state) => state.adminOrder.ordersData));
    const orderStatus = useSelector(((state) => state.adminOrder.orderMessage));

    const apiUrl = process.env.REACT_APP_API_URL;

    const token = localStorage.getItem("ADMIN_TOKEN");

    const dispatch = useDispatch()

    const takeOrder = (id) => {
        const value = {
            value: {
                id: id,
                status: 'done'
            },
            token
        }
        dispatch(ChackOrder(value))
    }

    const cancelOrder = (id) => {
        const value = {
            value: {
                id: id,
                status: 'canceled'
            },
            token
        }
        dispatch(ChackOrder(value))
    }

    useEffect(() => {
        dispatch(adminOrder(token))
        dispatch(clearData())
    }, [orderStatus.message, fetch])

    useEffect(() => {
        const timer = setTimeout(() => {
            setFetch(!fetch)
        }, 50000);
        return () => clearTimeout(timer);
    });


    return (
        <div className='order_page'>
            {orders ? orders
                .filter(order => order.order.status === "waiting")
                .map((order) => {
                    let orderDate = moment(order.updatedAt).subtract(10, 'days').calendar()
                    let orderTime = moment(order.updatedAt).format('LT')
                    return (
                        <div key={order.id} className='order_map'>
                            <div className='orderInfo'>
                                {order.cartItem.map((cartItem) => {
                                    return (
                                        <div key={cartItem.id} className='cart_item'>
                                            <img src={`${apiUrl}/${cartItem.product.image}`} alt='img'/>
                                            <p className='prod_type'>??????????: <span> {cartItem.product.type} </span></p>
                                            <p className='prod_name'> ????????????????: <span>{cartItem.product.name}</span></p>
                                            <p className='prod_price'> ??????: <span>{cartItem.product.price}</span></p>
                                            <p className='prod_quantity'>?????????? : <span>{cartItem.quantity}</span></p>
                                            <p>?????????????? ????????????????: <span>{orderDate + '' + orderTime}</span></p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='orderInfo_second_part'>
                                <div className='userInfo'>
                                    <h2>?????????????????? ??????????????????</h2>
                                    <p>??????????: <span> {order.order.fullName} </span></p>
                                    <p>??????????????????????????: <span> {order.order.phone}</span></p>
                                    <p>??????????: <span>{order.order.address}</span></p>
                                </div>
                                <div className='orders_take'>
                                    {order.order.bonus > 0 && <p>???????????????????? ????????????: {order.order.bonus}</p>}
                                    <p>?????????????????? ????????: <span>{order.order.totalPrice}</span></p>
                                    <div className='order_takes_btns'>
                                        <button onClick={() => takeOrder(order.order.id)}>
                                            ????????????????
                                        </button>
                                        <button onClick={() => cancelOrder(order.order.id)}>
                                            ????????????????
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) : null}
        </div>
    )
}

export default Order
