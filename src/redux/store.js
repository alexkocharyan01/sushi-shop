import {configureStore} from "@reduxjs/toolkit";
import AdminLoginReducer from "../Pages/Login/AdminLoginSlice";
import createProductReducer from "../Pages/Admin/Products/ProdictsSlice";
import adminChangePasswordReducer from '../Pages/Admin/ChangePassword/ChangePasswordSlice'
import filterProductsReducer from '../Pages/Main/ProductsFilterSlice';
import userRegisterReducer from "../Pages/User/UserRegister/UserSlice";
import userLoginReducer from '../Pages/User/UserLoginSlice';
import productAddCartReducer from "../Pages/ProductList/AddCartSlice";
import userChangePasswordReducer from "../Pages/User/UserChangePassword/UserChangePasswordSlice";
import createSliderInfoReducer from '../Pages/Admin/Sliders/SlidersProductSlice'
import sendMessageReducer from '../Pages/Contact/ContactUsSlice';
import bonusReducer from "../Pages/Admin/Products/Bonus/BonusSLice";
import userInfoReducer from "../Pages/User/UserPage/UserPageSlice";
import adminOrderReducer from "../Pages/Admin/Orders/Order/OrderSlice"
import CartReducer from "../Pages/Cart/CartSlice";
import WithOutRegisterCartReducer from "../Pages/Cart/WithOutRegisterUserSlice"

export const store = configureStore({
    reducer: {
        adminLogin: AdminLoginReducer,
        addProduct: createProductReducer,
        adminChangePassword: adminChangePasswordReducer,
        filterProducts: filterProductsReducer,
        userRegister: userRegisterReducer,
        userLogin: userLoginReducer,
        productAddCart: productAddCartReducer,
        userChangePassword: userChangePasswordReducer,
        createSliderInfo: createSliderInfoReducer,
        sendMessage: sendMessageReducer,
        userBonus: bonusReducer,
        userInfo: userInfoReducer,
        adminOrder: adminOrderReducer,
        CartReducer: CartReducer,
        withOutRegisterCart: WithOutRegisterCartReducer
    }
})
