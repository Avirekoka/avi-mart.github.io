import { configureStore } from '@reduxjs/toolkit'
import ecommerce from "./Reducers/EcommerceStore"; 
import {cart} from "./Reducers/CartReducers"; 


const store = configureStore({
  reducer: {
    ecommerce,
    cart

  }
});

export default store
