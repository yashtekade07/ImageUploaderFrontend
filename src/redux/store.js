import {configureStore} from "@reduxjs/toolkit";
import { userReducer ,profileReducer, imageReducer} from "./reducers/userReducer";

const store=configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        image:imageReducer
    }, 
})

export default store;

export const server="https://blinkit-backend-f2qr.onrender.com/api/v1"