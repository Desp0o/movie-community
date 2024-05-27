import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./userSlicer";
import userDahsSlicer from "./userDahsSlicer";
import loginModalSlicer from "./loginModalSlicer";
import spinnerSlicer from "./spinnerSlicer";
import RefetchSlicer from "./RefetchSlicer";
import postModalSclier from "./postModal"

const store = configureStore({
    reducer:{
        userStore: userSlicer,
        userDashStore: userDahsSlicer,
        loginModalStore: loginModalSlicer,
        spinnerSote: spinnerSlicer,
        refetchStore: RefetchSlicer,
        addPostModalStore: postModalSclier,
    }
})

export default store

