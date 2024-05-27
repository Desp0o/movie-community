import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./userSlicer";
import userDahsSlicer from "./userDahsSlicer";
import loginModalSlicer from "./loginModalSlicer";
import spinnerSlicer from "./spinnerSlicer";
import postModalSclier from "./postModal"
import feedPathRedux from "./pagePath";
import feedRefetchSlicer from "./feedRefetchSlicer";

const store = configureStore({
    reducer:{
        userStore: userSlicer,
        userDashStore: userDahsSlicer,
        loginModalStore: loginModalSlicer,
        spinnerSote: spinnerSlicer,
        addPostModalStore: postModalSclier,
        feedStore: feedPathRedux,
        feedRefetchStore:feedRefetchSlicer
    }
})

export default store

