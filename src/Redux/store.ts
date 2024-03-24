import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./userSlicer";

const store = configureStore({
    reducer:{
        user: userSlicer
    }
})

export default store