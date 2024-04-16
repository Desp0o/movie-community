import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./userSlicer";
import DarkModeSlicer from "./DarkModeSlicer";
import userDahsSlicer from "./userDahsSlicer";
import loginModalSlicer from "./loginModalSlicer";
import leftMenuSlicer from "./leftMenuSlicer";
import spinnerSlicer from "./spinnerSlicer";
import ResposnivePostAddSlice from "./ResposnivePostAddSlice";
import RefetchSlicer from "./RefetchSlicer";
import EditPostSlicer from "./EditPostSlicer";

const store = configureStore({
    reducer:{
        userStore: userSlicer,
        darkModeStore: DarkModeSlicer,
        userDashStore: userDahsSlicer,
        loginModalStore: loginModalSlicer,
        leftMenuStore: leftMenuSlicer,
        spinnerSote: spinnerSlicer,
        resPostAddStore: ResposnivePostAddSlice,
        refetchStore: RefetchSlicer,
        editPostStroe: EditPostSlicer
    }
})

export default store