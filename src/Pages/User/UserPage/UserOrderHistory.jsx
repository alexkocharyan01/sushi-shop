import React from 'react';
import {useTranslation} from "react-i18next";
import top_img from "../../../Assets/order1.png";
import bottom_img from "../../../Assets/order2.png"
import moment from 'moment';
import 'moment-timezone';

function UserOrderHistory({orderHisory}) {
    const apiUrl = process.env.REACT_APP_API_URL;

    const {t} = useTranslation()

    return (
        <>
            <img className='top_img' src={top_img} alt='img'/>
            <img className='bottom_img ' src={bottom_img} alt='img'/>
            <div className='order_history_page'>
                <h2>{t("OrderHistory")}</h2>
                <div className='history'>
                    {orderHisory ? orderHisory.map((history) => {
                        return (
                            <div key={history.id} className='order_history_block'>
                                <div className='order_block_wPrice'>
                                    {history.cartItem.length > 0 ? history.cartItem.map((cartItem) => {
                                        let orderDate = moment(cartItem.updatedAt).subtract(10, 'days').calendar()
                                        let orderTime = moment(cartItem.updatedAt).format('LT')
                                        return (
                                            <div className='orders_info' key={cartItem.id}>
                                                <div className='order_img'>
                                                    <img src={`${apiUrl}/${cartItem.product.image}`} alt='img'/>
                                                </div>
                                                <div className='order_info_texts'>
                                                    <p className='order_type'>{t("Type")}
                                                        <br/>
                                                        <span>{cartItem.product.type}</span>
                                                    </p>
                                                    <p className='order_name'>{t("ProductName")}
                                                        <br/>
                                                        <span>{cartItem.product.name}</span>
                                                    </p>
                                                    <p className='order_quantity'>{t("Quantity")}
                                                        <br/>
                                                        <span> {cartItem.quantity}</span>
                                                    </p>
                                                    <p className='order_price'>{t("Price")}
                                                        <br/>
                                                        <span>{cartItem.product.price}</span>
                                                    </p>
                                                    <p>{t("OrderDate")}
                                                        <br/> <span>{orderDate + " " + orderTime}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    }) : <div className='orders_info'><p className='delete_item'>Տվյալ ապրանքը այս պահին
                                        բացակայում է</p></div>}
                                </div>
                                <h3>{t("TotalPrice")} <span> {history.amount} </span></h3>
                            </div>
                        )
                    }) : (
                        <div className='no_order_history'></div>
                    )}
                </div>
            </div>
        </>
    )
}

export default UserOrderHistory
