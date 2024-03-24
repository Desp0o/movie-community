import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./userSlicer";

const store = configureStore({
    reducer:{
        userStore: userSlicer
    }
})

export default store