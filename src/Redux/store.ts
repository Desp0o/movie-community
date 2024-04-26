import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./userSlicer";
import DarkModeSlicer from "./DarkModeSlicer";
import userDahsSlicer from "./userDahsSlicer";
import loginModalSlicer from "./loginModalSlicer";
import leftMenuSlicer from "./leftMenuSlicer";
import spinnerSlicer from "./spinnerSlicer";
import RefetchSlicer from "./RefetchSlicer";
import postModalSclier from "./postModal"

const store = configureStore({
    reducer:{
        userStore: userSlicer,
        darkModeStore: DarkModeSlicer,
        userDashStore: userDahsSlicer,
        loginModalStore: loginModalSlicer,
        leftMenuStore: leftMenuSlicer,
        spinnerSote: spinnerSlicer,
        refetchStore: RefetchSlicer,
        addPostModalStore: postModalSclier
    }
})

export default store

