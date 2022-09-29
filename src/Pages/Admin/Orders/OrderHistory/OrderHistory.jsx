import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import AdminHeader from '../../AdminHeader/AdminHeader';
import {adminOrder} from '../Order/OrderSlice';
import './OrderHistory.scss';
import {useNavigate} from "react-router-dom";
import moment from 'moment';
import 'moment-timezone';

function OrderHistory() {
    const orders = useSelector(((state) => state.adminOrder.ordersData));
    const orderStatus = useSelector(((state) => state.adminOrder.orderMessage));

    const apiUrl = process.env.REACT_APP_API_URL;

    const token = localStorage.getItem("ADMIN_TOKEN");

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const changeStatusName = (name) => {
        switch (name) {
            case 'done':
                return 'կատարված է';
            default:
                return 'չեղարկված է';
        }
    }

    useEffect(() => {
        dispatch(adminOrder(token))
    }, [orderStatus.message])

    useEffect(() => {
        if (!localStorage.getItem('ADMIN_TOKEN')) {
            navigate("/admin-login");
        }
    }, [])

    return (
        <div className='order_history_component'>
            <div className='order_history_nav'>
                <AdminHeader/>
            </div>
            <div className='admin_order_history_page'>
                <div className='order_history_contaienr'>
                    {orders ? orders
                        .filter(order => order.order.status !== "waiting")
                        .map((order) => {
                            let orderDate = moment(order.updatedAt).subtract(10, 'days').calendar()
                            let orderTime = moment(order.updatedAt).format('LT')
                            return (
                                <div key={order.id} className='order_map'>
                                    <div className='orderInfo'>
                                        {order.cartItem.length > 0 ? order.cartItem.map((cartItem) => {
                                            return (
                                                <div key={cartItem.id} className='cart_item'>
                                                    <img src={`${apiUrl}/${cartItem.product.image}`} alt='img'/>
                                                    <p className='prod_type'>Տեսակ: <span> {cartItem.product.type} </span>
                                                    </p>
                                                    <p className='prod_name'> Անվանում: <span>{cartItem.product.name}</span>
                                                    </p>
                                                    <p className='prod_price'> Գինը: <span>{cartItem.product.price}</span>
                                                    </p>
                                                    <p className='prod_quantity'>Քանակ
                                                        : <span>{cartItem.quantity}</span></p>
                                                    <p>Պատվերի ամսաթիվը: <span>{orderDate + ' ' + orderTime}</span></p>
                                                </div>
                                            )
                                        }) : <div className='cart_item'><p className='delete_item'>Տվյալ ապրանքը այս
                                            պահին բացակայում է</p></div>}
                                    </div>
                                    <div className='orderInfo_second_part'>
                                        <div className='userInfo'>
                                            <h2>Հաճախորդի տվյալները</h2>
                                            <p>Անուն: <span> {order.order.fullName} </span></p>
                                            <p>Հեռախոսահամար: <span> {order.order.phone}</span></p>
                                            <p>Հասցե: <span>{order.order.address}</span></p>
                                        </div>
                                        <div className='orders_take'>
                                            <p>Ընդհանուր գինը: <span> {order.order.totalPrice}</span></p>
                                            <div className='order_takes_btns'>
                                                <div className='order_status'>
                                                    <p>Պատվերի կարգավիճակը: {changeStatusName(order.order.status)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : null}
                </div>
            </div>
        </div>
    )
}

export default OrderHistory
