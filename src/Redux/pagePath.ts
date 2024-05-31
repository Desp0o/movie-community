import { createSlice } from "@reduxjs/toolkit";

const feedPathRedux = createSlice({
    name:"pageParamsSlicer",
    initialState:{
        feedPathStatus: import.meta.env.VITE_GUEST_FEED
    },
    reducers:{
        setFeedPath(state, action){
            state.feedPathStatus = action.payload
        }
    }
})

export const { setFeedPath } = feedPathRedux.actions
export default feedPathRedux.reducer