import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./userSlicer";
import DarkModeSlicer from "./DarkModeSlicer";

const store = configureStore({
    reducer:{
        userStore: userSlicer,
        darkModeStore: DarkModeSlicer
    }
})

export default store