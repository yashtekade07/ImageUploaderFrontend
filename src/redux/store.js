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

export const server="http://localhost:5000/api/v1"