import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./userSlicer";
import userDahsSlicer from "./userDahsSlicer";
import loginModalSlicer from "./loginModalSlicer";
import leftMenuSlicer from "./leftMenuSlicer";
import spinnerSlicer from "./spinnerSlicer";
import RefetchSlicer from "./RefetchSlicer";
import postModalSclier from "./postModal"
import gulsSlicer from "./gulsSlicer";

const store = configureStore({
    reducer:{
        userStore: userSlicer,
        userDashStore: userDahsSlicer,
        loginModalStore: loginModalSlicer,
        leftMenuStore: leftMenuSlicer,
        spinnerSote: spinnerSlicer,
        refetchStore: RefetchSlicer,
        addPostModalStore: postModalSclier,
        gulStore: gulsSlicer
    }
})

export default store

