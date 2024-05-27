import { createSlice } from "@reduxjs/toolkit";

const feedPathRedux = createSlice({
    name:"pageParamsSlicer",
    initialState:{
        feedPathStatus: 'https://api.pinky.ge/api/guestFeed?page='
    },
    reducers:{
        setFeedPath(state, action){
            state.feedPathStatus = action.payload
        }
    }
})

export const { setFeedPath } = feedPathRedux.actions
export default feedPathRedux.reducer